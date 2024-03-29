import React, { useCallback, useState, useMemo } from "react";
import {
  USD_DECIMALS,
  USD_DISPLAY_DECIMALS,
  PRECISION,
  BASIS_POINTS_DIVISOR,
  LIMIT,
  MIN_PROFIT_TIME,
  INCREASE,
  expandDecimals,
  getExchangeRate,
  getProfitPrice,
  getTimeRemaining,
  formatAmount,
  useLocalStorageSerializeKey,
  getExchangeRateDisplay,
  DEFAULT_SLIPPAGE_AMOUNT,
  DEFAULT_HIGHER_SLIPPAGE_AMOUNT,
  SLIPPAGE_BPS_KEY,
  formatDateTime,
  calculatePositionDelta,
} from "../../Helpers";
import { getConstant } from "../../Constants";
import { getContract } from "../../Addresses";

import { BsArrowRight } from "react-icons/bs";
import Modal from "../Modal/Modal";
import Tooltip from "../Tooltip/Tooltip";
import Checkbox from "../Checkbox/Checkbox";
import ExchangeInfoRow from "./ExchangeInfoRow";
import { getNativeToken, getToken, getWrappedToken } from "../../data/Tokens";

import "./ConfirmationBox.css";
import { getImageUrl } from "../../cloudinary/getImageUrl";

const HIGH_SPREAD_THRESHOLD = expandDecimals(1, USD_DECIMALS).div(100); // 1%;

function getSpread(fromTokenInfo, toTokenInfo, isLong, nativeTokenAddress) {
  if (fromTokenInfo && fromTokenInfo.maxPrice && toTokenInfo && toTokenInfo.minPrice) {
    const fromDiff = fromTokenInfo.maxPrice.sub(fromTokenInfo.minPrice).div(2);
    const fromSpread = fromDiff.mul(PRECISION).div(fromTokenInfo.maxPrice.add(fromTokenInfo.minPrice).div(2));
    const toDiff = toTokenInfo.maxPrice.sub(toTokenInfo.minPrice).div(2);
    const toSpread = toDiff.mul(PRECISION).div(toTokenInfo.maxPrice.add(toTokenInfo.minPrice).div(2));

    let value = fromSpread.add(toSpread);

    const fromTokenAddress = fromTokenInfo.isNative ? nativeTokenAddress : fromTokenInfo.address;
    const toTokenAddress = toTokenInfo.isNative ? nativeTokenAddress : toTokenInfo.address;

    if (isLong && fromTokenAddress === toTokenAddress) {
      value = fromSpread;
    }

    return {
      value,
      isHigh: value.gt(HIGH_SPREAD_THRESHOLD),
    };
  }
}

export default function ConfirmationBox(props) {
  const {
    fromToken,
    fromTokenInfo,
    toToken,
    toTokenInfo,
    isSwap,
    isLong,
    isMarketOrder,
    orderOption,
    isShort,
    toAmount,
    fromAmount,
    isHigherSlippageAllowed,
    setIsHigherSlippageAllowed,
    onConfirmationClick,
    setIsConfirming,
    shortCollateralAddress,
    hasExistingPosition,
    leverage,
    existingPosition,
    existingLiquidationPrice,
    displayLiquidationPrice,
    shortCollateralToken,
    isPendingConfirmation,
    triggerPriceUsd,
    triggerRatio,
    fees,
    feesUsd,
    isSubmitting,
    fromUsdMin,
    toUsdMax,
    nextAveragePrice,
    collateralTokenAddress,
    feeBps,
    chainId,
    orders,
    totalFeesUsd,
    executionFeeUsd,
    executionFee,
    swapFees,
    positionFee,
  } = props;

  const [savedSlippageAmount] = useLocalStorageSerializeKey([chainId, SLIPPAGE_BPS_KEY], DEFAULT_SLIPPAGE_AMOUNT);
  const [isProfitWarningAccepted, setIsProfitWarningAccepted] = useState(false);

  const collateralToken = getToken(chainId, collateralTokenAddress);

  let minOut;
  let fromTokenUsd;
  let toTokenUsd;

  let collateralAfterFees = fromUsdMin;
  if (feesUsd) {
    collateralAfterFees = fromUsdMin.sub(feesUsd);
  }

  if (isSwap) {
    minOut = toAmount.mul(BASIS_POINTS_DIVISOR - savedSlippageAmount).div(BASIS_POINTS_DIVISOR);

    fromTokenUsd = fromTokenInfo
      ? formatAmount(fromTokenInfo.minPrice, USD_DECIMALS, fromTokenInfo.displayDecimals, true)
      : 0;
    toTokenUsd = toTokenInfo ? formatAmount(toTokenInfo.maxPrice, USD_DECIMALS, toTokenInfo.displayDecimals, true) : 0;
  }

  const getTitle = () => {
    if (!isMarketOrder) {
      return "Confirm Limit Order";
    }
    if (isSwap) {
      return "Confirm Swap";
    }
    return isLong ? "Confirm Long" : "Confirm Short";
  };
  const title = getTitle();

  const existingOrder = useMemo(() => {
    const wrappedToken = getWrappedToken(chainId);
    for (const order of orders) {
      if (order.type !== INCREASE) continue;
      const sameToken =
        order.indexToken === wrappedToken.address ? toToken.isNative : order.indexToken === toToken.address;
      if (order.isLong === isLong && sameToken) {
        return order;
      }
    }
  }, [orders, chainId, isLong, toToken.address, toToken.isNative]);

  const getError = () => {
    if (!isSwap && hasExistingPosition && !isMarketOrder) {
      const { delta, hasProfit } = calculatePositionDelta(triggerPriceUsd, existingPosition);
      if (hasProfit && delta.eq(0)) {
        return "Invalid price, see warning";
      }
    }
    if (isMarketOrder && hasPendingProfit && !isProfitWarningAccepted) {
      return "Forfeit profit not checked";
    }
    return false;
  };

  const getPrimaryText = () => {
    if (!isPendingConfirmation) {
      const error = getError();
      if (error) {
        return error;
      }

      if (isSwap) {
        return title;
      }
      const action = isMarketOrder ? (isLong ? "Long " : "Short ") + toToken.symbol : "Create Order";

      if (
        isMarketOrder &&
        MIN_PROFIT_TIME > 0 &&
        hasExistingPosition &&
        existingPosition.delta.eq(0) &&
        existingPosition.pendingDelta.gt(0)
      ) {
        return isLong ? `Forfeit profit and ${action}` : `Forfeit profit and Short`;
      }

      return isMarketOrder && MIN_PROFIT_TIME > 0 ? `Accept minimum and ${action}` : action;
    }

    if (!isMarketOrder) {
      return "Creating Order...";
    }
    if (isSwap) {
      return "Swapping...";
    }
    if (isLong) {
      return "Longing...";
    }
    return "Shorting...";
  };

  const isPrimaryEnabled = () => {
    if (getError()) {
      return false;
    }
    return !isPendingConfirmation && !isSubmitting;
  };

  const nativeTokenAddress = getContract(chainId, "NATIVE_TOKEN");
  const spread = getSpread(fromTokenInfo, toTokenInfo, isLong, nativeTokenAddress);
  // it's meaningless for limit/stop orders to show spread based on current prices
  const showSpread = isMarketOrder && !!spread;

  let allowedSlippage = savedSlippageAmount;
  if (isHigherSlippageAllowed) {
    allowedSlippage = DEFAULT_HIGHER_SLIPPAGE_AMOUNT;
  }

  const renderSpreadWarning = useCallback(() => {
    if (!isMarketOrder) {
      return null;
    }

    if (spread && spread.isHigh) {
      return (
        <div className="Confirmation-box-warning">
          The spread is &gt; 1%, please ensure the trade details are acceptable before comfirming
        </div>
      );
    }
  }, [isMarketOrder, spread]);

  const renderFeeWarning = useCallback(() => {
    if (orderOption === LIMIT || !feeBps || feeBps <= 50) {
      return null;
    }

    if (isSwap) {
      return (
        <div className="Confirmation-box-warning">
          Fees are high to swap from {fromToken.symbol} to {toToken.symbol}.
        </div>
      );
    }

    if (!collateralTokenAddress) {
      return null;
    }

    return (
      <div className="Confirmation-box-warning">
        Fees are high to swap from {fromToken.symbol} to {collateralToken.symbol}. <br />
        {collateralToken.symbol} is needed for collateral.
      </div>
    );
  }, [feeBps, isSwap, collateralTokenAddress, chainId, fromToken.symbol, toToken.symbol, orderOption]);

  const hasPendingProfit =
    MIN_PROFIT_TIME > 0 && existingPosition && existingPosition.delta.eq(0) && existingPosition.pendingDelta.gt(0);

  const renderMinProfitWarning = useCallback(() => {
    if (MIN_PROFIT_TIME === 0) {
      return null;
    }
    if (!isSwap) {
      if (hasExistingPosition) {
        const minProfitExpiration = existingPosition.lastIncreasedTime + MIN_PROFIT_TIME;
        if (isMarketOrder && existingPosition.delta.eq(0) && existingPosition.pendingDelta.gt(0)) {
          const profitPrice = getProfitPrice(existingPosition.markPrice, existingPosition);
          return (
            <div className="Confirmation-box-warning">
              Increasing this position at the current price will forfeit a&nbsp;
              <a href="https://perps-docs.quickswap.exchange/trading" target="_blank" rel="noopener noreferrer">
                pending profit
              </a>{" "}
              of {existingPosition.deltaStr}.<br />
              <br />
              Profit price: {existingPosition.isLong ? ">" : "<"} $
              {formatAmount(profitPrice, USD_DECIMALS, existingPosition.indexToken.displayDecimals, true)}. This rule
              only applies for the next {getTimeRemaining(minProfitExpiration)}, until{" "}
              {formatDateTime(minProfitExpiration)}.
            </div>
          );
        }
        if (!isMarketOrder) {
          const { delta, hasProfit } = calculatePositionDelta(triggerPriceUsd, existingPosition);
          if (hasProfit && delta.eq(0)) {
            const profitPrice = getProfitPrice(existingPosition.markPrice, existingPosition);
            return (
              <div className="Confirmation-box-warning">
                This order will forfeit a&nbsp;
                <a href="https://perps-docs.quickswap.exchange/trading" target="_blank" rel="noopener noreferrer">
                  profit
                </a>{" "}
                of {existingPosition.deltaStr}.<br />
                Profit price: {existingPosition.isLong ? ">" : "<"} $
                {formatAmount(profitPrice, USD_DECIMALS, existingPosition.indexToken.displayDecimals, true)}. This rule
                only applies for the next {getTimeRemaining(minProfitExpiration)}, until{" "}
                {formatDateTime(minProfitExpiration)}.
              </div>
            );
          }
        }
      }

      return (
        <div className="Confirmation-box-warning">
          A minimum price change of&nbsp;
          <a href="https://perps-docs.quickswap.exchange/trading" target="_blank" rel="noopener noreferrer">
            1.5%
          </a>{" "}
          is required for a position to be in profit. This only applies for the first {MIN_PROFIT_TIME / 60 / 60} hours
          after increasing a position.
        </div>
      );
    }
  }, [isSwap, hasExistingPosition, existingPosition, isMarketOrder, triggerPriceUsd]);

  const renderExistingOrderWarning = useCallback(() => {
    if (isSwap || !existingOrder) {
      return;
    }
    const indexToken = getToken(chainId, existingOrder.indexToken);
    const sizeInToken = formatAmount(
      existingOrder.sizeDelta.mul(PRECISION).div(existingOrder.triggerPrice),
      USD_DECIMALS,
      4,
      true
    );
    return (
      <div className="Confirmation-box-warning">
        You have an active Limit Order to Increase {existingOrder.isLong ? "Long" : "Short"} {sizeInToken}{" "}
        {indexToken.symbol} (${formatAmount(existingOrder.sizeDelta, USD_DECIMALS, 2, true)}) at price $
        {formatAmount(existingOrder.triggerPrice, USD_DECIMALS, existingOrder.indexToken.displayDecimals, true)}
      </div>
    );
  }, [existingOrder, isSwap, chainId]);

  const renderMain = useCallback(() => {
    if (isSwap) {
      return (
        <div className="Confirmation-box-main">
          <div className="Confirmation-box-section Confirmation-box-section-pay">
            <div className="left">
              <div className="tokenBorder"><img 
                src={getImageUrl({
                  path: `coins/others/${fromToken.symbol.toLowerCase()}-original`,
                  format:"png"
                })} 
                width={28} alt='tokenlogo' /></div>
              <div>
                <span className="type">Pay</span>
                <span>{formatAmount(fromAmount, fromToken.decimals, 4, true)} {fromToken.symbol}</span>
              </div>
            </div>
            <div className="amount">${formatAmount(fromUsdMin, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}</div>
          </div>
          <div className="Confirmation-box-main-icon"></div>
          <div className="Confirmation-box-section Confirmation-box-section-size">
            <div className="left">
              <div className="tokenBorder"><img 
                src={getImageUrl({
                  path: `coins/others/${toToken.symbol.toLowerCase()}-original`,
                  format:"png"
                })} 
                width={28} alt='tokenlogo' /></div>
              <div>
                <span className="type">Receive<br/></span>
                {formatAmount(toAmount, toToken.decimals, 4, true)} {toToken.symbol}
              </div>
            </div>
            <div className="amount">${formatAmount(toUsdMax, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}</div>
          </div>
        </div>
      );
    }

    return (
      <div className="Confirmation-box-main">
        <div className="Confirmation-box-section Confirmation-box-section-pay">
          <div className="left">
            <div className="tokenBorder"><img 
            src={getImageUrl({
              path: `coins/others/${fromToken.symbol.toLowerCase()}-original`,
              format:"png"
            })} 
            width={28} alt='tokenlogo' /></div>
            <div>
              <span className="type">Pay</span>
              <span>{formatAmount(fromAmount, fromToken.decimals, 4, true)} {fromToken.symbol}</span>
            </div>
          </div>
          
          <div className="amount">${formatAmount(fromUsdMin, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}</div>
        </div>
        <div className="Confirmation-box-main-icon"></div>
        <div className="Confirmation-box-section Confirmation-box-section-size">
          <div className="left">
            <div className="tokenBorder"><img
              src={getImageUrl({
                path: `coins/others/${toToken.symbol.toLowerCase()}-original`,
                format: "png"
              })}
              width={28} alt='tokenlogo' /></div>
            <div>
              <span className="type">{isLong ? "Long" : "Short"}<br/></span>
              {formatAmount(toAmount, toToken.decimals, 4, true)} {toToken.symbol}
            </div>
          </div>
          
          <div className="amount">${formatAmount(toUsdMax, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}</div>
        </div>
      </div>
    );
  }, [isSwap, fromAmount, fromToken, toToken, fromUsdMin, toUsdMax, isLong, toAmount]);
  
  const nativeTokenSymbol = getConstant(chainId, "nativeTokenSymbol");


  const renderAvailableLiquidity = useCallback(() => {
    let availableLiquidity;
    const riskThresholdBps = 5000;
    let isLiquidityRisk;
    const token = isSwap || isLong ? toTokenInfo : shortCollateralToken;

    if (!token || !token.poolAmount || !token.availableAmount) {
      return null;
    }

    if (isSwap) {
      const poolWithoutBuffer = token.poolAmount.sub(token.bufferAmount);
      availableLiquidity = token.availableAmount.gt(poolWithoutBuffer) ? poolWithoutBuffer : token.availableAmount;
      isLiquidityRisk = availableLiquidity.mul(riskThresholdBps).div(BASIS_POINTS_DIVISOR).lt(toAmount);
    } else {
      if (isShort) {
        availableLiquidity = token.availableAmount;

        let adjustedMaxGlobalShortSize;

        if (toTokenInfo.maxAvailableShort && toTokenInfo.maxAvailableShort.gt(0)) {
          adjustedMaxGlobalShortSize = toTokenInfo.maxAvailableShort
            .mul(expandDecimals(1, token.decimals))
            .div(expandDecimals(1, USD_DECIMALS));
        }

        if (adjustedMaxGlobalShortSize && adjustedMaxGlobalShortSize.lt(token.availableAmount)) {
          availableLiquidity = adjustedMaxGlobalShortSize;
        }

        const sizeTokens = toUsdMax.mul(expandDecimals(1, token.decimals)).div(token.minPrice);
        isLiquidityRisk = availableLiquidity.mul(riskThresholdBps).div(BASIS_POINTS_DIVISOR).lt(sizeTokens);
      } else {
        availableLiquidity = token.availableAmount;
        isLiquidityRisk = availableLiquidity.mul(riskThresholdBps).div(BASIS_POINTS_DIVISOR).lt(toAmount);
      }
    }

    if (!availableLiquidity) {
      return null;
    }

    return (
      <ExchangeInfoRow label="Available Liquidity">
        <Tooltip
          position="right-bottom"
          handleClassName={isLiquidityRisk ? "negative" : null}
          handle={
            <>
              {formatAmount(availableLiquidity, token.decimals, token.isStable ? 0 : 2, true)} {token.symbol}
            </>
          }
          renderContent={() =>
            isLiquidityRisk
              ? "There may not be sufficient liquidity to execute your order when the price conditions are met"
              : "The order will only execute if the price conditions are met and there is sufficient liquidity"
          }
        />
      </ExchangeInfoRow>
    );
  }, [toTokenInfo, shortCollateralToken, isShort, isLong, isSwap, toAmount, toUsdMax]);

  const renderMarginSection = useCallback(() => {
    return (
      <>
        <div className="Confirmation-box-info">
          {renderFeeWarning()}
          {renderMinProfitWarning()}
          {renderExistingOrderWarning()}
          {hasPendingProfit && isMarketOrder && (
            <div className="PositionEditor-accept-profit-warning">
              <Checkbox isChecked={isProfitWarningAccepted} setIsChecked={setIsProfitWarningAccepted}>
                <span className="muted">Forfeit profit</span>
              </Checkbox>
            </div>
          )}
          {orderOption === LIMIT && renderAvailableLiquidity()}
          {isShort && (
            <ExchangeInfoRow label="Collateral In">{getToken(chainId, shortCollateralAddress).symbol}</ExchangeInfoRow>
          )}
          {isLong && <ExchangeInfoRow label="Collateral In" value={toTokenInfo.symbol} />}
          <ExchangeInfoRow label="Leverage">
            {hasExistingPosition && toAmount && toAmount.gt(0) && (
              <div className="inline-block muted">
                {formatAmount(existingPosition.leverage, 4, 2)}x
                <BsArrowRight className="transition-arrow" />
              </div>
            )}
            {toAmount && leverage && leverage.gt(0) && `${formatAmount(leverage, 4, 2)}x`}
            {!toAmount && leverage && leverage.gt(0) && `-`}
            {leverage && leverage.eq(0) && `-`}
          </ExchangeInfoRow>
          <ExchangeInfoRow label="Liq. Price">
            {hasExistingPosition && toAmount && toAmount.gt(0) && (
              <div className="inline-block muted">
                $
                {formatAmount(
                  existingLiquidationPrice,
                  USD_DECIMALS,
                  toTokenInfo ? toTokenInfo.displayDecimals : 2,
                  true
                )}
                <BsArrowRight className="transition-arrow" />
              </div>
            )}
            {toAmount &&
              displayLiquidationPrice &&
              `$${formatAmount(displayLiquidationPrice, USD_DECIMALS, toTokenInfo.displayDecimals, true)}`}
            {!toAmount && displayLiquidationPrice && `-`}
            {!displayLiquidationPrice && `-`}
          </ExchangeInfoRow>
          <ExchangeInfoRow label="Fees">
            <Tooltip
              handle={`$${formatAmount(totalFeesUsd, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}`}
              position="right-bottom"
              renderContent={() => {
                return (
                  <>
                    {swapFees && (
                      <div>
                        {collateralToken.symbol} is required for collateral. <br />
                        <br />
                        Swap {fromToken.symbol} to {collateralToken.symbol} Fee: &nbsp;$
                        {formatAmount(swapFees, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}
                        <br />
                        <br />
                      </div>
                    )}
                    <div>
                      Position Fee (0.1% of position size): &nbsp;$
                      {formatAmount(positionFee, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}
                    </div>
                    <br />
                    <div>
                      Execution Fee: &nbsp;
                      {formatAmount(executionFee, nativeTokenSymbol.decimals, nativeTokenSymbol.displayDecimals, true)}
                      &nbsp; {nativeTokenSymbol}
                      &nbsp; (${formatAmount(executionFeeUsd, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)})
                    </div>
                  </>
                );
              }}
            />
          </ExchangeInfoRow>
          <ExchangeInfoRow label="Collateral">
            <Tooltip
              handle={`$${formatAmount(collateralAfterFees, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}`}
              position="right-bottom"
              renderContent={() => {
                return (
                  <>
                    Your position's collateral after deducting fees.
                    <br />
                    <br />
                    Pay amount: ${formatAmount(fromUsdMin, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}
                    <br />
                    Fees: ${formatAmount(feesUsd, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}
                    <br />
                  </>
                );
              }}
            />
          </ExchangeInfoRow>
          {showSpread && (
            <ExchangeInfoRow label="Spread" isWarning={spread.isHigh} isTop={true}>
              {formatAmount(spread.value.mul(100), USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}%
            </ExchangeInfoRow>
          )}
          {isMarketOrder && (
            <ExchangeInfoRow label="Entry Price">
              {hasExistingPosition && toAmount && toAmount.gt(0) && (
                <div className="inline-block muted">
                  $
                  {formatAmount(
                    existingPosition.averagePrice,
                    USD_DECIMALS,
                    existingPosition.indexToken.displayDecimals,
                    true
                  )}
                  <BsArrowRight className="transition-arrow" />
                </div>
              )}
              {nextAveragePrice && `$${formatAmount(nextAveragePrice, USD_DECIMALS, toToken.displayDecimals, true)}`}
              {!nextAveragePrice && `-`}
            </ExchangeInfoRow>
          )}
          {!isMarketOrder && (
            <ExchangeInfoRow label="Limit Price" isTop={true}>
              ${formatAmount(triggerPriceUsd, USD_DECIMALS, toToken ? toToken.displayDecimals : 2, true)}
            </ExchangeInfoRow>
          )}
          <ExchangeInfoRow label="Borrow Fee">
            {isLong && toTokenInfo && formatAmount(toTokenInfo.fundingRate, 4, 4)}
            {isShort && shortCollateralToken && formatAmount(shortCollateralToken.fundingRate, 4, 4)}
            {((isLong && toTokenInfo && toTokenInfo.fundingRate) ||
              (isShort && shortCollateralToken && shortCollateralToken.fundingRate)) &&
              "% / 1h"}
          </ExchangeInfoRow>
          <ExchangeInfoRow label="Allowed Slippage">
            <Tooltip
              handle={`${formatAmount(allowedSlippage, 2, 2)}%`}
              position="right-top"
              renderContent={() => {
                return (
                  <>
                    You can change this in the settings menu on the top right of the page.
                    <br />
                    <br />
                    Note that a low allowed slippage, e.g. less than 0.5%, may result in failed orders if prices are
                    volatile.
                  </>
                );
              }}
            />
          </ExchangeInfoRow>
          {isMarketOrder && (
            <div className="PositionEditor-allow-higher-slippage Exchange-info-label">
              <Checkbox isChecked={isHigherSlippageAllowed} setIsChecked={setIsHigherSlippageAllowed}>
                <span>Allow up to 2% slippage</span>
              </Checkbox>
            </div>
          )}
        </div>
      </>
    );
  }, [
    renderMinProfitWarning,
    shortCollateralAddress,
    isShort,
    isLong,
    toTokenInfo,
    nextAveragePrice,
    toAmount,
    hasExistingPosition,
    existingPosition,
    isMarketOrder,
    triggerPriceUsd,
    showSpread,
    spread,
    displayLiquidationPrice,
    existingLiquidationPrice,
    feesUsd,
    leverage,
    shortCollateralToken,
    renderExistingOrderWarning,
    chainId,
    renderFeeWarning,
    hasPendingProfit,
    isProfitWarningAccepted,
    renderAvailableLiquidity,
    orderOption,
    fromUsdMin,
    collateralAfterFees,
    isHigherSlippageAllowed,
    setIsHigherSlippageAllowed,
    allowedSlippage,
  ]);

  const renderSwapSection = useCallback(() => {
    return (
      <>
        <div className="Confirmation-box-info">
          {renderFeeWarning()}
          {renderSpreadWarning()}
          {orderOption === LIMIT && renderAvailableLiquidity()}
          <ExchangeInfoRow label="Min. Receive">
            {formatAmount(minOut, toTokenInfo.decimals, 4, true)} {toTokenInfo.symbol}
          </ExchangeInfoRow>
          <ExchangeInfoRow label="Price">
            {getExchangeRateDisplay(getExchangeRate(fromTokenInfo, toTokenInfo), fromTokenInfo, toTokenInfo)}
          </ExchangeInfoRow>
          {!isMarketOrder && (
            <div className="Exchange-info-row">
              <div className="Exchange-info-label">Limit Price</div>
              <div className="align-right">{getExchangeRateDisplay(triggerRatio, fromTokenInfo, toTokenInfo)}</div>
            </div>
          )}
          {showSpread && (
            <ExchangeInfoRow label="Spread" isWarning={spread.isHigh}>
              {formatAmount(spread.value.mul(100), USD_DECIMALS, 2, true)}%
            </ExchangeInfoRow>
          )}
          <div className="Exchange-info-row">
            <div className="Exchange-info-label">Fees</div>
            <div className="align-right">
              <Tooltip
                handle={`$${formatAmount(totalFeesUsd, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)}`}
                position="right-bottom"
                renderContent={() => {
                  return (
                    <>
                      <div>
                        Swap Fee ({formatAmount(feeBps, 2, 2, false)}% of swap size):
                        &nbsp; {formatAmount(fees, fromToken.decimals, 4, true)}
                        &nbsp; {fromToken.symbol}
                        &nbsp; (${formatAmount(feesUsd, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)})
                      </div>
                      {isMarketOrder ? <></> : (<>
                        <br />
                        <div>
                          Execution Fee: &nbsp;
                          {formatAmount(executionFee, nativeTokenSymbol.decimals, nativeTokenSymbol.displayDecimals, true)}
                          &nbsp; {nativeTokenSymbol}
                          &nbsp; (${formatAmount(executionFeeUsd, USD_DECIMALS, USD_DISPLAY_DECIMALS, true)})
                        </div></>)
                      }
                    </>
                  );
                }}
              />
            </div>
          </div>
          {fromTokenUsd && (
            <div className="Exchange-info-row">
              <div className="Exchange-info-label">{fromTokenInfo.symbol} Price</div>
              <div className="align-right">{fromTokenUsd} USD</div>
            </div>
          )}
          {toTokenUsd && (
            <div className="Exchange-info-row">
              <div className="Exchange-info-label">{toTokenInfo.symbol} Price</div>
              <div className="align-right">{toTokenUsd} USD</div>
            </div>
          )}
        </div>
      </>
    );
  }, [
    renderSpreadWarning,
    fromTokenInfo,
    toTokenInfo,
    orderOption,
    showSpread,
    spread,
    feesUsd,
    feeBps,
    fromTokenUsd,
    toTokenUsd,
    triggerRatio,
    fees,
    isMarketOrder,
    minOut,
    renderFeeWarning,
    renderAvailableLiquidity,
  ]);

  return (
    <div className="Confirmation-box">
      <Modal isVisible={true} setIsVisible={() => setIsConfirming(false)} className=" Confirmation-box" label={title}>
        {renderMain()}
        {isSwap && renderSwapSection()}
        {!isSwap && renderMarginSection()}
        <div className="Confirmation-box-row">
          <button
            onClick={onConfirmationClick}
            className="App-cta Confirmation-box-button Confirmation-box-swap-button long-btn-confirm"
            disabled={!isPrimaryEnabled()}
          >
            {getPrimaryText()}
          </button>
        </div>
      </Modal>
    </div>
  );
}

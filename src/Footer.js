import React from "react";

import "./Footer.css";
import { $reddit, $discord, $twitter2, $medium, $youtube, $telegram, $coinGecko } from "./assets/logos/mediaLogos";

import Logo from "./assets/logos/QuickswapLogo@2x.png";
// import { getImageUrl } from "./cloudinary/getImageUrl";
import {
  useLastSubgraphBlock,
  useLastBlock,
} from "./dataProvider"

export default function Footer() {
  const [lastSubgraphBlock] = useLastSubgraphBlock();
  const [lastBlock] = useLastBlock();
  return (

    <div className="footer">
      <div className="footer-content">
        <div className="footer-logo">
          <a href="/">
            <img
              src={Logo}
              alt="Logo"
              style={{ height: 28 }}
            ></img>
          </a>
          <p>Our community is building a comprehensive decentralized trading platform for the future of finance. Join us!</p>

          <div className="flex items-center gap-3">
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.reddit.com/r/QuickSwap/"
            >
              {$reddit}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://discord.gg/dSMd7AFH36"
            >
              {$discord}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://twitter.com/QuickswapDEX"
            >
              {$twitter2}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://quickswap-layer2.medium.com/"
            >
              {$medium}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.youtube.com/channel/UCrPlF-DBwD-UzLFDzJ4Z5Fw"
            >
              {$youtube}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://t.me/QuickSwapDEX"
            >
              {$telegram}
            </a>
            <a
              target="_blank"
              rel="noreferrer"
              href="https://www.coingecko.com/en/exchanges/quickswap"
            >
              {$coinGecko}
            </a>
          </div>
        </div>
        <div className="footer-links-wrap">
          <div>
            <h3 >Services</h3>
            <div className="links-content ">
              <a href='https://quickswap.exchange/#/swap'>Swap</a>
              <a href='https://quickswap.exchange/#/pools'>Pool</a>
              <a href='https://quickswap.exchange/#/farm'>Farm</a>
              <a href='https://quickswap.exchange/#/dragons'>Dragons Lair</a>
              <a href='https://quickswap.exchange/#/predictions'>Predictions</a>
              <a href='https://quickswap.exchange/#/convert'>Convert</a>
              <a href='https://quickswap.exchange/#/analytics'>Analytics</a>
            </div>
          </div>
          <div >
            <h3 >Developers</h3>
            <div className="links-content ">
              <a href='https://github.com/QuickSwap'>GitHub</a>
              <a href='https://github.com/QuickSwap'> GitBook</a>
              <a href='https://docs.quickswap.exchange/'>Docs</a>
            </div>
          </div>
          <div>
            <h3 >Governance</h3>
            <div className="links-content ">
              <a href='https://snapshot.org/#/quickvote.eth'>Vote</a>
            </div>
          </div>
          <div>
            <h3 >Partners</h3>
            <div className="links-content ">
              <a href=''>Gamma</a>
              <a href=''>Algebra</a>
              <a href=''>Apply!</a>
            </div>
          </div>

        </div>
      </div>
      <div className="footer-divider "></div>
      <a href='https://quickswap.exchange/#/swap'>
        © 2023 QuickSwap
      </a>
      <div style={{ float: 'right' }}>
        <a href='https://quickswap.exchange/#/swap'>Terms of Use</a>
        {lastSubgraphBlock && lastBlock && (
          <a href={`https://zkevm.polygonscan.com/block/${lastSubgraphBlock.number}`}
            target="_blank"
            rel="noreferrer"
            className="footer-block"
            style={{ marginLeft: "30px",color:"#63B48E" }}>
            {lastSubgraphBlock.number}
            <div style={{height:"6px",width:"6px",background:"#63B48E",borderRadius:"50%"}}></div>
          </a>
        )}
      </div>
    </div>
  );
}

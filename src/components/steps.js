const removeStepActionClasses = () =>{
  document.querySelectorAll('.TokenSelector-box').forEach(e=>{
    e.classList.remove('step-token-selected')
  })
  document.querySelector(".Pay-modal").classList.remove("steps-TokenSelector")
  document.querySelector(".swapbox-modal").classList.remove("steps-TokenSelector")
}
const addStepActionClasses = () =>{
  document.querySelectorAll('.TokenSelector-box').forEach(e=>{
    e.classList.add('step-token-selected')
  })
  document.querySelector(".Pay-modal").classList.add("steps-TokenSelector")
  document.querySelector(".swapbox-modal").classList.add("steps-TokenSelector")
}
const activeTourStep = (selector, event) => {
  if(localStorage.getItem("viewed_tour_modal") === "false"){
    let swapModal = document.querySelector(selector)
    if(swapModal.classList.contains('steps-TokenSelector') === true){
      swapModal.addEventListener("click",(e)=>{
        if(!!e.target.classList.contains('token-box')){
          event.show()
        }
    })
  }
  }
}




const newSteps = [
  {
    id: "welcome",
    title: "",
    text: [
      `
      <div class="s-title">Connect your web3 wallet</div>
      <div class="s-description">A non-custodial web3 wallet serves as a gateway to use dApps. It is your web3 identity, pro tip: never share your private keys.</div>
        `,
    ],
    attachTo: { element: ".App-header-user", on: "bottom" },
    classes: "shepherd shepherd-welcome",

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          document.querySelector('.connect-wallet').click()
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
       </div>
        `,
      },
    ],
  },
  {
    id: "step3",
    classes: "shepherd-expanded",
    title: "",
    when: {
      show: function() {
        let swapPptionV2 = localStorage.getItem('Swap-option-v2')  && JSON.parse(localStorage.getItem('Swap-option-v2'));
        Object.values(swapPptionV2).length > 0 && document.querySelector(`[data-label='${Object.values(swapPptionV2)[0].split(',')[0]}']`).click()
        let isConnected = localStorage.getItem('eagerconnect') && JSON.parse(localStorage.getItem('eagerconnect'));
        let isProvider =  localStorage.getItem('currentprovider')
        if(isConnected === true && isProvider != null ){
          document.querySelector('.step3BackButton').disabled = true
        }
        document.querySelector(".tradePage").querySelectorAll('.Tab-option').forEach((element) => {
          element.addEventListener('click',()=>{
            document.querySelector(".step-3-tour-tabs").querySelectorAll('.tour-tab').forEach((e) => {
                e.classList.remove("tour-selected-tab");
                if(element.innerHTML === e.innerHTML){
                  e.classList.add("tour-selected-tab")
                }
            })
          })
        })
      },
    },
    text: `
      <div style="display: flex; justify-content: space-between; align-items: center" >
        <div class="s-title">Choose from </div>
          <div class="step-3-tour-tabs" style="margin: 10px 0;display: flex; align-items: center; gap: 10px; font-size: 12px;">
              <button class="tour-tab tour-selected-tab" data-label='Long'  type="button" onClick='new Promise(function (resolve) {[...document.querySelector(".step-3-tour-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".step-3-tour-tabs").children][0].classList.add("tour-selected-tab");[...document.querySelector(".tradePage").children].forEach((element, index) => {if (index == 0) {element.classList.add("active"); element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-tab-container").innerHTML = "This means you buy a cryptocurrency, like Bitcoin, because you believe its price will increase in the future. You&prime;re planning to &ldquo;go long,&rdquo; or profit from an increase in its price.";'>Long</button>
              <button class="tour-tab"  type="button" data-label='Short' onClick='new Promise(function (resolve) {
                [...document.querySelector(".step-3-tour-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".step-3-tour-tabs").children][1].classList.add("tour-selected-tab");[...document.querySelector(".tradePage").children].forEach((element, index) => {if (index == 1) {element.classList.add("active");element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-tab-container").innerHTML = "This means you&prime;re betting that the price of a cryptocurrency will fall. In this situation, you&prime;d   &ldquo;short,&rdquo; a token, planning to profit from a decrease in its price.";'>Short</button>

              <button class="tour-tab"  type="button" data-label='Swap'  onClick='new Promise(function (resolve) {
                [...document.querySelector(".step-3-tour-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".step-3-tour-tabs").children][2].classList.add("tour-selected-tab");[...document.querySelector(".tradePage").children].forEach((element, index) => {if (index == 2) {element.classList.add("active");element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-tab-container").innerHTML = "This means the direct exchange of one type of cryptocurrency for another.";'>Swap</button>
          </div>
        </div>
      </div>
      <div class="tour-tab-container s-description" >This means you buy a cryptocurrency, like Bitcoin, because you believe its price will increase in the future. You&prime;re planning to &ldquo;go long,&rdquo; or profit from an increase in its price.</div>
            `,
    attachTo: { element: ".tradePage", on: "left" },
    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },

      {
        type:'next',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },
  {
    id: "step4",
    title: "",
    classes: "shepherd-expanded",
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'));
        let activeTab = JSON.parse(localStorage.getItem('["Order-option"]'));
        document.querySelector(`[data-label='${activeTab}']`).click()
        Object.values(swapPptionV2).includes("Swap") !== true ?  document.querySelector("[data-label='Trigger']").style.display = 'block' : document.querySelector("[data-label='Trigger']").style.display = 'none'
        if(JSON.parse(localStorage.getItem('["Order-option"]') === "Stop")){
          document.querySelector(".step4NextButton").disabled = true;
        }
        document.querySelector(".Exchange-swap-order-type-tabs").querySelectorAll('.Tab-option').forEach((element) => {
          element.addEventListener('click',()=>{
            document.querySelector(".step-4-tour-tabs").querySelectorAll('.tour-tab').forEach((e) => {
                e.classList.remove("tour-selected-tab");
                if(element.innerHTML === e.innerHTML){
                  e.classList.add("tour-selected-tab")
                }
            })
          })
        })
      }
    },
    text: `
    <div style="display: flex; justify-content: space-between; align-items: center">
      <div class="s-title">Choose from </div>
        <div class="step-4-tour-tabs" style="margin: 10px 0;display: flex; align-items: center; gap: 10px; font-size: 12px;">
            <button class="tour-tab tour-selected-tab" data-label="Market"  type="button" onClick='new Promise(function (resolve) {document.querySelector(".step4NextButton").disabled = false;[...document.querySelector(".step-4-tour-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".step-4-tour-tabs").children][0].classList.add("tour-selected-tab");[...document.querySelector(".Exchange-swap-order-type-tabs").children].forEach((element, index) => {if (index == 0) {element.classList.add("active"); element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-sub-tab-container").innerHTML = "This is when you buy or sell a cryptocurrency immediately at the best available price in the market. It&prime;s like buying a toy at the price it&prime;s currently being sold for.";'>Market</button>
            <button class="tour-tab" data-label="Limit"  type="button" onClick='new Promise(function (resolve) {document.querySelector(".step4NextButton").disabled = false;[...document.querySelector(".step-4-tour-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".step-4-tour-tabs").children][1].classList.add("tour-selected-tab");[...document.querySelector(".Exchange-swap-order-type-tabs").children].forEach((element, index) => {if (index == 1) {element.classList.add("active");element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-sub-tab-container").innerHTML = "This is when you decide to buy or sell a cryptocurrency only at a specific price or better. It&prime;s like waiting for a toy to go on sale before you buy it.";'>Limit</button>

            <button class="tour-tab" data-label="Trigger"  type="button" onClick='new Promise(function (resolve) {document.querySelector(".step4NextButton").disabled = true;[...document.querySelector(".step-4-tour-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".step-4-tour-tabs").children][2].classList.add("tour-selected-tab");[...document.querySelector(".Exchange-swap-order-type-tabs").children].forEach((element, index) => {if (index == 2) {element.classList.add("active");element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-sub-tab-container").innerHTML = "This is a special type of order that starts as soon as a specific price is reached. It&prime;s like setting an alarm to remind you to buy a toy when its price drops to a certain point.";'>Trigger</button>
              <div id="content"></div>

        </div>
      </div>
    </div>
    <div class="tour-sub-tab-container s-description" >This is when you buy or sell a cryptocurrency immediately at the best available price in the market. It&prime;s like buying a toy at the price it&prime;s currently being sold for.</div>
          `,
    attachTo: { element: ".Exchange-swap-order-type-tabs", on: "left" },
    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
       action(){
        let activeTab = JSON.parse(localStorage.getItem('["Order-option"]'));
        localStorage.setItem("viewed_tour_modal","false")
        if(activeTab !== "Stop"){
          addStepActionClasses()
        }
        this.next()
       },
       classes:'step4NextButton',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },


  {
    id: "payExchange",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      let activeTab = JSON.parse(localStorage.getItem('["Order-option"]'));
      localStorage.setItem("viewed_tour_modal","false")
      return (Object.values(swapPptionV2).includes("Long") === true || Object.values(swapPptionV2).includes("Short") === true) && activeTab !== 'Stop' ;
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'));
        if(Object.values(swapPptionV2).includes("Long") === true ){
          document.querySelector(".payExchange").innerHTML = 'Long'
        }else if( Object.values(swapPptionV2).includes("Short") === true){
          document.querySelector(".payExchange").innerHTML = 'Short'
        }
        if(localStorage.getItem("viewed_tour_modal") === "false"){
          document.querySelectorAll('.steps-TokenSelector').forEach(e=>{
              e.addEventListener("click",()=>{
                this.hide()
              })
            })
          }
        },
      hide:function() {
        activeTourStep('.Pay-modal', this)
      }
    },
    text: `
    </div>
    <div class="s-subTitle">Select the token through which you want to finance <span class="payExchange"></span> Position and enter the amount
    <br/></div>
            `,
    attachTo: { element: ".pay-exchange", on: "left" },

    buttons: [
      {
        action(){
          localStorage.setItem('viewed_tour_modal',"true")
          this.complete();
        },
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          removeStepActionClasses()
          localStorage.setItem("viewed_tour_modal","true")
          this.back()
        },
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        type: "next",
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },
  {
    id: "exchange",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return Object.values(swapPptionV2).includes("Long") === true || Object.values(swapPptionV2).includes("Short") === true;
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'));
       if(Object.values(swapPptionV2).includes("Long") === true ){
        document.querySelector(".exchange").innerHTML = 'Long'
       }else if( Object.values(swapPptionV2).includes("Short") === true){
        document.querySelector(".exchange").innerHTML = 'Short'
       }
       if(localStorage.getItem("viewed_tour_modal") === "false"){
          document.querySelectorAll('.steps-TokenSelector').forEach(e=>{
            e.addEventListener("click",()=>{
              this.hide()
            })
          })
        }
      },
      hide:function() {
        activeTourStep('.swapbox-modal', this)
      }
    },
    text: `
    </div>
    <div class="s-subTitle">Select the token that you
    want to <span class="exchange"></span></div>
            `,
    attachTo: { element: ".long-exchange", on: "left" },

    buttons: [
      {
        action(){
          localStorage.setItem('viewed_tour_modal',"true")
          this.complete();
        },
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        classes:"exchange-button",
        action(){
          removeStepActionClasses()
          localStorage.setItem("viewed_tour_modal","true")
          this.next();
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    </div>
        `,
      },
    ],
  },


  {
    id: "price",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ( (Object.values(swapPptionV2).includes("Long") === true || Object.values(swapPptionV2).includes("Short") === true)  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML === 'Limit');
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'));
       if(Object.values(swapPptionV2).includes("Long") === true ){
        document.querySelector(".price-label").innerHTML = 'Long'
       }else if( Object.values(swapPptionV2).includes("Short") === true){
        document.querySelector(".price-label").innerHTML = 'Short'
       }

      }
    },
    text: `
    <div class="s-subTitle">Enter the price at which you want to initiate the <span class="price-label"></span></div>
            `,
    attachTo: { element: ".price-exchange", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          addStepActionClasses()
          localStorage.setItem("viewed_tour_modal","false")
          this.back();
        },
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {

        type: "next",
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },




  {
    id: "leverageSlider",
    classes: "shepherd-expanded",
    title:'',
    attachTo: { element: ".Exchange-leverage-slider", on: "left" },
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ((Object.values(swapPptionV2).includes("Short") === true || Object.values(swapPptionV2).includes("Long") === true) );
    },
    when: {
      show: function() {
        if(document.querySelector('.leverage-btn').innerHTML === 'Enable Leverage'){
          localStorage.setItem("HideEnableLeverageStep", 'false')
        }
        if(document.querySelector(".Exchange-swap-button").hasAttribute("disabled")){
          document.querySelector(".leverageSlider-button").disabled = true;
        }
      }
    },

    text: `
    <div class="s-title">Choose the leverage </div>
    <div class="s-description">"Leverage" in trading is using borrowed funds to amplify your investment, potentially increasing both gains and losses. Be cautious, don’t use too much leverage.</div>
            `,
    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          addStepActionClasses()
          localStorage.setItem("viewed_tour_modal", "false")
          this.back();
        },
        text: `
        <div style=" display: flex; align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        type: "next",
        classes:"leverageSlider-button",
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },


  {
    id: "swapPay",
    title:'',
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ( Object.values(swapPptionV2).includes("Swap")  === true);
    },
    when:{
      show:function(){
        if(localStorage.getItem("viewed_tour_modal") === "false"){
          document.querySelectorAll('.steps-TokenSelector').forEach(e=>{
            e.addEventListener("click",()=>{
              this.hide()
            })
          })
        }
      },
      hide:function() {
        activeTourStep('.Pay-modal', this)
      }
    },
    text: `
    </div>
    <div class="s-title">Select primary token</div>
    <div class="s-description">A token that you want to exchange for another token.</div>
            `,
    attachTo: { element: ".pay-exchange", on: "left" },

    buttons: [
      {
        action(){
          localStorage.setItem('viewed_tour_modal',"true")
          this.complete();
        },
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type:'back',
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        type:'next',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "swapReceive",
    title:'',
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ( Object.values(swapPptionV2).includes("Swap")  === true);
    },
    when: {
      show: function() {
        localStorage.setItem("viewed_tour_modal","false")
       if(localStorage.getItem("viewed_tour_modal") === "false"){
          document.querySelectorAll('.steps-TokenSelector').forEach(e=>{
            e.addEventListener("click",()=>{
              this.hide()
            })
          })
        }
        clearInterval()
          setInterval(() => {
            if(JSON.parse(localStorage.getItem('["Order-option"]'))  === "Market" ){
            if(!document.querySelector('.Exchange-swap-button').hasAttribute('disabled')){
              document.querySelector('.swapReceive-Step-Next').disabled =  false
            }else{
              document.querySelector('.swapReceive-Step-Next').disabled =  true
            }
          }
          },  1000);
      },
      hide:function() {
        activeTourStep('.swapbox-modal', this)
      }
    },
    text: `
    </div>
    <div class="s-title">Token you want</div>
    <div class="s-description">Select the token that you want against the primary token.</div>
            `,
    attachTo: { element: ".long-exchange", on: "left" },

    buttons: [
      {
        action(){
          clearInterval();
          localStorage.setItem('viewed_tour_modal',"true")
          this.complete();
        },
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {

        type:'back',
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          clearInterval()
          removeStepActionClasses()
          localStorage.setItem("viewed_tour_modal","true")

            if(document.querySelector('.swap-button').innerHTML.includes("Approve")  ){
              this.show('ApproveSwap')
            }else{
              this.show('letsSwap')
            }

        },
        classes:'swapReceive-Step-Next',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "ApproveSwap",
    title:'',
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return (Object.values(swapPptionV2).includes("Swap") === true && JSON.parse(localStorage.getItem('["Order-option"]'))  === "Market" )
    },
    when: {
      show: function() {

          setInterval(() => {
            if(!document.querySelector('.swap-button').innerHTML.includes("Approve")){
              document.querySelector('.letsSwapNext').click()
            }
          },  1000);
      },
      hide:function() {
        clearInterval()
      }
    },
    text: `
    </div>
    <div class="s-title">Approve Token</div>
           `,
    attachTo: { element: ".swap-button", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {

        action(){
          addStepActionClasses()
          localStorage.setItem("viewed_tour_modal","false")
          this.show('swapReceive')
        },
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){

          if(document.querySelector('.swap-button').innerHTML.includes("Approve")  ){
            document.querySelector(".swap-button").click();
          }
        },
        classes:'letsSwapNext',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "letsSwap",
    title:'',
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return (Object.values(swapPptionV2).includes("Swap") === true && JSON.parse(localStorage.getItem('["Order-option"]'))  === "Market" )
    },
    text: `
    </div>
    <div class="s-title">Let’s Swap</div>
    <div class="s-description">Click on Confirm and a popup from your connected wallet will appear. You need to click again to confirm or approve depending on the wallet you use to sign the transaction.</div>
            `,
    attachTo: { element: ".swap-button", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          addStepActionClasses()
          localStorage.setItem("viewed_tour_modal","false")
          this.show('swapReceive')
        },
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".swap-button").click();
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "CheckPaperWork",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return (Object.values(swapPptionV2).includes("Swap") === true && JSON.parse(localStorage.getItem('["Order-option"]'))  === "Market" )
    },
    when: {
      show: function() {
        document.querySelector('.Exchange-swap-box').querySelector('.Modal-close-button').addEventListener('click',()=>{
          document.querySelector('.CheckPaperWorkSwapLimit').click()
        })
      }
    },
    text: `
    </div>
    <div class="s-title">Check the Paperwork</div>
    <div class="s-description">
      <ul>
        <li><span style=" font-weight: 700;">Minimum Received:</span> shows the number of tokens your wallet will receive after a successful swap.</li>
        <li><span style="font-weight:700;">Price Impact:</span> Price Impact is the change in token price directly caused by your trade, make sure to not move the market.</li>
       </ul>
    </div>


    `,
    attachTo: { element: ".Modal-content.Confirmation-box-content", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          document.querySelector(".Confirmation-box .Modal-close-button").click();

          this.show('letsSwap');
        },
        classes:'CheckPaperWorkSwapLimit',
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".Confirmation-box-swap-button").click();
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },


  {
    id: "swapPrice",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return (Object.values(swapPptionV2).includes("Swap") === true && JSON.parse(localStorage.getItem('["Order-option"]'))  === "Limit" )
    },
    when: {
      show:function(){
        setInterval(() => {
          if(!document.querySelector('.Exchange-swap-button').hasAttribute('disabled')){
            document.querySelector('.swapPriceBoxNext').disabled =  false
          }else{
            document.querySelector('.swapPriceBoxNext').disabled =  true
          }
        }, 1000);
      },
      hide:function(){
        clearInterval()
      }
    },
    text: `
    <div class="s-subTitle">Enter the price at which you want to initiate the swap</div>
            `,
    attachTo: { element: ".price-swap", on: "left" },

    buttons: [
      {
        action(){
          clearInterval()
          this.complete()
        },
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          clearInterval()
          addStepActionClasses()

          localStorage.setItem("viewed_tour_modal","false")
          this.back();
        },
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {

        action(){
          clearInterval()
          this.next()
        },
        classes:'swapPriceBoxNext',
        disabled:'true',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },
   {
    id: "swapCheckAllTtransactions",
    title:'',
    showOn(){
     let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
     return (Object.values(swapPptionV2).includes("Swap") === true && JSON.parse(localStorage.getItem('["Order-option"]'))  === "Market" )
    },
    when:{
      show: function() {
        setTimeout(()=>{
          document.querySelector('.swapCheckAllTtransactionNext').click()
        },3000)
      }
    },
    text: `
    </div>
    <div class="s-title">Check all the transactions
    and their status</div>
    <div class="s-description">In this space you can check all the past transactions and status of each one.
    Thank you for swapping on QuickSwap :)</div>
            `,
    attachTo: { element: ".checkStatus", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type:"next",
        classes:'swapCheckAllTtransactionNext',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "enableLeverage",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return (Object.values(swapPptionV2).includes("Long") === true   && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit' && localStorage.getItem("HideEnableLeverageStep")  === 'false');

    },
    text: `<div class="s-title">Enable Leverage</div>
    <div class="s-description">Click on Enable Leverage and Sign the transaction in wallet for Leverage to be enabled. This is a one-time process.</div>`,
    attachTo: { element: ".leverage-btn", on: "left" },


    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".Exchange-swap-button").click();
          this.next();
        },

        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "enableLeverageDisclaimer",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return (Object.values(swapPptionV2).includes("Long") === true   && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit' && localStorage.getItem("HideEnableLeverageStep")  === 'false');
    },
    when: {
      show: function() {
        if(document.querySelector(".Disclaimer-button").hasAttribute("disabled")){
          document.querySelector(".Disclaimer-Step-Next").disabled = true;
        }
        localStorage.setItem("HideEnableLeverageStep",'true')
      }
    },
    text: `<div class="s-title">Confirm Enable Leverage</div>
      <div class="s-description">
      <label for="DisclaimerCheckAll"><input type="checkbox"  onClick='new Promise(function (resolve) {
        if(!document.querySelector("#DisclaimerCheckAll").hasAttribute("checked")){
          document.querySelector("#DisclaimerCheckAll").disabled = true;
        }
        document.querySelectorAll(".Disclaimer-checkbox").forEach(e=> e.click());
         if(document.querySelector(".Disclaimer-button").hasAttribute("disabled")){
        document.querySelector(".Disclaimer-Step-Next").disabled = false;
      }resolve();});
        ' name="DisclaimerCheckAll" id="DisclaimerCheckAll"> Check checkbox</label>
      </div>
    `,

    attachTo: { element: ".Disclaimer-content", on: "left" },


    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){

          document.querySelector(".Disclaimer-button").click();
          this.next();
        },
        classes:'Disclaimer-Step-Next',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "ClickOnSwapLongShortToken",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ((Object.values(swapPptionV2).includes("Long") === true || Object.values(swapPptionV2).includes("Short") === true)  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit');
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
        document.querySelector(".ClickOnSwapLongShortTokenLabel").innerHTML =  Object.values(swapPptionV2).includes("Long") === true ? 'Long' : 'Short';
        if(!document.querySelector('.leverage-btn').innerHTML.includes(Object.values(swapPptionV2).includes("Long") === true ? 'Long' : 'Short')){
          document.querySelector('.ClickOnSwapLongShortTokenNext').disabled = true
        }
      }
    },

    text: `
    </div>
    <div class="s-subTitle"> Click on <span class="ClickOnSwapLongShortTokenLabel"></span> ETH</div>

            `,
    attachTo: { element: ".long-short-swap-button", on: "left" },


    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        classes:'ClickOnSwapLongShortTokenNext',
        action(){
          document.querySelector(".long-short-swap-button").click();
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },

  {
    id: "CheckPaperWorkNotLimit",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ((Object.values(swapPptionV2).includes("Short") === true || Object.values(swapPptionV2).includes("Long") === true)  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit');
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
        document.querySelectorAll(".CheckPaperWorkLabel").forEach(e=> {
        e.innerHTML =  Object.values(swapPptionV2).includes("Long") === true ? 'Long' : 'Short'
        document.querySelector('.Exchange-swap-box').querySelector('.Modal-close-button').addEventListener('click',()=>{
          document.querySelector('.CheckPaperWorkNotLimitBackButton').click()
        })
      })
      }
    },
    text: `
    </div>
    <div class="s-title">Check the paperwork
    to <span class="CheckPaperWorkLabel"></span></div>
    <div class="s-description">
      <ul>
        <li><span style=" font-weight: 700;">Leverage:</span> Shows your chosen leverage.</li>
        <li><span style="font-weight:700;">Entry Price:</span> The price at which the trade will initiate.</li>
        <li><span style="font-weight:700;">Liquidity Price:</span> If the token price reaches here, you will lose all the tokens.</li>
        <li><span style="font-weight:700;">Fees:</span> The fees you are paying to execute the trade.</li>
      </ul>
      Click on Long and sign the transaction to initiate the <span class="CheckPaperWorkLabel"></span> trade.
    </div>
    `,
    attachTo: { element: ".Modal-content.Confirmation-box-content", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          this.show('ClickOnSwapLongShortToken')
          if(!!document.querySelector('.Exchange-swap-box').querySelector('.Confirmation-box')){
            document.querySelector(".Confirmation-box .Modal-close-button").click();
          }
        },
        classes:'CheckPaperWorkNotLimitBackButton',
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".Confirmation-box-button").click();
        },
        classes:'CheckPaperWorkNotLimitNextButton',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },




  {
    id: "createLimitOrder",
    title: "",
    showOn(){
      return ( document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML === 'Limit') && document.querySelector('.Exchange-swap-button').innerHTML === "Create Limit Order";
    },
    text: `
    <div class="s-subTitle">
    Now click on Create Limit order
    to initiate placing a limit order trade</div>
            `,
    attachTo: { element: ".Exchange-swap-button", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",

        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".Exchange-swap-button").click();
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },



  {
    id: "enableOrders",
    title: "",
    showOn(){
      return ( document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML === 'Limit')  && document.querySelector('.Exchange-swap-button').innerHTML === "Enable Orders";
    },
    text: `
    </div>
    <div class="s-title">Enable Orders</div>
    <div class="s-description">Check the mark to accept the terms and conditions, click on the accept terms to enable orders and sign the transaction in your wallet to enable it.</div>
            `,
    attachTo: { element: ".enable-orders", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".enable-order-button").click();
          this.next();
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "createOrder",
    title: "",
    showOn(){
      return (document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML === 'Limit');
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
        document.querySelectorAll(".createOrderLabel").forEach(e=> {
          e.innerHTML =  Object.values(swapPptionV2).includes("Long") === true ? 'Long' : Object.values(swapPptionV2).includes("Short") === true ? 'Short' : 'Swap'
        })
        document.querySelector('.Exchange-swap-box').querySelector('.Modal-close-button').addEventListener('click',()=>{
          document.querySelector('.createOrderBackButton').click()
        })
      }
    },
    text: `
    </div>
    <div class="s-title">Check the paperwork to Limit <span class="createOrderLabel"></span></div>
    <div class="s-description">
      <ul>
        <li><span style=" font-weight: 700;">Leverage:</span> Shows your chosen leverage.</li>
        <li><span style="font-weight:700;">Entry Price:</span> The price at which the trade will initiate.</li>
        <li><span style="font-weight:700;">Liquidity Price:</span> If the token price reaches here, you will lose all the tokens.</li>
        <li><span style="font-weight:700;">Fees:</span> The fees you are paying to execute the trade.</li>

      </ul>
      Click on Create Order and sign the transaction to initiate the Limit <span class="createOrderLabel"></span> trade.
    </div> `,
    attachTo: { element: ".Confirmation-box-content", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        action(){
          this.show('createLimitOrder')
          if(!!document.querySelector('.Exchange-swap-box').querySelector('.Confirmation-box')){
            document.querySelector(".Confirmation-box .Modal-close-button").click();
          }
        },
        classes:'createOrderBackButton',
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".Confirmation-box-swap-button").click();
        },
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },



  // {
  //   id: "OrderTabs",
  //   title: "",
  //   showOn(){
  //     return ( document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML === 'Limit');
  //   },
  //   when: {
  //     show: function() {
  //       let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
  //       document.querySelector(".OrderTabsLabel").innerHTML  = Object.values(swapPptionV2).includes("Long") === true ? 'Long' : 'Short'
  //        let chartsListTabs =  document.querySelector(".charts-list-tabs").querySelectorAll('.Tab-option')
  //       for (let i = 0; i < chartsListTabs.length; i++) {
  //         if(!!chartsListTabs[i].innerHTML.includes("Orders")){
  //           chartsListTabs[i].click()
  //         }
  //       }
  //     }
  //   },
  //   text: `
  //   </div>
  //   <div class="s-subTitle">
  //   Check your created Limit <span class="OrderTabsLabel">Long</span> order under the orders tab.</div>
  //   `,
  //   attachTo: { element: ".charts-list-tabs .active", on: "left" },

  //   buttons: [
  //     {
  //       type:'complete',
  //       text: `
  //       <div class="skip">Skip</div>
  //       `,
  //     },
  //     {
  //       type: "back",
  //       text: `
  //       <div style="
  //       display: flex;
  //       align-items: center;">
  //           <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  //           </svg>
  //           <div class="back">Prev</div>
  //           </div>
  //       `,
  //     },
  //     {
  //       action(){
  //         this.next();
  //       },
  //       text: `
  //       <div class="s-next">
  //       <div>Next</div>
  //       <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
  //       <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </svg>
  //       </div>
  //       `,
  //     },
  //   ],
  // },
  // {
  //   id: "OrderEdit",
  //   title: "",
  //   showOn(){

  //     return ( document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML === 'Limit');
  //   },
  //   when: {
  //     show: function() {
  //       let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
  //       document.querySelector(".OrderEdit").innerHTML  = Object.values(swapPptionV2).includes("Long") === true ? 'Long' : 'Short'
  //     }
  //   },
  //   text: `
  //   </div>
  //     <div class="s-title">Edit Entry price for the order by clicking on Edit button.</div>
  //     <div class="tour-tab-container s-description">Enter the updated price at which you want to execute Limit <span class="OrderEdit">Long</span> Trade and press Update Order.
  //     </div>
  //   `,
  //   attachTo: { element: ".edit-tour-button", on: "left" },

  //   buttons: [
  //     {
  //       type:'complete',
  //       text: `
  //       <div class="skip">Skip</div>
  //       `,
  //     },
  //     {
  //       type: "back",
  //       text: `
  //       <div style="
  //       display: flex;
  //       align-items: center;">
  //           <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  //           </svg>
  //           <div class="back">Prev</div>
  //       </div>
  //       `,
  //     },
  //     {
  //       type:'next',
  //       text: `
  //       <div class="s-next">
  //       <div>Next</div>
  //       <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
  //       <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </svg>
  //       </div>
  //       `,
  //     },
  //   ],
  // },
  // {
  //   id: "OrderCancel",
  //   title: "",
  //   showOn(){
  //     return ( document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML === 'Limit');
  //   },
  //   text: `
  //   </div>
  //     <div class="s-subTitle">To cancel the order, press on cancel and Sign the transaction.</div>
  //   `,
  //   attachTo: { element: ".cancel-tour-button", on: "left" },

  //   buttons: [
  //     {
  //       type:'complete',
  //       text: `
  //       <div class="skip">Skip</div>
  //       `,
  //     },
  //     {
  //       type: "back",
  //       text: `
  //       <div style="
  //       display: flex;
  //       align-items: center;">
  //           <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  //           </svg>
  //           <div class="back">Prev</div>
  //           </div>
  //       `,
  //     },
  //     {
  //       action(){
  //         this.next();
  //       },
  //       text: `
  //       <div class="s-next">
  //       <div>Next</div>
  //       <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
  //       <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </svg>
  //       </div>
  //       `,
  //     },
  //   ],
  // },



  {
    id: "feedback",
    title: "",
    when:{
      show:function(){
        document.querySelector('.feedback-rating').querySelectorAll('li').forEach(e=>{

          e.addEventListener('click',()=>{
            if(document.querySelector('.feedback-rating .active')){
                document.querySelector('.feedback-rating .active').classList.remove('active')
              }
            e.classList.add('active')
            document.querySelector('.submit-feedback-button').disabled = false
          })
        })
      }
    },
    text: [
      `
      <div class="s-title">Rate your experience</div>

      <div style="text-align:center">
        <ul class="feedback-rating">
          <li><img src="/feedback1.svg"/></li>
          <li><img src="/feedback2.svg"/></li>
          <li><img src="/feedback3.svg"/></li>
          <li><img src="/feedback4.svg"/></li>
          <li><img src="/feedback5.svg"/></li>
        </ul>
      </div>
    `,
    ],
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type:'hide',
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <div class="back">Close</div>
            </div>
        `,
      },
      {
        type:'hide',
        disabled:true,
        classes:"submit-feedback-button",
        text: `
        <div class="s-next">
        <div >Submit</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },


  // {
  //   id: "position",
  //   title: "",
  //   showOn(){
  //     let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
  //     return ((Object.values(swapPptionV2).includes("Short") === true || Object.values(swapPptionV2).includes("Long") === true)  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit');
  //   },
  //   text: `
  //   </div>
  //   <div class="s-subTitle">
  //   You can track your position here.</div>
  //   `,
  //   attachTo: { element: ".position-heading", on: "top" },


  //   buttons: [
  //     {
  //       type:'complete',
  //       text: `
  //       <div class="skip">Skip</div>
  //       `,
  //     },
  //     {
  //       action(){
  //         this.next();
  //       },
  //       text: `
  //       <div class="s-next">
  //       <div>Next</div>
  //       <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
  //       <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </svg>
  //       </div>
  //       `,
  //     },
  //   ],
  // },
  // {
  //   id: "closeAction",
  //   title: "",
  //   showOn(){
  //     let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
  //     return ((Object.values(swapPptionV2).includes("Long") === true || Object.values(swapPptionV2).includes("Short") === true)  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit');
  //   },
  //   text: `
  //   </div>
  //   <div class="s-subTitle">Closing Order</div>
  //   <div class="s-description">You can either close an order on market price or set a trigger to automatically close the order.</div>
  //   `,
  //   attachTo: { element: ".exchange-list-close-action", on: "top" },


  //   buttons: [
  //     {
  //       type:'complete',
  //       text: `
  //       <div class="skip">Skip</div>
  //       `,
  //     },
  //     {
  //       type: "back",
  //       text: `
  //       <div style="
  //       display: flex;
  //       align-items: center;">
  //           <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
  //           <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
  //           </svg>
  //           <div class="back">Prev</div>
  //           </div>
  //       `,
  //     },
  //     {
  //       action(){
  //         document.querySelector(".exchange-list-close-action").click();
  //         this.next();
  //       },
  //       text: `
  //       <div class="s-next">
  //       <div>Next</div>
  //       <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
  //       <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  //       </svg>
  //       </div>
  //       `,
  //     },
  //   ],
  // },
  {
    id: "CloseModal",
    title: "",
    classes: "shepherd-expanded",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ((Object.values(swapPptionV2).includes("Long") === true || Object.values(swapPptionV2).includes("Short") === true)  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit');
    },
    when: {
      show: function() {
        document.querySelector(`[data-label='${document.querySelector('.PositionSellerTabs .active').innerHTML}']`).click()
        document.querySelector(".PositionSellerTabs").querySelectorAll('.Tab-option').forEach((element) => {
          element.addEventListener('click',()=>{
            document.querySelector(".positionSeller-list-tabs").querySelectorAll('.tour-tab').forEach((e) => {
                e.classList.remove("tour-selected-tab");
                if(element.innerHTML === e.innerHTML){
                  e.classList.add("tour-selected-tab")
                }
            })
          })
        })
      }
    },
    text: `
      <div style="display: flex; justify-content: space-between; align-items: center" >
        <div class="s-title">Choose from </div>

          <div class="positionSeller-list-tabs" style="margin: 10px 0;display: flex; align-items: center; gap: 10px; font-size: 12px;">
              <button class="tour-tab tour-selected-tab" data-label="Market"  type="button" onClick='new Promise(function (resolve) {[...document.querySelector(".positionSeller-list-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".positionSeller-list-tabs").children][0].classList.add("tour-selected-tab");[...document.querySelector(".PositionSellerTabs").children].forEach((element, index) => {if (index == 0) {element.classList.add("active"); element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-tab-container-1").innerHTML = "This is when you sell a cryptocurrency immediately at the best available price in the market.";'>Market</button>
              <button class="tour-tab"  type="button" data-label="Trigger"  onClick='new Promise(function (resolve) {
                [...document.querySelector(".positionSeller-list-tabs").children].forEach((element, index) => {element.classList.remove("tour-selected-tab");}); [...document.querySelector(".positionSeller-list-tabs").children][1].classList.add("tour-selected-tab");[...document.querySelector(".PositionSellerTabs").children].forEach((element, index) => {if (index == 1) {element.classList.add("active");element.click()} else {element.classList.remove("active");}});resolve();});document.querySelector(".tour-tab-container-1").innerHTML = "This is a special type of order that starts as soon as a specific price is reached. It&prime;s like setting an alarm to remind you to sell your crypto when its price reaches a certain point.";'>Trigger</button>

          </div>
        </div>
      </div>
      <div class="tour-tab-container-1" style="width: 100%; color: #213062; font-size: 16px; font-family: Space Grotesk; font-weight: 400; line-height: 24px; word-wrap: break-word">This is when you sell a cryptocurrency immediately at the best available price in the market.
      </div>
            `,
    attachTo: { element: ".PositionSellerTabs", on: "left" },
    buttons: [
      {
        type:'complete',
        text: `
        <div style="
        <div class="skip">Skip</div>
        `,
      },
      {

        type: "next",
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },
  {
    id: "CloseModalPrice",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ((Object.values(swapPptionV2).includes("Short") === true || Object.values(swapPptionV2).includes("Long") === true ) && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit'  && (document.querySelector(".PositionSellerTabs .active").innerHTML === 'Market' || document.querySelector(".PositionSellerTabs .active").innerHTML === 'Trigger')
      );
    },

    text: `
    </div>
    <div class="s-subTitle">Enter the amount which you want to close. Clicking on Max will autofill the complete amount.</div>

    `,
    attachTo: { element: ".PositionSellerTabs-amount", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        type: "next",
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "CloseModalClosingPrice",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return ((Object.values(swapPptionV2).includes("Long") === true  || Object.values(swapPptionV2).includes("Short") === true ) && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit' &&  document.querySelector(".PositionSellerTabs .active").innerHTML === 'Trigger');
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
        document.querySelector(".CloseModalClosingPriceLabel").innerHTML  = Object.values(swapPptionV2).includes("Long") === true ? 'Long' : 'Short'
      }
    },
    text: `
    </div>
    <div class="s-title">Enter Closing Price</div>
    <div class="s-description">Enter the price at which you wish to Close the <span class="CloseModalClosingPriceLabel">Long</span> trade.</div> `,
    attachTo: { element: ".positionSellerTabs-closing-amount", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        type: "next",
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "CloseModalMarketCheckPaper",
    title: "",
    showOn(){
      let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
      return (Object.values(swapPptionV2).includes("Long") === true  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit' && (document.querySelector(".PositionSellerTabs .active").innerHTML === 'Market' || document.querySelector(".PositionSellerTabs .active").innerHTML === 'Trigger'));
    },
    when: {
      show: function() {
        let swapPptionV2 = JSON.parse(localStorage.getItem('Swap-option-v2'))
        document.querySelectorAll(".CloseModalMarketCheckPaperLabel").forEach(e=> {
          e.innerHTML =  Object.values(swapPptionV2).includes("Long") === true ? 'Long' : 'Short'
        })
        if(document.querySelector(".close-transaction-button").hasAttribute("disabled")){
          document.querySelector(".CloseModalMarketCheckPaperButton").disabled = true;
        }else{
          document.querySelector(".CloseModalMarketCheckPaperButton").disabled = false;
        }
      }
    },
    text: `
    </div>

    <div class="s-title">Check the paperwork
    to close <span class="CloseModalMarketCheckPaperLabel">Long</span></div>
    <div class="s-description">
      <ul>
        <li><span style=" font-weight: 700;">Mkt Price:</span> It shows the current market price.</li>
        <li><span style="font-weight:700;">Leverage:</span> Shows your chosen leverage.</li>
        <li><span style="font-weight:700;">Entry Price:</span> The price at which the trade will initiate.</li>
        <li><span style="font-weight:700;">Liquidity Price:</span> If the token price reaches here, you will lose all the tokens.</li>
        <li><span style="font-weight:700;">Fees:</span> The fees you are paying to execute the trade.</li>
        <li><span style="font-weight:700;">PnL:</span> Profit or Loss on your trade that you wish to close.</li>
      </ul>
      Click on Long and sign the transaction to initiate the Long trade.
    </div>

    `,
    attachTo: { element: ".PositionSeller-modal-content", on: "left" },

    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        type: "next",
        classes:'CloseModalMarketCheckPaperButton',
        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },
  {
    id: "CloseModalMarketClose",
    title: "",
    showOn(){
      let swapPptionV2 = localStorage.getItem('Swap-option-v2') && JSON.parse(localStorage.getItem('Swap-option-v2'));
      return ( (Object.values(swapPptionV2).includes("Long") === true || Object.values(swapPptionV2).includes("Short") === true)  && document.querySelector(".Exchange-swap-order-type-tabs .active").innerHTML !== 'Limit' && (document.querySelector(".PositionSellerTabs .active").innerHTML === 'Market' || document.querySelector(".PositionSellerTabs .active").innerHTML === 'Trigger'));
    },
    text: `
    </div>
    <div class="s-title">Click on Close</div>
    <div class="s-description">This will prompt you to sign a transaction to close the trade.</div>
            `,
    attachTo: { element: ".Exchange-swap-button", on: "left" },


    buttons: [
      {
        type:'complete',
        text: `
        <div class="skip">Skip</div>
        `,
      },
      {
        type: "back",
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.667 5.99972L1.00033 5.99971M1.00033 5.99971L5.66699 10.6664M1.00033 5.99971L5.66699 1.33305" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>
            <div class="back">Prev</div>
            </div>
        `,
      },
      {
        action(){
          document.querySelector(".close-transaction-button").click();
        },

        text: `
        <div class="s-next">
        <div>Next</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        </div>
        `,
      },
    ],
  },

  {
    id: "Closefeedback",
    title: "",
    when:{
      show:function(){
        document.querySelector('.feedback-rating').querySelectorAll('li').forEach(e=>{

          e.addEventListener('click',()=>{
            if(document.querySelector('.feedback-rating .active')){
                document.querySelector('.feedback-rating .active').classList.remove('active')
              }
            e.classList.add('active')
            document.querySelector('.submit-close-feedback-button').disabled = false
          })
        })
      }
    },
    text: [
      `
      <div class="s-title">Rate your experience</div>

      <div style="text-align:center">
        <ul class="feedback-rating">
          <li><img src="/feedback1.svg"/></li>
          <li><img src="/feedback2.svg"/></li>
          <li><img src="/feedback3.svg"/></li>
          <li><img src="/feedback4.svg"/></li>
          <li><img src="/feedback5.svg"/></li>
        </ul>
      </div>
    `,
    ],
    classes: "shepherd shepherd-welcome",
    buttons: [
      {
        type:'complete',
        text: `
        <div style="
        display: flex;
        align-items: center;">
            <div class="back">Close</div>
            </div>
        `,
      },
      {
        type:'complete',
        disabled:true,
        classes:"submit-close-feedback-button",
        text: `
        <div class="s-next">
        <div >Submit</div>
        <div style="width: 100%; height: 100%; margin-bottom: 1.1px; margin-left: 4px">
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.16699 7.99967H13.8337M9.16699 3.33301L13.8337 7.99967L9.16699 12.6663" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>

    </div>
        `,
      },
    ],
  },
];

export default newSteps;

import { LitElement, html } from 'lit-element';
import { red } from './shared';
import '@material/mwc-ripple/mwc-ripple';

export class HeaderComponent extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      tabs: { type: Array }
    }
  }
  render () {
    return html`
      <style>
        header {
          position:fixed;
          top:0px;
          left:0px;
          width:100vw;
          height:${this.tabs.length > 0 ? 7 : 3.5}rem;
          transition:box-shadow 0.4s cubic-bezier(0.4,0,0,1);
          color:#222;
          overflow:hidden;
          z-index:4;
          background-color:white;
          overflow:hidden;
          display:flex;
          align-items:center;
          flex-direction:column;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        .title {
          text-align:center;
          font-size:20pt;
          //font-weight: 300;
          height:3.5rem;
          margin:0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        tab-container {
          width:100%;
        }
      </style>
      <header>
        <p class="title">${this.title}</p>
        <tab-container id="${`${this.title}-tabs`}" .tabs=${this.tabs}></tab-container>
      </header>
    `;
  }
}

export class TabContainer extends LitElement {
  static get properties () {
    return {
      tabs: { type: Array },
      selected: { type: Number },
      id: { type: String }
    }
  }
  constructor () {
    super();
    this.selected = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    document.dispatchEvent(new CustomEvent(`tabs-created-${this.id}`, { detail: { element: this } }));
  }
  render () {
    return this.tabs.length > 0 ? html`
      <style>
        nav {
          position:relative;
          width:100%;
          height:3.5rem;
          display:flex;
          flex-direction:row;
        }
        .header-tabindicator {
          position:absolute;
          left:0px;
          top:52px;
          height:8px;
          width:${100/this.tabs.length}%;
          border-radius:4px;
          background-color:${red};
          z-index:1;
          transition:transform 0.4s cubic-bezier(0.4,0,0,1);
          transform:translate(${100*this.selected}%);
        }
        tab-component {
          width:100%;
        }
      </style>
      <nav>
        ${this.tabs.map((tab, index) => html`<tab-component .selected=${this.selected == index} .index=${index} .tabChange=${tab => {
          this.selected = tab;
          this.dispatchEvent(new CustomEvent('tab-change', { detail: {tab:tab}}));
        }}>${tab}</tab-component>`)}
        <span class="header-tabindicator"></span>
      </nav>` : null;
  }
  touchStart() {
    console.log('touch started');
    this.shadowRoot.querySelector('.header-tabindicator').style.transition = 'none';
  }
  touchMove(x) {
    this.shadowRoot.querySelector('.header-tabindicator').style.transform = `translate(calc(${100*this.selected}% - ${x/this.tabs.length}px))`;
  }
  touchEnd(tab) {
    this.selected = tab;
    console.log('selected is ', tab);
    this.shadowRoot.querySelector('.header-tabindicator').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
    this.shadowRoot.querySelector('.header-tabindicator').style.transform = `translate(${100*this.selected}%)`;
    setTimeout(() => {
      this.shadowRoot.querySelector('.header-tabindicator').style.transition = null;
      this.shadowRoot.querySelector('.header-tabindicator').style.transform = null;
    }, 400);
  }
  touchCancel() {
    this.shadowRoot.querySelector('.header-tabindicator').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
    this.shadowRoot.querySelector('.header-tabindicator').style.transform = `translate(${100*this.selected}%)`;
    setTimeout(() => {
      this.shadowRoot.querySelector('.header-tabindicator').style.transition = null;
      this.shadowRoot.querySelector('.header-tabindicator').style.transform = null;
    }, 400);
  }
}

export class TabComponent extends LitElement {
  static get properties () {
    return {
      selected: { type: Boolean },
      index: { type: Number },
      tabChange: { type: Function },
      icon: { type: String }
    }
  }
  render () {
    return html`
      <style>
        div {
          cursor:pointer;
          position:relative;
          width:100%;
          height:100%;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          margin:0px;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        @media (max-width: 419px) {
          div {
            flex-direction:column;
          }
        }
        div *:not(mwc-ripple) {
          transition:color 0.4s cubic-bezier(0.4,0,0,1), transform 0.4s cubic-bezier(0.4,0,0,1);
          transition-delay: 0s;
          transform:scale(0.8);
        }
        div[selected=true] *:not(mwc-ripple) {
          transform:scale(1);
          color:${red};
        }
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;  /* Preferred icon size */
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: 'liga';
        }
      </style>
      <div selected=${this.selected} @click="${()=>{this.tabChange(this.index)}}">
        ${this.icon ? html`<i class="material-icons">${this.icon}</i>` : null}
        <span><slot></slot></span>
        <mwc-ripple primary></mwc-ripple>
      </div>
    `;
  }
}

export class TabView extends LitElement {
  static get properties () {
    return {
      for: { type: String },
      selected: { type: Number },
      swipeable: { type: Boolean }
    }
  }
  constructor () {
    super();
    this.touchInfo = {
      start: {},
      previous: {}
    }
  }
  connectedCallback () {
    this.selected = 0;
    document.addEventListener(`tabs-created-${this.for}`, event => {
      this.tabContainerElement = event.detail.element;
      super.connectedCallback();
      this.tabContainerElement.addEventListener('tab-change', event => {
        this.selected = event.detail.tab;
      });
    });
    this.addEventListener('touchstart', event => {
      this.shadowRoot.querySelector('div').style.transition = 'none';
      this.swipeable = true;
      this.tabContainerElement.touchStart();
      this.touchInfo = {
        start: {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        },
        previous: this.touchInfo.start,
      }
    });
    this.addEventListener('touchmove', event => {
      if (this.swipeable) {
        this.tabContainerElement.touchMove(event.touches[0].clientX - this.touchInfo.start.x);
        this.shadowRoot.querySelector('div').style.transform = `translate(${-window.innerWidth*this.selected + event.touches[0].clientX - this.touchInfo.start.x}px)`;
        this.touchInfo.previous = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
        let yDistance = this.touchInfo.start.y - event.touches[0].clientY;
        if (Math.abs(yDistance) > 50) {
          this.dispatchEvent(new Event('touchcancel'));
          this.swipeable = false;
        }
      }
    });
    this.addEventListener('touchend', event => {
      if (this.swipeable) {
        if (this.touchInfo.previous.x - this.touchInfo.start.x < window.innerWidth/4-window.innerWidth/2) this.selected++;
        if (this.touchInfo.previous.x - this.touchInfo.start.x > window.innerWidth/4) this.selected--;
        this.tabContainerElement.touchEnd(this.selected);
        this.shadowRoot.querySelector('div').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
        this.shadowRoot.querySelector('div').style.transform = `translate(-${this.selected*100/this.tabContainerElement.tabs.length}%)`;
        setTimeout(() => {
          this.shadowRoot.querySelector('div').style.transition = null;
          this.shadowRoot.querySelector('div').style.transform = null;
        }, 400);
      }
    });
    this.addEventListener('touchcancel', () => {
      this.tabContainerElement.touchCancel(this.selected);
      this.shadowRoot.querySelector('div').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
      this.shadowRoot.querySelector('div').style.transform = `translate(-${this.selected*100/this.tabContainerElement.tabs.length}%)`;
      setTimeout(() => {
        this.shadowRoot.querySelector('div').style.transition = null;
        this.shadowRoot.querySelector('div').style.transform = null;
      }, 400);
    });
  }
  render () {
    return html`
      <style>
        div {
          overflow-x:hidden;
          transition:transform 0.4s cubic-bezier(0.4,0,0,1);
          transform:translate(-${this.selected*100/this.tabContainerElement.tabs.length}%);
          width:${100*this.tabContainerElement.tabs.length}%;
          display:flex;
          flex-direction:row;
        }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('page-header', HeaderComponent);
customElements.define('tab-container', TabContainer);
customElements.define('tab-component', TabComponent);
customElements.define('tab-view', TabView);
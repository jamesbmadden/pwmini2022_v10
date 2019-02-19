import { LitElement, html } from 'lit-element';

export class Tab extends LitElement {
  static get properties () {
    return {
      selected: { type: Boolean },
      index: { type: Number },
      tabChange: { type: Function },
      icon: { type: String },
      light: { type: Boolean }
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
          transition:color 0.4s cubic-bezier(0.4,0,0,1), transform 0.4s cubic-bezier(0.4,0,0,1), opacity 0.4s cubic-bezier(0.4,0,0,1);
          transition-delay: 0s;
          transform:scale(0.8);
          opacity: 0.5;
        }
        div[selected=true] *:not(mwc-ripple) {
          transform:scale(1);
          color:${red};
          opacity: 1;
        }
        div[light][selected=true] *:not(mwc-ripple) {
          color: white;
        }
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
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
      <div ?light=${this.light} selected=${this.selected} @click="${()=>{this.tabChange(this.index)}}">
        ${this.icon ? html`<i class="material-icons">${this.icon}</i>` : null}
        <span><slot></slot></span>
        <mwc-ripple ?primary=${!this.light} ?accent=${this.light}></mwc-ripple>
      </div>
    `;
  }
}

customElements.define('tab-component', Tab);
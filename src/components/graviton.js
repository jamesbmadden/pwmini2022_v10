import { LitElement, html, customElement, property } from 'lit-element';
import { red, grad } from './shared';

export class GravitonButton extends LitElement {
  static get properties() {
    return {
      filled: { type: Boolean }
    }
  }
  render() {
    return html`
      <style>
        .btn {
          box-sizing:border-box;
          display:inline-block;
          background-color:#fafafa;
          min-width:4rem;
          height:2.25rem;
          padding:0rem 1rem;
          border:0px;
          color:#222;
          border-radius:1.125rem;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          cursor:pointer;
          overflow:hidden;
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
          outline: none;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none;
        }
        .btn.fill {
          color: white;
          background:${grad};
          box-shadow: 0px 3px 6px rgba(244, 67, 54, 0.16);
        }
        .btn-wrapping {
          display:inline-block;
          margin:0.25rem 0rem;
        }
      </style>
      <div class="btn-wrapping">
        <button class="btn ${this.filled ? 'fill' : 'light'}">
          <slot></slot>
          <mwc-ripple ?accent=${this.filled}></mwc-ripple>
        </button>
      </div>
    `;
  }
}

export class GravitonInput extends LitElement {
  static get properties() {
    return {
      type: String,
      autocomplete: String,
      value: String
    }
  }
  constructor() {
    super();
    if (this.value == undefined) {
      this.value = '';
    }
  }
  render() {
    return html`
              <style>
                * {
                  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
                }
                .fieldInput {
                  box-sizing:border-box;
                  padding:0px 12px;
                  width:100%;
                  height:3.5rem;
                  background:transparent;
                  border:0px;
                  position:relative;
                  font-size:16pt;
                  z-index:3;
                  -webkit-appearance: none;
                }
                .highlight {
                  content:"";
                  position:absolute;
                  bottom:0px;
                  width:100%;
                  height:1px;
                  background-color:#bdbdbd;
                  transition:color 0.2s cubic-bezier(1,0,0,1);
                  pointer-events:none;
                }
                .fieldInputLabel {
                  z-index:1;
                  position:absolute;
                  top:12.5px;
                  left:2px;
                  color:#222;
                  transition:transform 0.2s cubic-bezier(1,0,0,1), font-size 0.2s cubic-bezier(1,0,0,1), color 0.2s cubic-bezier(1,0,0,1);
                  transform:translate(0px,-24px);
                  font-size:12px;
                  pointer-events:none;
                }
                supports:placeholder-shown,.fieldInputLabel {
                  transform:translate(0px,0px);
                  font-size:16px;
                }
                .fieldInput:focus {
                  outline: none;
                }
                .fieldInput:focus ~ .highlight {
                  background-color:${red};
                }
                .fieldInput:focus ~ .fieldInputLabel {
                  color:${red};
                }
                .fieldInput:focus ~ .fieldInputLabel, .fieldInput:not(:placeholder-shown) ~ .fieldInputLabel {
                  transform:translate(0px,-24px);
                  font-size:12px;
                }
                .inputContainer {
                  position:relative;
                  margin-top:12px;
                }
              </style>
              <div class="inputContainer">
                <input .value=${this.value} @input=${(e)=> {
                  this.value = e.target.value;
                  this.dispatchEvent(new Event('input'));
                }} @change=${(e)=>this.dispatchEvent(new Event('change'))} class="fieldInput" name="fieldInput" id="fieldInput" placeholder=" " type="${this.type}" autocomplete="${this.autocomplete}">
                <label class="fieldInputLabel" for="fieldInput"><slot></slot></label>
                <div class="highlight"></div>
              </div>`;
  }
}

class GravitonDropdown extends LitElement {
  static get properties () {
    return {
      options: { type: Array },
      value: { type: String }
    }
  }
  connectedCallback () {
    super.connectedCallback();
    this.value = this.options[0];
  }
  render () {
    return html`
      <style>
        select {
          height: 3.5rem;
          width: 100%;
          font-size: 16pt;
          padding-left: 8px;
          border: none;
          cursor: pointer;
          background-color: transparent;
          -webkit-appearance: none;
        }
        .highlight {
          content:"";
          position:absolute;
          bottom:0px;
          width:100%;
          height:1px;
          background-color:#bdbdbd;
          transition:color 0.2s cubic-bezier(1,0,0,1);
          pointer-events:none;
        }
        .select-container {
          position:relative;
          margin-top:12px;
        }
        .select-label {
          z-index:1;
          position:absolute;
          top:12.5px;
          left:2px;
          color:#222;
          transition:transform 0.2s cubic-bezier(1,0,0,1), font-size 0.2s cubic-bezier(1,0,0,1), color 0.2s cubic-bezier(1,0,0,1);
          transform:translate(0px,-24px);
          font-size:12px;
          pointer-events:none;
        }
        select:focus ~ .highlight {
          background-color:${red};
        }
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
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
        .drop-icon {
          position: absolute;
          font-size: 1.5rem;
          right: 0.25rem;
          top: 1rem;
          pointer-events: none;
        }
      </style>
      <div class="select-container">
        <select id="select" @input=${event => {
          this.value = event.target.value;
          this.dispatchEvent(new Event('input'));
        }} @change=${(e)=>this.dispatchEvent(new Event('change'))}>
          ${this.options.map(option => {
            return html`<option>${option}</option>`;
          })}
        </select>
        <label class="select-label" for="select"><slot></slot></label>
        <div class="highlight"></div>
        <i class="material-icons drop-icon">arrow_drop_down</i>
      </div>
    `;
  }
}

class GravitonPanel extends LitElement {

  static get properties () {
    return {
      expanded: { type: Boolean },
      value: { type: Object }
    }
  }

  constructor () {
    super();
    this.expanded = false;
  }

  render () {
    return html`
      <style>
        .panel-title {
          position: relative;
          height: 3rem;
          display: flex;
          align-items: center;
          flex-direction: row;
          cursor: pointer;
        }
        .panel:not([expanded]) > .panel-title:hover {
          background: #e3e3e3;
        }
        .panel-body {
          position: relative;
          height: 0;
          overflow: hidden;
        }
        .panel {
          box-sizing: border-box;
          width: calc(100% - 32px);
          margin: 0px auto;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
          transition: margin 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          z-index: 1;
        }
        .panel[expanded] {
          margin: 1rem auto;
          width: 100%;
        }
        .panel[expanded] > .panel-body {
          height: auto;
        }
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
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
        .drop-icon {
          position: absolute;
          font-size: 1.5rem;
          right: 0.25rem;
          pointer-events: none;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .panel[expanded] .drop-icon {
          transform: rotate(200grad);
        }
        .panel-title-value {
          margin-left: 1rem;
          color: #444;
        }
      </style>
      <div class="panel" ?expanded=${this.expanded}>
        <div class="panel-title" @click=${() => {
          this.expanded = !this.expanded;
        }}>
          <slot name="title"></slot><p class="panel-title-value">${this.value ? this.value : ''}</p>
          <i class="material-icons drop-icon">arrow_drop_down</i>
        </div>
        <div class="panel-body">
          <slot name="body"></slot>
        </div>
      </div>
    `;
  }

}

customElements.define('graviton-button', GravitonButton);
customElements.define('graviton-input', GravitonInput);
customElements.define('graviton-dropdown', GravitonDropdown);
customElements.define('graviton-panel', GravitonPanel);
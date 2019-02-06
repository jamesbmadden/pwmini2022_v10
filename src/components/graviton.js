import { LitElement, html, customElement, property } from 'lit-element';
import { red } from './shared';

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
          background-color:${red};
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
                  min-width:17.5rem;
                  height:3.5rem;
                  background:transparent;
                  border:0px;
                  position:relative;
                  font-size:16pt;
                  z-index:3;
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
                }} class="fieldInput" name="fieldInput" id="fieldInput" placeholder=" " type="${this.type}" autocomplete="${this.autocomplete}">
                <label class="fieldInputLabel" for="fieldInput"><slot></slot></label>
                <div class="highlight"></div>
              </div>`;
  }
}

customElements.define('graviton-button', GravitonButton);
customElements.define('graviton-input', GravitonInput);
import { LitElement, html } from 'lit-element';

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
          background:#fff;
          border:1px solid #bdbdbd;
          border-radius: 4px;
          position:relative;
          font-size:16pt;
          z-index:1;
          -webkit-appearance: none;
          transition:border 0.2s cubic-bezier(1,0,0,1);
        }
        .fieldInputLabel {
          z-index:2;
          position:absolute;
          top:18px;
          left:2px;
          color:#222;
          background: #fff;
          transition:transform 0.2s cubic-bezier(1,0,0,1), font-size 0.2s cubic-bezier(1,0,0,1), color 0.2s cubic-bezier(1,0,0,1);
          transform:translate(4px,-24px);
          font-size:12px;
          pointer-events:none;
        }
        supports:placeholder-shown,.fieldInputLabel {
          transform:translate(0px,0px);
          font-size:16px;
        }
        .fieldInput:focus {
          outline: none;
          border: 1px solid ${red};
        }
        .fieldInput:focus ~ .highlight {
          background-color:${red};
        }
        .fieldInput:focus ~ .fieldInputLabel {
          color:${red};
        }
        .fieldInput:focus ~ .fieldInputLabel, .fieldInput:not(:placeholder-shown) ~ .fieldInputLabel {
          transform:translate(4px,-24px);
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
      </div>`;
  }
}

customElements.define('gvt-input', GravitonInput);
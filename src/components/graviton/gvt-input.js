import { LitElement, html } from 'lit-element';
import gvtInputStyles from './gvt-input.less';

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
      <style>${gvtInputStyles.toString()}</style>
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
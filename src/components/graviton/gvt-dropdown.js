import { LitElement, html } from 'lit-element';
import gvtDropdownStyles from './gvt-dropdown.less';

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
      <style>${gvtDropdownStyles.toString()}</style>
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
        <i class="material-icons drop-icon">arrow_drop_down</i>
      </div>
    `;
  }
}

customElements.define('gvt-dropdown', GravitonDropdown);
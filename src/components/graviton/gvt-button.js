import { LitElement, html } from 'lit-element';
import gravitonButtonStyles from './gvt-button.less';
import '@material/mwc-ripple';

export class GravitonButton extends LitElement {
  static get properties() {
    return {
      filled: { type: Boolean }
    }
  }
  render() {
    return html`
      <style>${gravitonButtonStyles.toString()}</style>
      <div class="btn-wrapping">
        <button class="btn ${this.filled ? 'fill' : 'light'}">
          <slot></slot>
          <mwc-ripple ?accent=${this.filled}></mwc-ripple>
        </button>
      </div>
    `;
  }
}

customElements.define('gvt-button', GravitonButton);
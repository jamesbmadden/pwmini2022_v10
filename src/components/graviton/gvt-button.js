/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
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
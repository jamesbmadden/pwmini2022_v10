/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html } from 'lit-element';
import tabStyles from './tab.less';
import '@material/mwc-ripple';

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
      <style>${tabStyles.toString()}</style>
      <div ?light=${this.light} selected=${this.selected} @click="${()=>{this.tabChange(this.index)}}">
        ${this.icon ? html`<i class="material-icons">${this.icon}</i>` : null}
        <span><slot></slot></span>
        <mwc-ripple ?primary=${!this.light} ?accent=${this.light}></mwc-ripple>
      </div>
    `;
  }
}

customElements.define('tab-component', Tab);
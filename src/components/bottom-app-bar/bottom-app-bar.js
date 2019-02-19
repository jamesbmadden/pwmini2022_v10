/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html } from 'lit-element';
import babStyles from './bottom-app-bar.less';

export class BottomAppBar extends LitElement {
  static get properties () {
    return {
      tabs: { type: Array },
      selected: { type: Number }
    }
  }
  render () {
    return html`
      <style>
        ${babStyles.toString()}
      </style>
      <div class="bar-container">
        <div class="other-tabs">
          ${this.tabs.map((tab, index) => html`<tab-component icon="${this.tabs[index].icon}" .selected=${this.selected == index} .index=${index} .tabChange=${tab => {
            this.selected = tab;
            document.dispatchEvent( new CustomEvent('set-page', { detail: {page:this.tabs[tab].page}}));
          }}>${this.tabs[index].title}</tab-component>`)}
        </div>
        <div class="fab-offset"></div>
      </div>
    `;
  }
}

customElements.define('bottom-app-bar', BottomAppBar);
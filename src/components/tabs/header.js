/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html, css } from 'lit-element';
import { TabContainer } from './tab-container.js';
import headerStyles from './header.less';

export class HeaderComponent extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      tabs: { type: Array },
      filled: { type: Boolean }
    }
  }
  static get styles () {
    return css([headerStyles.toString()]);
  }
  constructor () {
    super();
    this.filled = true;
  }
  render () {
    return html`
      <style>
        header {
          height:${this.tabs.length > 0 ? 7 : 3.5}rem;
        }
      </style>
      <header ?filled=${this.filled}>
        <p class="title">${this.title}</p>
        <tab-container id="${`${this.title.replace(' ', '_')}-tabs`}" .tabs=${this.tabs} ?light=${this.filled}></tab-container>
      </header>
    `;
  }
}

customElements.define('page-header', HeaderComponent);
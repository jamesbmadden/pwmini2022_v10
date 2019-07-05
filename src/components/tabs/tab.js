/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html, css, svg } from 'lit-element';
import tabStyles from './tab.less';

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
  static get styles () {
    return css([tabStyles.toString()]);
  }
  render () {
    return html`
      ${this.light ? html`
        <style>
          /* DESKTOP UI */
          @media (min-width: 768px) {
            div {
              height: 3rem !important;
              justify-content: start !important;
            }
            div span {
              padding-left: 1rem !important;
            }
          }
        </style>
      ` : ''}
      <div ?light=${this.light} selected=${this.selected} @click="${()=>{this.tabChange(this.index)}}">
        ${this.icon ? svg([this.icon]) : null}
        <span><slot></slot></span>
        <mwc-ripple ?primary=${!this.light} ?accent=${this.light}></mwc-ripple>
      </div>
    `;
  }
}

customElements.define('tab-component', Tab);
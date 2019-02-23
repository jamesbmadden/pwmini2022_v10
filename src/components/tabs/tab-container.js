/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html } from 'lit-element';
import { Tab } from './tab';
import tabContainerStyles from './tab-container.less';

export class TabContainer extends LitElement {
  static get properties () {
    return {
      tabs: { type: Array },
      selected: { type: Number },
      id: { type: String },
      light: { type: Boolean }
    }
  }
  constructor () {
    super();
    this.selected = 0;
  }
  connectedCallback() {
    super.connectedCallback();
    document.dispatchEvent(new CustomEvent(`tabs-created-${this.id}`, { detail: { element: this } }));
  }
  render () {
    return this.tabs.length > 0 ? html`
      <style>
        ${tabContainerStyles.toString()}
        .header-tabindicator {
          transform:translate(${100*this.selected}%);
          width:${100/this.tabs.length}%;
        }
      </style>
      <nav>
        ${this.tabs.map((tab, index) => html`<tab-component ?light=${this.light} .selected=${this.selected == index} .index=${index} .tabChange=${tab => {
          this.selected = tab;
          this.dispatchEvent(new CustomEvent('tab-change', { detail: {tab:tab}}));
        }}>${tab}</tab-component>`)}
        <span class="header-tabindicator" ?light=${this.light}></span>
      </nav>` : null;
  }
  touchStart() {
    this.shadowRoot.querySelector('.header-tabindicator').style.transition = 'none';
  }
  touchMove(x) {
    this.shadowRoot.querySelector('.header-tabindicator').style.transform = `translate(calc(${100*this.selected}% - ${x/this.tabs.length}px))`;
  }
  touchEnd(tab) {
    this.selected = tab;
    this.dispatchEvent(new CustomEvent('tab-change', { detail: {tab:tab}}));
    this.shadowRoot.querySelector('.header-tabindicator').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
    this.shadowRoot.querySelector('.header-tabindicator').style.transform = `translate(${100*this.selected}%)`;
    setTimeout(() => {
      this.shadowRoot.querySelector('.header-tabindicator').style.transition = null;
      this.shadowRoot.querySelector('.header-tabindicator').style.transform = null;
    }, 400);
  }
  touchCancel() {
    this.shadowRoot.querySelector('.header-tabindicator').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
    this.shadowRoot.querySelector('.header-tabindicator').style.transform = `translate(${100*this.selected}%)`;
    setTimeout(() => {
      this.shadowRoot.querySelector('.header-tabindicator').style.transition = null;
      this.shadowRoot.querySelector('.header-tabindicator').style.transform = null;
    }, 400);
  }
}

customElements.define('tab-container', TabContainer);
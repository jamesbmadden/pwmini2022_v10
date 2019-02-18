/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html, customElement } from 'lit-element';
import { red } from './shared';

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
        .bar-container {
          z-index:1;
          background-color:#fff;
          position:fixed;
          bottom:0px;
          left:0px;
          width:100%;
          height:3.5rem;
          box-shadow: 0px -3px 6px rgba(0, 0, 0, 0.16);
          display:flex;
          flex-direction:row;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none;
        }
        tab-component {
          width:100%;
        }
        .other-tabs {
          width:calc(100% - 5.5rem);
          display:flex;
          flex-direction:row;
        }
        .fab-offset {
          position:relative;
          height:100%;
          width:5.5rem;
        }
        @media(min-width: 1024px) {
          .fab-offset {
            width:6rem;
          }
        }
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
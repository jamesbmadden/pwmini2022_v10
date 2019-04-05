/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { html, customElement } from 'lit-element';
import { Page } from '../page';
import { blocks } from '../shared';

export class MePage extends Page {
  static get properties () {
    return {
      user: { type: Object },
      userData: { type: Object },
      signOut: { type: Function },
      options: { type: Object },
      rerender: { type: Number }
    }
  }
  constructor () {
    super();
    this.rerender = 0;
    this.options = JSON.parse(localStorage.getItem('config'));
    this.serviceWorker = 'serviceWorker' in navigator;
  }
  get tabs () {
    return ['My Account', 'Options'];
  }
  render () {
    const classes = blocks.map(block => {
      return this.userData.classes[block];
    })
    return html`
      <style>
        ${this.pageStyles}
      </style>
      <style>
        .option-supported {
          color: #7cb342;
        }
        .option-unsupported {
          color: #e53935;
        }
      </style>
      <page-header title="Me" .tabs=${this.tabs}></page-header>
      <tab-view for="Me-tabs">
        <main class="tab scrollable">
          <enter-fade>
            <h3>Account</h3>
            <h2>${this.user.email}</h2>
            <gvt-button filled @click=${this.signOut}>Sign Out</gvt-button>
          </enter-fade>
          <enter-fade>
            <h3>Classes</h3>
            <ul>
              ${classes.map(theClass => {
                return html`<li>${theClass}</li>`;
              })}
            </ul>
            <gvt-button filled @click=${() => {
              document.dispatchEvent(new CustomEvent('set-page', { detail: { page: 'select-classes'} }));
            }}>Change</gvt-button>
          </enter-fade>
        </main>
        <main class="tab scrollable">
          <enter-fade>
            <h3>Images</h3>
            <h2 class="option-${this.options.images ? 'supported' : 'unsupported'}">${this.options.images ? 'Enabled' : 'Disabled'}</h2>
            <gvt-button filled @click=${() => {
              this.options.images = !this.options.images;
              this.rerender++;
              localStorage.setItem('config', JSON.stringify(this.options));
            }}>${this.options.images ? 'Disable' : 'Enable'}</gvt-button>
          </enter-fade>
          <enter-fade>
            <h3>Offline</h3>
            ${this.serviceWorker ? html`<h2 class="option-supported">Supported</h2>` : html`<h2 class="option-unsupported">Unsupported In Your Browser</h2>`}
          </enter-fade>
          <enter-fade>
              <h3>App Version</h3>
              <h2>Version 10.2.3</h2>
          </enter-fade>
        </main>
      </tab-view>
      <div class="fab" disabled>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
      </div>
    `;
  }
}

customElements.define('me-page', MePage);
/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { html } from 'lit-element';
import { Page } from '../page';
import { red } from '../shared';

export class ErrorPage extends Page {

  static get properties () {
    return {
      error: { type: Number }
    }
  }

  render () {
    return html`
      <style>
        ${this.pageStyles}
      </style>
      <page-header title="${this.error}" .tabs=${this.tabs}></page-header>
      <main class="tab">
        <p>Something went wrong. The current URL is probably not a page in the current version of the app.</p>
        <h2>How do I fix this?</h2>
        <p>Just press this button to return to the app:</p>
        <gvt-button filled @click=${() => document.dispatchEvent( new CustomEvent('set-page', { detail: { page: 'upcoming' }}))}>Save Me!</gvt-button>
      </main>
    `;
  }

}

customElements.define('error-page', ErrorPage);
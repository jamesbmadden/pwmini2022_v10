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
        h1 {
          text-align: center;
          color: ${red};
        }
        h3 {
          text-align: center;
        }
      </style>
      <h3></h3>
      <h1>${this.error}.</h1>
      <h3>You Seem Lost.</h3>
    `;
  }

}

customElements.define('error-page', ErrorPage);
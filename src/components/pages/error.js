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
import { html } from 'lit-element';
import { Page } from '../page';

export class SelectClasses extends Page {

  render () {
    return html`
      <style>
        ${this.pageStyles}
      </style>
      <page-header title="Select Classes" .tabs=${this.tabs}></page-header>
      <main class="tab">
        <p>Coming Soon</p>
      </main>
    `;
  }

}

customElements.define('select-classes-page', SelectClasses);
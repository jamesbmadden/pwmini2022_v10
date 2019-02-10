import { html } from 'lit-element';
import { Page } from '../page';

export class SelectClasses extends Page {

  render () {
    return html`
      <style>
        ${this.pageStyles}
        h2[slot=title] {
          margin-top: 0px;
          margin-bottom: 0px;
          height: 32px;
        }
      </style>
      <page-header title="Select Classes" .tabs=${this.tabs}></page-header>
      <main class="tab">
        <graviton-panel>
          <h2 slot="title">1.1</h2>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <h2 slot="title">1.2</h2>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <h2 slot="title">1.3</h2>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <h2 slot="title">1.4</h2>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
      </main>
    `;
  }

}

customElements.define('select-classes-page', SelectClasses);
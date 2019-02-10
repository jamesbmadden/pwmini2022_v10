import { html } from 'lit-element';
import { Page } from '../page';
import { blocks } from '../shared';

export class SelectClasses extends Page {

  constructor () {
    super();
    if (firebase.firestore() !== undefined) {
      this.getClasses();
    } else {
      document.addEventListener('firebase-firestore-loaded', () => {
        this.getClasses();
      })
    }
  }

  async getClasses () {
    const classes = firebase.firestore().collection('classes');
    const blockList = blocks.map(block => {
      return classes.doc(block);
    });
    console.log(blockList);
  }

  render () {
    return html`
      <style>
        ${this.pageStyles}
        p[slot=title] {
          margin-top: 0px;
          margin-bottom: 0px;
        }
      </style>
      <page-header title="Select Classes" .tabs=${this.tabs}></page-header>
      <main class="tab scrollable">
        <graviton-panel>
          <p slot="title">1.1</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <p slot="title">1.2</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <p slot="title">1.3</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <p slot="title">1.4</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <p slot="title">2.1</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <p slot="title">2.2</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <p slot="title">2.3</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-panel>
          <p slot="title">2.4</p>
          <div slot="body">
            <p>Graviton Panels allow for expanding cards, much like material-expansionpanel in the old version.</p>
          </div>
        </graviton-panel>
        <graviton-button filled>Begin</graviton-button>
      </main>
    `;
  }

}

customElements.define('select-classes-page', SelectClasses);
import { html, customElement } from 'lit-element';
import { Page } from '../page';
import { blocks } from '../shared';

export class MePage extends Page {
  static get properties () {
    return {
      user: { type: Object },
      userData: { type: Object },
      signOut: { type: Function }
    }
  }
  constructor () {
    super();
    this.serviceWorker = 'serviceWorker' in navigator;
  }
  get tabs () {
    return ['My Account', 'Options'];
  }
  get styles () {
    return `
      ${this.pageStyles}
    `;
  }
  render () {
    const classes = blocks.map(block => {
      return this.userData.classes[block];
    })
    return html`
      <style>
        ${this.styles}
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
          <graviton-card>
            <h3>Account</h3>
            <h2>${this.user.email}</h2>
            <graviton-button filled @click=${this.signOut}>Sign Out</graviton-button>
          </graviton-card>
          <graviton-card>
            <h3>Classes</h3>
            <ul>
              ${classes.map(theClass => {
                return html`<li>${theClass}</li>`;
              })}
            </ul>
            <graviton-button filled>Change</graviton-button>
          </graviton-card>
        </main>
        <main class="tab scrollable">
          <graviton-card>
            <h3>Images</h3>
            <h2 class="option-supported">Enabled</h2>
            <graviton-button filled>Disable</graviton-button>
          </graviton-card>
          <graviton-card>
            <h3>Offline</h3>
            ${this.serviceWorker ? html`<h2 class="option-supported">Supported</h2>` : html`<h2 class="option-unsupported">Unsupported In Your Browser</h2>`}
          </graviton-card>
          <graviton-card>
              <h3>App Version</h3>
              <h2>Version 10.0.0</h2>
          </graviton-card>
        </main>
      </tab-view>
      <div class="fab" disabled>
        <i class="material-icons">add</i>
      </div>
    `;
  }
}

customElements.define('me-page', MePage);
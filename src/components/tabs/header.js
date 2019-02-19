import { LitElement, html } from 'lit-element';
import { TabContainer } from './tab-container.js';
import headerStyles from './header.less';

export class HeaderComponent extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      tabs: { type: Array },
      filled: { type: Boolean }
    }
  }
  constructor () {
    super();
    this.filled = true;
  }
  render () {
    return html`
      <style>
        ${headerStyles.toString()}
        header {
          height:${this.tabs.length > 0 ? 7 : 3.5}rem;
        }
      </style>
      <header ?filled=${this.filled}>
        <p class="title">${this.title}</p>
        <tab-container id="${`${this.title}-tabs`}" .tabs=${this.tabs} ?light=${this.filled}></tab-container>
      </header>
    `;
  }
}

customElements.define('page-header', HeaderComponent);
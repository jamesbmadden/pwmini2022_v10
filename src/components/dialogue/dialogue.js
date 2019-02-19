/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html } from 'lit-element';
import dialogueStyles from './dialogue.less';

class Dialogue extends LitElement {

  static get properties () {
    return {
      open: { type: Boolean },
      closeDialogue: { type: Function }
    }
  }

  render () {
    return html`
      <style>${dialogueStyles.toString()}</style>
      <div class="dialogue-background" ?hidden=${!this.open} @click=${this.closeDialogue}></div>
      <div class="dialogue" ?hidden=${!this.open}>
        <header class="dialogue-header">
          <slot name="header"></slot>
        </header>
        <slot name="body"></slot>
        <footer class="dialogue-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  }

}

customElements.define('app-dialogue', Dialogue);
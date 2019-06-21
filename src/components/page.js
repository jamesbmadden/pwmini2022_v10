/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, css } from 'lit-element';
import { HeaderComponent } from './tabs/header';
import { TabView } from './tabs/tab-view';
import pageStyles from './page.less';

export class Page extends LitElement {
  static get styles () {
    return css([pageStyles.toString()]);
  }
  get tabs() {
    return [];
  }
  get pageStyles() {
    return `
      main.tab {
        margin-top: ${this.tabs.length > 0 ? 7 : 3.5}rem;
      }
      main.scrollable {
        height: calc(100vh - ${(this.tabs.length > 0 ? 7 : 3.5)}rem);
      }
    `;
  }
}
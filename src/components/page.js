/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, customElement } from 'lit-element';
import { HeaderComponent, TabContainer, TabComponent, TabView } from './tabs';
import { BottomAppBar } from './bottom-app-bar/bottom-app-bar';
import { red, grad } from './shared';
import pageStyles from './page.less';

export class Page extends LitElement {
  get tabs() {
    return [];
  }
  get pageStyles() {
    return `
      ${pageStyles.toString()}
      main.tab {
        margin-top: ${this.tabs.length > 0 ? 7 : 3.5}rem;
      }
      main.scrollable {
        height: calc(100vh - ${(this.tabs.length > 0 ? 7 : 3.5) + 3.5}rem);
      }
      .fab {
        background: ${grad};
      }
    `;
  }
}
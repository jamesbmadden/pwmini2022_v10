/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { html } from 'lit-element';
import { Page } from '../page';
import { blocks } from '../shared';
import { GravitonPanel } from '@graviton/panel';
import { Dialogue } from '../dialogue/dialogue';

export class SelectClasses extends Page {

  static get properties () {
    return {
      classes: { type: Object },
      rerender: { type: Number },
      loading: { type: Boolean },
      dialogueOpen: { type: Boolean },
      addName: { type: String }
    }
  }

  constructor () {
    super();
    this.rerender = 0;
    this.selected = {};
    this.dialogueOpen = location.pathname.split('/')[2] === 'add';
    window.addEventListener('popstate', event => {
      this.dialogueOpen = location.pathname.split('/')[2] === 'add';
    })
  }

  handleInput (event) {
    const {value, name} = event.target;
    if (this.selected[name] !== value) {
      this.selected[name] = value;
      console.log(this.selected);
      this.rerender++;
    }
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
      <main class="tab scrollable" ?hidden=${this.loading}>
        ${blocks.map(block =>  {
          return html`
            <gvt-panel value="${this.selected[block]}">
              <p slot="title">${block}</p>
              <form slot="body" id="block-${block.replace(/\./, '-')}">
                ${this.classes[block].map(className => {
                  return html`
                    <input type="radio" name=${block} value="${className}" id=${className.replace(/ /g, '-')} @click=${this.handleInput}><label for=${className.replace(/ /g, '-')}>${className}</label>
                  `;
                })}
                <gvt-button @click=${() => {
                  history.pushState({ page: 'select-classes', state: 'add', block }, `Select Classes: Add ${block}`, `/select-classes/add/${block}`);
                  this.dialogueOpen = true;
                }}>Other Class</gvt-button>
              </form>
            </gvt-panel>
          `;
        })}
        <gvt-button filled @click=${async () => {
          if (Object.keys(this.selected).length === 8) {
            if (navigator.onLine) {
              try {
                console.log('setting user');
                const email = firebase.auth().currentUser.email;
                const users = firebase.firestore().collection('users');
                console.log(email);
                this.loading = true;
                await users.doc(email).set({
                  classes: this.selected
                }, { merge: true });
                this.loading = false;
                document.dispatchEvent( new CustomEvent('set-page', { detail: { page: 'upcoming' }}));
                location.reload();
              } catch (error) {
                console.error(error);
              }
            } else {
              document.dispatchEvent(new CustomEvent('show-snackbar', { detail: { type: 'error', title: 'Failed to set classes: You don\'t have an internet connection.' } }));
            }
          } else {
            document.dispatchEvent(new CustomEvent('show-snackbar', { detail: { type: 'error', title: 'Please select a class for every block.' } }));
          }
        }}>Begin</gvt-button>
      </main>
      <main class="tab" ?hidden=${!this.loading}>
        loading...
      </main>
      <app-dialogue ?open=${this.dialogueOpen} .closeDialogue=${() => history.back()}>
        <h2 slot="header">Add Class for Block ${location.pathname.split('/')[3]}</h2>
        <div slot="body">
          <gvt-input @input=${event => {
            this.addName = event.target.value;
          }}>Class Name</gvt-input>
          <gvt-button filled @click=${() => {
            let newClass = {};
            newClass[this.addName] = {
              events: [],
              homework: []
            };
            firebase.firestore().collection('classes').doc(location.pathname.split('/')[3]).update(newClass);
            this.classes[location.pathname.split('/')[3]].push(this.addName);
            history.back();
          }}>Add</gvt-button>
          <gvt-button @click=${() => {
            history.back();
          }}>Cancel</gvt-button>
        </div>
      </app-dialogue>
    `;
  }

}

customElements.define('select-classes-page', SelectClasses);
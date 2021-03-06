/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { html, customElement } from 'lit-element';
import { Page } from '../page';
import { blocks } from '../shared';
import '../upcoming/upcoming';
import '../dialogue/dialogue';
import '../snackbar/snackbar';
import '@graviton/dropdown';
import '../enter-fade/enter-fade';
import birthdaysJson from '../../data/birthdays.json';

import * as flat from 'array.prototype.flat';

flat.shim(); // Load the flat polyfill if required by the browser

export class ClassesPage extends Page {
  static get properties () {
    return {
      email: { type: String },
      user: { type: Object },
      userData: { type: Object },
      mini: { type: Array },
      dialogueOpen: { type: Boolean },
      uploadFile: { type: Object },
      uploadFileUri: { type: String },
      imageLoadComplete: { type: Boolean },
      uploadDate: { type: String },
      uploadClass: { type: String },
      uploadTitle: { type: String },
      uploadError: { type: String },
      dialogueLoading: { type: Boolean },
      uploadIsHomework: { type: Number },
      optionsOpen: { type: Boolean },
      options: { type: Object },
      rerender: { type: Number }
    }
  }
  constructor () {
    super();
    this.dialogueOpen = location.pathname.split('/')[2] === 'add';
    this.optionsOpen = location.pathname.split('/')[2] === 'options'
    this.rerender = 0;
    this.options = JSON.parse(localStorage.getItem('config'));
    this.serviceWorker = 'serviceWorker' in navigator;
    if (this.mini == undefined) {
      this.mini = [];
    }
    window.addEventListener('popstate', event => {
      this.dialogueOpen = location.pathname.split('/')[2] === 'add';
      this.optionsOpen = location.pathname.split('/')[2] === 'options';
    })
  }
  get supportsDate () {
    if (this._supportsDate === undefined) {
      const input = document.createElement('input');
      input.type = 'date';
      this._spportsDate = input.type === 'date';
    }
    return this._spportsDate;
  }
  get tabs () {
    return [
      {
        title: 'Upcoming',
        icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 3h-1V1h-2v2H7V1H5v2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 18H4V10h16v11zm0-13H4V5h16v3z"/></svg>'
      },
      {
        title: 'Classes',
        icon: ''
      },
      {
        title: 'Classes',
        icon: ''
      },
      {
        title: 'Classes',
        icon: ''
      }
    ];
  }
  getMonthName (month) {
    switch (month) {
      case 0: return 'January';
      case 1: return 'February';
      case 2: return 'March';
      case 3: return 'April';
      case 4: return 'May';
      case 5: return 'June';
      case 6: return 'July';
      case 7: return 'August';
      case 8: return 'September';
      case 9: return 'October';
      case 10: return 'November';
      case 11: return 'December';
    }
  }
  getWeekDay (day) {
    switch (day) {
      case 0: return 'Sunday';
      case 1: return 'Monday';
      case 2: return 'Tuesday';
      case 3: return 'Wednesday';
      case 4: return 'Thursday';
      case 5: return 'Friday';
      case 6: return 'Saturday';
    }
  }

  createErrorBar (error) {
    document.dispatchEvent(new CustomEvent('show-snackbar', { detail: { type: 'error', title: error } }));
  }

  createSuccessBar (message) {
    document.dispatchEvent(new CustomEvent('show-snackbar', { detail: { type: 'success', title: message } }));
  }

  uploadImage () {
    let fileSelector = document.createElement('input');
    fileSelector.type = 'file';
    fileSelector.accept = 'image/*, image/heic';
    fileSelector.addEventListener('change', event => {
      this.imageLoadComplete = false;
      this.uploadFile = event.target.files[0];
      if (this.uploadFile.type === 'image/heic') {
        this.uploadFileUri = 'preview not supported';
      } else {
        const previewUrl = URL.createObjectURL(this.uploadFile);
        this.uploadFileUri = previewUrl;
      }
    });
    document.body.appendChild(fileSelector);
    fileSelector.click();
    document.body.removeChild(fileSelector);
  }

  async upload () {
    this.dialogueLoading = true; // Show the loading animation
    if (this.uploadTitle === undefined) { // If there's no title, abort process
      this.dialogueLoading = false;
      history.back();
      this.createErrorBar('You Need to Choose a Title.');
      return;
    }
    if (this.uploadDate === undefined) {
      this.dialogueLoading = false;
      history.back();
      this.createErrorBar('You need to Choose a Date.');
      return;
    }
    let date = new Date(this.uploadDate); // Get the date
    if (!this.supportsDate) { // Get date for browsers (safari) that don't support type=date
      date = new Date('2019-'+this.safariUploadMonth+'-'+this.safariUploadDay);
    }
    if (this.uploadClass === undefined) this.uploadClass = this.user.classes['1.1']; // If there's no uploadClass, use 1.1
    let uploadBlock = Object.keys(this.user.classes)[Object.values(this.user.classes).indexOf(this.uploadClass)]; // Find the block

    // Move to the posting - Check if user is online
    if (navigator.onLine) {
      const uploadData = new FormData();
      uploadData.append('title', this.uploadTitle);
      uploadData.append('date', this.uploadDate);
      uploadData.append('block', uploadBlock);
      uploadData.append('class', this.uploadClass);
      if (this.uploadFile) uploadData.append('image', this.uploadFile);
      const postResponse = await fetch('/api/homework/post', {
        method: 'post',
        body: uploadData,
        credentials: 'include',
        headers: {
          authorization: localStorage.getItem('jwt-token')
        }
      });
      const postJson = await postResponse.json();
      console.log(postJson);
      if (!postJson.success) {
        this.dialogueLoading = false;
        history.back();
        this.createErrorBar(`Server Error: ${postJson.error}`);
        return;
      }
      document.dispatchEvent(new CustomEvent('reload-data'));
      this.user = {
        classes:{},
        homework:[]
      };
      this.createSuccessBar('Homework Posted!');
    } else {
      this.createErrorBar('You\'re Offline, so You Can\'t Post Homework.');
    }
    this.dialogueLoading = false;
    history.back();
  }

  render () {
    this.user.classes = this.user.classes || {};
    this.user.homework = this.user.homework || [];
    const classes = blocks.map(block => {
      return this.user ? this.user.classes[block] : 'loading...';
    });
    let birthdays = birthdaysJson.map(val => {
      return {
        ...val,
        date: `${new Date().getFullYear()}-${val.date}`,
        colour: '#4caf50'
      }
    });
    const birthdaysFiltered = birthdays.filter(event => {
      const now = new Date();
      const parts = event.date.split('-');
      const date = new Date(2019, parts[1]-1, parts[2]);
      return now < date;
    });
    let calendar = [birthdaysFiltered, this.mini, this.user.homework].flat(2);
    return html`
      <style>
        ${this.pageStyles}
        #file-upload-preview {
          display: block;
          max-height: 128px;
        }
        .homework-image {
          width: 100%;
        }
        .replace-date {
          position: relative;
          width: 100%;
          display: flex;
          flex-direction: row;
        }
        app-dialogue main {
          padding-top: 3rem;
        }
        .settings-icon {
          position: fixed !important;
          z-index: 4;
          top: 0;
          right: 0;
          height: 3.5rem;
          box-sizing: border-box;
          padding: 1rem;
          cursor: pointer;
        }
        .text-align-center {
          text-align: center;
        }

        .grid-whole {
          grid-column: 1 / -1;
        }

        .gvt-card {
          position: relative;
          box-sizing: border-box;
          width: calc(100% - 2rem);
          margin: 0 1rem;
          padding: 1rem;
          p {
            margin: 0;
          }
        }

        .outer-box {
          margin: 0.25rem;
          padding: 0.25rem;
          box-shadow: 0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);
        }

        /* DESKTOP UI */
        @media (min-width: 768px) {
          .settings-icon {
            top: auto;
            right: auto;
            bottom: 0;
            left: 0;
          }
          main.grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
            grid-auto-rows: min-content;
          }
          main.grid > * {
            align-self: start
          }
        }
      </style>
      <page-header title="Mini '22" .tabs=${this.tabs}></page-header>
      <div class="settings-icon" @click=${() => {
        history.pushState({ page: 'upcoming', state: 'options' }, 'Upcoming: Options', '/upcoming/options');
        this.optionsOpen = true;
      }}>
        <img src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="white" d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>' />
        <mwc-ripple accent></mwc-ripple>
      </div>
      <tab-view for="Mini_'22-tabs" vertical>
        <main class="tab scrollable">
          <h2 class="grid-whole">Upcoming</h2>
          <pwm-upcoming .events=${calendar}></pwm-upcoming>
        </main>
        <main class="tab scrollable grid">
          <h2 class="grid-whole">Classes</h2>
          ${this.user.homework.flat().length > 0 ? this.user.homework.map((theClass, index) => {
            if (theClass.length > 0) {
              return html`
                <div class="outer-box">
                  <h2 class="class-card-title">${this.user.classes[blocks[index]]}</h2>
                  ${theClass.map(work => {
                    const parts = work.date.split('-');
                    const date = new Date(parts[0], parts[1]-1, parts[2]);
                    return html`
                      <div class="gvt-card">
                        ${work.image ? html`<img class="homework-image" src=${work.image} />` : ''}
                        <p>${work.title} for ${this.getWeekDay(date.getUTCDay())}, ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</p>
                      </div>
                    `;
                  })}
                </div>
              `;
            }
          }) : html`<p class="text-align-center grid-whole">No Homework!</p>`}
        </main>
        <main class="tab scrollable grid">
          <h2 class="grid-whole">Mini Events</h2>
          ${this.mini.length > 0 ? html`${this.mini.map(event => {
            const parts = event.date.split('-');
            const date = new Date(parts[0], parts[1]-1, parts[2]);
            return html`<div class="outer-box"><p class="gvt-card">${event.title} on ${this.getWeekDay(date.getUTCDay())}, ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</p></div>`;
          })}` : html`<p class="text-align-center grid-whole">No Mini Events...</p>`}
        </main>
        <main class="tab scrollable grid">
          <h2 class="grid-whole">Birthdays</h2>
          ${birthdays.map(birthday => {
            const parts = birthday.date.split('-');
            const date = new Date(parts[0], parts[1]-1, parts[2]);
            return html`
              <div class="outer-box"><p class="gvt-card">${birthday.title} on ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</p></div>
          `})}
        </main>
      </tab-view>
      <app-dialogue ?open=${this.dialogueOpen} .closeDialogue=${this.dialogueLoading ? () => {} : () => history.back()}>
        ${this.dialogueLoading ? html`<p style="text-align: center" slot="body">posting...</p>` : html`
          <main slot="body" style="padding-top: 0">
            <h2>Add Homework</h2>
            <gvt-dropdown .options=${blocks.map(block => this.user.classes[block])} @change=${e => {
              this.uploadClass = e.target.value;
            }}>Class</gvt-dropdown>
            <gvt-input @input=${e => {
              this.uploadTitle = e.target.value;
            }}>Title</gvt-input>
            ${this.supportsDate ? html` <!-- Input Type="date" supported -->
              <gvt-input type="date" @change=${e => {
                this.uploadDate = e.target.value;
              }}>Date</gvt-input>
            ` : html` <!-- Input Type="date" not supported. Replace with three number inputs. -->
              <div class="replace-date">
                <gvt-input type="number" @input=${event => {
                  this.safariUploadMonth = event.target.value;
                }}>Month</gvt-input>
                <gvt-input type="number" @input=${event => {
                  this.safariUploadDay = event.target.value;
                }}>Day</gvt-input>
              </div>
            `}
            <gvt-button filled @click=${this.uploadImage}>Upload Image</gvt-button><span>${this.uploadFile ? this.uploadFile.name : 'None'}</span>
            ${this.uploadFileUri ? html`<img id="file-upload-preview" src=${this.uploadFileUri} alt=".heic images can't be previewed before upload" />` : ''}
            ${this.uploadFile ? html`
              <gvt-button @click=${() => {
                this.uploadFile = undefined;
                this.uploadFileUri = undefined;
              }}>Remove Image</gvt-button>
            ` : ''}
          </main>
        <div slot="footer"><gvt-button filled ?disabled=${!this.imageLoadComplete} @click=${this.upload}>Post</gvt-button><gvt-button @click=${() => {
          history.back();
        }}>Close</gvt-button></div>`}
      </app-dialogue>
      <app-dialogue ?open=${this.optionsOpen} .closeDialogue=${() => history.back()}>
        <tab-view slot="body" for="settings-dialogue-tabs">
          <style>
            .option-supported {
              color: #7cb342;
            }
            .option-unsupported {
              color: #e53935;
            }
          </style>
          <main class="scroll">
            <h2>Account Options</h2>
            <enter-fade>
              <h3>Account</h3>
              <h2>${this.userData.email}</h2>
              <gvt-button filled @click=${this.signOut}>Sign Out</gvt-button>
            </enter-fade>
            <enter-fade>
              <h3>Classes</h3>
              <ul>
                ${classes.map(theClass => {
                  return html`<li>${theClass}</li>`;
                })}
              </ul>
              <gvt-button filled @click=${() => {
                document.dispatchEvent(new CustomEvent('set-page', { detail: { page: 'select-classes'} }));
              }}>Change</gvt-button>
            </enter-fade>
          </main>
          <main class="scroll">
            <h2>App Options</h2>
            <enter-fade>
              <h3>Images</h3>
              <h2 class="option-${this.options.images ? 'supported' : 'unsupported'}">${this.options.images ? 'Enabled' : 'Disabled'}</h2>
              <gvt-button filled @click=${() => {
                this.options.images = !this.options.images;
                this.rerender++;
                localStorage.setItem('config', JSON.stringify(this.options));
              }}>${this.options.images ? 'Disable' : 'Enable'}</gvt-button>
            </enter-fade>
            <enter-fade>
              <h3>Offline</h3>
              ${this.serviceWorker ? html`<h2 class="option-supported">Supported</h2>` : html`<h2 class="option-unsupported">Unsupported In Your Browser</h2>`}
            </enter-fade>
            <enter-fade>
                <h3>App Version</h3>
                <h2>Version 10.5</h2>
            </enter-fade>
            <details>
              <summary><h3 style="display:inline-block;cursor:pointer">Debug</h3></summary>
              <enter-fade>
                <h3>Stored Data</h3>
                <gvt-button filled @click=${async () => {
                  await Promise.all([
                    caches.delete('mini22-10'),
                    caches.delete('mini22-api')
                  ])
                }}>Clear Cache</gvt-button>
                <gvt-button @click=${() => localStorage.clear()}>Clear LocalStorage</gvt-button>
              </enter-fade>
            </details>
          </main>
        </tab-view>
        <tab-container slot="header" id="settings-dialogue-tabs" .tabs=${['Account', 'App']} .selected=${0}></tab-container>
        <div slot="footer">
          <gvt-button filled @click=${() => history.back()}>Close</gvt-button>
        </div>
      </app-dialogue>
      <div class="fab" @click=${() => {
        history.pushState({ page: 'upcoming', state: 'add' }, 'Upcoming: Add', '/upcoming/add');
        this.uploadFile = undefined;
        this.uploadIsHomework = 0;
        this.dialogueOpen = true;
        this.uploadFileUri = false;
      }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/></svg>
        <mwc-ripple accent></mwc-ripple>
      </div>
    `;
  }
}

customElements.define('classes-page', ClassesPage);
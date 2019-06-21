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
      'Upcoming',
      'Homework',
      'Events'
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
  render () {
    const classes = blocks.map(block => {
      return this.user ? this.user.classes[block] : 'loading...';
    });
    const homework = this.user.homework.flat().map(val => {
      let work = val;
      work.colour = '#2196f3';
      return work;
    });
    const events = this.user.events.flat().map(val => {
      let event = val;
      event.colour = '#ff9800';
      return event;
    });
    const mini = this.mini.map(val => {
      let event = val;
      event.colour = '#f44336';
      return event;
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
    let calendar = [birthdaysFiltered, mini, homework, events].flat(2);
    return html`
      <style>
        ${this.pageStyles}
        #file-upload-preview {
          display: block;
          max-height: 128px;
        }
        .homework-image {
          max-width: 100%;
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
          position: fixed;
          z-index: 4;
          top: 0;
          right: 0;
          height: 3.5rem;
          box-sizing: border-box;
          padding: 1rem;
          cursor: pointer;
        }
      </style>
      <page-header title="Upcoming" .tabs=${this.tabs}></page-header>
      <img @click=${() => {
        history.pushState({ page: 'upcoming', state: 'options' }, 'Upcoming: Options', '/upcoming/options');
        this.optionsOpen = true;
      }} class="settings-icon" src='data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path fill="white" d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/></svg>' />
      <tab-view for="Upcoming-tabs">
        <main class="tab scrollable">
          <pwm-upcoming .events=${calendar}></pwm-upcoming>
        </main>
        <main class="tab scrollable">
          ${this.user.homework.map((theClass, index) => {
            if (theClass.length > 0) {
              return html`
                <enter-fade>
                  <h2 class="class-card-title">${this.user.classes[blocks[index]]}</h2>
                  ${theClass.map(work => {
                    const parts = work.date.split('-');
                    const date = new Date(parts[0], parts[1]-1, parts[2]);
                    return html`
                      ${work.image ? html`<img class="homework-image" src=${work.image} />` : ''}
                      <p>${work.title} for ${this.getWeekDay(date.getUTCDay())}, ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</p>
                    `;
                  })}
                </enter-fade>
              `;
            }
          })}
        </main>
        <main class="tab scrollable">
        ${this.user.events.map((theClass, index) => {
            if (theClass.length > 0) {
              return html`
                <enter-fade>
                  <h2 class="class-card-title">${this.user.classes[blocks[index]]}</h2>
                  ${theClass.map(event => {
                    const parts = event.date.split('-');
                    const date = new Date(parts[0], parts[1]-1, parts[2]);
                    return html`<p>${event.title} on ${this.getWeekDay(date.getUTCDay())}, ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</p>`;
                  })}
                </enter-fade>
              `;
            }
          })}
        </main>
      </tab-view>
      <app-dialogue ?open=${this.dialogueOpen} .closeDialogue=${() => history.back()}>
        ${this.dialogueLoading ? html`<p style="text-align: center" slot="body">posting...</p>` : html`<tab-view slot="body" for="add-dialogue-tabs">
          <main>
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
            <gvt-button filled @click=${() => {
              let fileSelector = document.createElement('input');
              fileSelector.type = 'file';
              fileSelector.accept = 'image/*';
              fileSelector.addEventListener('change', event => {
                this.imageLoadComplete = false;
                this.uploadFile = event.target.files[0];
                const reader = new FileReader();
                reader.addEventListener('load', event => {
                  this.uploadFileUri = event.target.result;
                  const image = document.createElement('img');
                  image.src = this.uploadFileUri;
                  image.addEventListener('load', () => {
                    this.uploadFileRatio = image.width / image.height;
                    let canvas = document.createElement('canvas');
                    let ctx = canvas.getContext('2d');
                    canvas.width = image.width < 512 ? image.width : 512;
                    canvas.height = canvas.width / this.uploadFileRatio;
                    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
                    this.imageUri = canvas.toDataURL('image/png');
                    this.imageLoadComplete = true;
                  });
                });
                reader.readAsDataURL(this.uploadFile);
              });
              document.body.appendChild(fileSelector);
              fileSelector.click();
              document.body.removeChild(fileSelector);
            }}>Upload Image</gvt-button><span>${this.uploadFile ? this.uploadFile.name : 'None'}</span>
            ${this.uploadFileUri ? html`<img id="file-upload-preview" src=${this.uploadFileUri} />` : ''}
            ${this.uploadFile ? html`
              <gvt-button @click=${() => {
                this.uploadFile = undefined;
                this.uploadFileUri = undefined;
              }}>Remove Image</gvt-button>
            ` : ''}
          </main>
          <main>
            <h2>Add Event</h2>
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
          </main>
        </tab-view>
        <tab-container slot="header" id="add-dialogue-tabs" .selected=${0} .tabs=${['Homework', 'Event']} @tab-change=${event => {
          this.uploadIsHomework = event.detail.tab;
        }}></tab-container>
        <div slot="footer"><gvt-button filled ?disabled=${!this.imageLoadComplete} @click=${async () => {
          let uploadType = this.uploadIsHomework === 0 ? 'homework' : 'events';
          this.dialogueLoading = true; // Show the loading animation
          if (this.uploadTitle === undefined) { // If there's no title, abort process
            this.dialogueLoading = false;
            this.uploadError = 'Please Choose a Title.';
          }
          let date = new Date(this.uploadDate); // Get the date
          if (!this.supportsDate) { // Get date for browsers (safari) that don't support type=date
            date = new Date('2019-'+this.safariUploadMonth+'-'+this.safariUploadDay);
          }
          if (this.uploadClass === undefined) this.uploadClass = this.user.classes['1.1']; // If there's no uploadClass, use 1.1
          let uploadBlock = Object.keys(this.user.classes)[Object.values(this.user.classes).indexOf(this.uploadClass)]; // Find the block
          let block = firebase.firestore().collection('classes').doc(uploadBlock); // Get Document to be uploaded to
          let blockData = await block.get(); // get block data
          if (blockData.exists) { // If the class exists
            let theClass = blockData.data()[this.uploadClass];
            let newUpload = {
              title: this.uploadTitle,
              date: `${date.getFullYear()}-${date.getUTCMonth()+1}-${date.getUTCDate()}` // Convert date to proper format
            };
            if (this.uploadFile && uploadType === 'homework') {
              newUpload.image = this.imageUri;
            }
            theClass[uploadType].push(newUpload);
            let updateData = {};
            updateData[this.uploadClass] = theClass;
            console.log(updateData);
            await block.update(updateData);
            document.dispatchEvent(new CustomEvent('reload-data'));
            this.user = {
              classes:{},
              homework:[],
              events:[]
            };
            this.dialogueLoading = false;
            history.back();
          } else {
            this.uploadError = 'The class doesn\'t exist...?';
            this.dialogueLoading = false;
          }
        }}>Post</gvt-button><gvt-button @click=${() => {
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
          <main>
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
          <main>
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
                <h2>Version 10.3.2</h2>
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
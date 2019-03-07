/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { html, customElement } from 'lit-element';
import { Page } from '../page';
import { blocks } from '../shared';
import { Calendar } from '../calendar/calendar';
import { Dialogue } from '../dialogue/dialogue';
import { GravitonDropdown } from 'graviton/components/dropdown';
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
      uploadIsHomework: { type: Number }
    }
  }
  constructor () {
    super();
    this.dialogueOpen = location.pathname.split('/')[2] === 'add';
    if (this.mini == undefined) {
      this.mini = [];
    }
    window.addEventListener('popstate', event => {
      this.dialogueOpen = location.pathname.split('/')[2] === 'add';
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
      'Calendar',
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
    const birthdays = birthdaysJson.map(val => {
      return {
        ...val,
        date: `${new Date().getFullYear()}-${val.date}`,
        colour: '#4caf50'
      }
    });
    let calendar = [birthdays, mini, homework, events].flat(2);
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
      </style>
      <page-header title="Classes" .tabs=${this.tabs}></page-header>
      <tab-view for="Classes-tabs">
        <main class="tab">
          <grid-calendar .events=${calendar}></grid-calendar>
        </main>
        <main class="tab scrollable">
          ${this.user.homework.map((theClass, index) => {
            if (theClass.length > 0) {
              return html`
                <div class="class-card">
                  <h2 class="class-card-title">${this.user.classes[blocks[index]]}</h2>
                  ${theClass.map(work => {
                    const parts = work.date.split('-');
                    const date = new Date(parts[0], parts[1]-1, parts[2]);
                    return html`
                      ${work.image ? html`<img class="homework-image" src=${work.image} />` : ''}
                      <p>${work.title} for ${this.getWeekDay(date.getUTCDay())}, ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</p>
                    `;
                  })}
                </div>
              `;
            }
          })}
        </main>
        <main class="tab scrollable">
        ${this.user.events.map((theClass, index) => {
            if (theClass.length > 0) {
              return html`
                <div class="class-card">
                  <h2 class="class-card-title">${this.user.classes[blocks[index]]}</h2>
                  ${theClass.map(event => {
                    const parts = event.date.split('-');
                    const date = new Date(parts[0], parts[1]-1, parts[2]);
                    return html`<p>${event.title} on ${this.getWeekDay(date.getUTCDay())}, ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</p>`;
                  })}
                </div>
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
      <div class="fab" @click=${() => {
        history.pushState({ page: 'classes', state: 'add' }, 'Classes: Add', '/classes/add');
        this.uploadFile = undefined;
        this.uploadIsHomework = 0;
        this.dialogueOpen = true;
        this.uploadFileUri = false;
      }}>
        <i class="material-icons">add</i>
        <mwc-ripple accent></mwc-ripple>
      </div>
    `;
  }
}

customElements.define('classes-page', ClassesPage);
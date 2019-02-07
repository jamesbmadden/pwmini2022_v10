import { html, customElement } from 'lit-element';
import { Page } from '../page';
import { blocks } from '../shared';
import { Calendar } from '../calendar';
import { Dialogue } from '../dialogue';
import { GravitonDropdown } from '../graviton';

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
      uploadTitle: { type: String }
    }
  }
  constructor () {
    super();
    if (this.mini == undefined) {
      this.mini = [];
    }
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
  get styles () {
    return `
      ${this.pageStyles}
    `;
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
    })
    const events = this.user.events.flat().map(val => {
      let event = val;
      event.colour = '#ff9800';
      return event;
    })
    const mini = this.mini.map(val => {
      let event = val;
      event.colour = '#f44336';
      return event;
    })
    let calendar = [homework, events, mini].flat(2);
    return html`
      <style>
        ${this.styles}
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
      ${this.dialogueOpen ? html`<app-dialogue ?open=${this.dialogueOpen}>
        <tab-view slot="body" for="add-dialogue-tabs">
          <main>
            <h2>Add Homework</h2>
            <graviton-dropdown .options=${blocks.map(block => this.user.classes[block])} @change=${e => {
              this.uploadClass = e.target.value;
            }}>Class</graviton-dropdown>
            <graviton-input @change=${e => {
              this.uploadTitle = e.target.value;
            }}>Title</graviton-input>
            ${this.supportsDate ? html` <!-- Input Type="date" supported -->
              <graviton-input type="date" @change=${e => {
                this.uploadDate = e.target.value;
              }}>Date</graviton-input>
            ` : html` <!-- Input Type="date" not supported. Replace with three number inputs. -->
              <div class="replace-date">
                <graviton-input type="number" value="2019">Year</graviton-input>
                <graviton-input type="number">Month</graviton-input>
                <graviton-input type="number">Day</graviton-input>
              </div>
            `}
            <graviton-button filled @click=${() => {
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
            }}>Upload Image</graviton-button><span>${this.uploadFile ? this.uploadFile.name : 'None'}</span>
            ${this.uploadFileUri ? html`<img id="file-upload-preview" src=${this.uploadFileUri} />` : ''}
            ${this.uploadFile ? html`
              <graviton-button @click=${() => {
                this.uploadFile = undefined;
                this.uploadFileUri = undefined;
              }}>Remove Image</graviton-button>
            ` : ''}
          </main>
          <main>
            <h2>Add Event</h2>
            <graviton-dropdown .options=${blocks.map(block => this.user.classes[block])}>Class</graviton-dropdown>
            <graviton-input>Title</graviton-input>
            ${this.supportsDate ? html` <!-- Input Type="date" supported -->
              <graviton-input type="date">Date</graviton-input>
            ` : html` <!-- Input Type="date" not supported. Replace with three number inputs. -->
              <div class="replace-date">
                <graviton-input type="number" value="2019">Year</graviton-input>
                <graviton-input type="number">Month</graviton-input>
                <graviton-input type="number">Day</graviton-input>
              </div>
            `}
          </main>
        </tab-view>
        <tab-container slot="header" id="add-dialogue-tabs" .selected=${0} .tabs=${['Homework', 'Event']}></tab-container>
        <div slot="footer"><graviton-button filled ?disabled=${!this.imageLoadComplete}>Post</graviton-button><graviton-button @click=${() => {
          this.dialogueOpen = false;
        }}>Close</graviton-button></div>
      </app-dialogue>` : ''}
      <div class="fab" @click=${() => {
        this.uploadFile = undefined;
        this.dialogueOpen = true;
      }}>
        <i class="material-icons">add</i>
        <mwc-ripple accent></mwc-ripple>
      </div>
    `;
  }
}

customElements.define('classes-page', ClassesPage);
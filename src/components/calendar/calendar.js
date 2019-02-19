/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html, css, customElement } from 'lit-element';

export class Calendar extends LitElement {
  static get properties () {
    return {
      events: { type: Array }
    }
  }
  static get styles () {
    return [
      css`
      .calendar-root {
        margin-top:1px;
        position: relative;
        display: grid;
        grid-template: repeat(6, minmax(0, 1fr)) / repeat(7, minmax(0, 1fr));
        width: 100%;
        height: calc(100vh - 10.5rem);
        grid-gap:1px;
        cursor: default;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
      }
      .calendar-day {
        position: relative;
        width:100%;
        height:100%;
        box-shadow:0 0 0 1px #222;
        background-color: #fff;
      }
      .calendar-day--before-after {
        background-color: #ffebee;
      }
      .calendar-day--weekend {
        filter: brightness(0.9);
      }
      .calendar-day--weekend * {
        filter: brightness(1.1);
      }
      .calendar-day-event {
        box-sizing: border-box;
        margin: 1px;
        padding: 2px;
        border-radius: 2px;
        font-size: 0.75rem;
        background: #2196f3;
        color: #fff;
        max-width:100%;
        overflow:hidden;
        white-space: nowrap;
      }
      .calendar-day-number {
        display: block;
        font-size: 0.75rem;
        position: relative;
        text-align: center;
        width: 1rem;
        height: 1rem;
        border-radius: 50%;
      }
      .calendar-day-number--today {
        color: white;
        background: #f44336;
      }`
    ];
  }
  getMonthLength(month) {
    const now = new Date();
    switch (month) {
      case 0: return 31;
      case 1: return now.getUTCFullYear() % 4 == 0 ? 29 : 28;
      case 2: return 31;
      case 3: return 30;
      case 4: return 31;
      case 5: return 30;
      case 6: return 31;
      case 7: return 31;
      case 8: return 30;
      case 9: return 31;
      case 10: return 30;
      case 11: return 31;
    }
  }
  render () {
    const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,];
    const now = new Date();
    const first = new Date(now.getUTCFullYear(), now.getUTCMonth(), 1);
    const today = now.getDate() + first.getUTCDay()-2;
    return html`
      <div class="calendar-root">
        ${days.map((value, index) => {
          const date = index > this.getMonthLength(now.getUTCMonth()) + first.getUTCDay()-2 ?
            `${now.getUTCFullYear()}-${now.getUTCMonth()+2}-${index - this.getMonthLength(now.getUTCMonth()) - first.getUTCDay()+2}` :
            `${now.getUTCFullYear()}-${now.getUTCMonth()+1}-${index - first.getUTCDay()+2}`;
          const events = this.events.filter(val => {
            return val.date == date;
          });
          return html`<div class="calendar-day ${index < first.getUTCDay()-1 || index > this.getMonthLength(now.getUTCMonth()) + first.getUTCDay()-2 ? // Checking if index is greater or lower than first/last days
              'calendar-day--before-after' : '' /* add a class saying it's out of the month */}
              ${index % 7 == 5 || index % 7 == 6 ? 'calendar-day--weekend' : '' /* The day is a weekend */} day-${now.getUTCFullYear()}-${now.getUTCMonth()+1}-${index - first.getUTCDay()+2}">
            <span class="calendar-day-number ${index == today ? 'calendar-day-number--today' : ''}">${!(index < first.getUTCDay()-1) ? // If the index is less than the day that the month starts on (Monday is 0)
              index > this.getMonthLength(now.getUTCMonth()) + first.getUTCDay()-2 ? // If the index is greater than the month length
                index - this.getMonthLength(now.getUTCMonth()) - first.getUTCDay()+2 // Set the day to the index minus the current month's length plus offset
                : index - first.getUTCDay()+2 
                : this.getMonthLength(now.getUTCMonth() == 0 ? 11 : now.getUTCMonth()-1)}</span>
            ${events.map(event => {
              return html`<p class="calendar-day-event" style="background:${event.colour} ${event.image ? `url(${event.image})` : ''}">${event.title}</p>`
            })}
          </div>`;
        })}
      </div>
    `;
  }
}

customElements.define('grid-calendar', Calendar);
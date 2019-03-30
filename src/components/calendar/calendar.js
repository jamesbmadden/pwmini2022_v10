/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html, css, customElement } from 'lit-element';
import calendarStyles from './calendar.less';

export class Calendar extends LitElement {
  static get properties () {
    return {
      events: { type: Array }
    }
  }
  getMonthLength(month) {
    const now = new Date();
    switch (month) {
      case 0: return 31;
      case 1: return now.getFullYear() % 4 == 0 ? 29 : 28;
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
    const first = new Date(now.getFullYear(), now.getMonth(), 1);
    const today = now.getDate() + first.getDay()-2;
    let eventCount = 0;
    return html`
      <style>${calendarStyles.toString()}</style>
      <div class="calendar-root">
        ${days.map((value, index) => {
          const date = index > this.getMonthLength(now.getMonth()) + first.getDay()-2 ?
            `${now.getFullYear()}-${now.getMonth()+2}-${index - this.getMonthLength(now.getMonth()) - first.getDay()+2}` :
            `${now.getFullYear()}-${now.getMonth()+1}-${index - first.getDay()+2}`;
          const events = this.events.filter(val => {
            return val.date == date;
          });
          return html`<div class="calendar-day calendar-day--${index} ${index < first.getDay()-1 || index > this.getMonthLength(now.getMonth()) + first.getDay()-2 ? // Checking if index is greater or lower than first/last days
              'calendar-day--before-after' : '' /* add a class saying it's out of the month */}
              ${index % 7 == 5 || index % 7 == 6 ? 'calendar-day--weekend' : '' /* The day is a weekend */} day-${now.getFullYear()}-${now.getMonth()+1}-${index - first.getDay()+2}">
            <span class="calendar-day-number ${index == today ? 'calendar-day-number--today' : ''}">${!(index < first.getDay()-1) ? // If the index is less than the day that the month starts on (Monday is 0)
              index > this.getMonthLength(now.getMonth()) + first.getDay()-2 ? // If the index is greater than the month length
                index - this.getMonthLength(now.getMonth()) - first.getDay()+2 // Set the day to the index minus the current month's length plus offset
                : index - first.getDay()+2 
                : this.getMonthLength(now.getMonth() == 0 ? 11 : now.getMonth()-1)}</span>
            ${events.map(event => {
              eventCount++;
              return html`<p class="calendar-day-event calendar-day-event--${eventCount-1}" style="background:${event.colour} ${event.image ? `url(${event.image})` : ''}">${event.title}</p>`
            })}
          </div>`;
        })}
      </div>
    `;
  }
}

customElements.define('grid-calendar', Calendar);
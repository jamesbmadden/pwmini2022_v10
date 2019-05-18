import { LitElement, html, css } from 'lit-element';
import styles from './upcoming.less';

export default class Upcoming extends LitElement {

  static get properties () {
    return {
      events: { type: Array }
    }
  }

  static get styles () {
    return css([styles.toString()]);
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
    let calendar = {};
    this.events.forEach(event => {
      calendar[event.date] = calendar[event.date] || [];
      calendar[event.date].push(event);
    });
    let days = Object.keys(calendar).sort((currentString, previousString) => {
      const currentParts = currentString.split('-');
      const current = new Date(currentParts[0], currentParts[1]-1, currentParts[2]);
      const previousParts = previousString.split('-');
      const previous = new Date(previousParts[0], previousParts[1]-1, previousParts[2]);
      return current - previous;
    });
    return html`
      ${days.map(dateString => {
        const parts = dateString.split('-');
        const date = new Date(parts[0], parts[1]-1, parts[2]);
        return html`
          <h2 class="day-title">${this.getWeekDay(date.getUTCDay())}, ${this.getMonthName(date.getUTCMonth())} ${date.getUTCDate()}</h2>
          ${calendar[dateString].map(event => html`
            ${event.image ? html`<div class="gvt-card"><img class="homework-image" src="${event.image}" /></div>` : ''}
            <div class="gvt-card">
              <p>${event.title}</p>
            </div>
          `)}
        `;
      })}
    `;
  }

}

customElements.define('pwm-upcoming', Upcoming);
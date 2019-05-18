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

  render () {
    return html`<p>Upcoming Page</p>`;
  }

}

customElements.define('pwm-upcoming', Upcoming);
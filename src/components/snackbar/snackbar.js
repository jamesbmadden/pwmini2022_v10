import { LitElement, html, css } from 'lit-element';

export default class Snackbar extends LitElement {

  static get properties () {
    return {
      error: { type: String }
    }
  }

  static get styles () {
    return css`
      .snackbar {
        position: fixed;
        left: 1rem;
        top: 8rem;
        width: calc(100% - 2rem);
        background: #ffcdd2;
        color: #d32f2f;
        border: #d32f2f solid 2px;
        z-index: 1;
        box-sizing: border-box;
        padding: 1rem;
        border-radius: 2rem;
        box-shadow: 0px 6px 12px rgba(211, 47, 47, 0.5);
      }
      @media (min-width: 768px) {
        .snackbar {
          left: calc(256px + 1rem);
          top: 1rem;
          width: calc(calc(100% - 256px) - 2rem);
        }
      }
    `;
  }

  render () {
    return html`
      <div class="snackbar">
        ${this.error}
      </div>
    `;
  }

}
customElements.define('pwm-snackbar', Snackbar);
import { LitElement, html, css } from 'lit-element';

export default class Snackbar extends LitElement {

  static get properties () {
    return {
      title: { type: String },
      type: { type: String }
    }
  }

  connectedCallback () {
    super.connectedCallback();
    setTimeout(() => {
      this.shadowRoot.querySelector('.snackbar').style.transform = 'translateY(-200%)';
      setTimeout(() => {
        this.parentElement.removeChild(this);
      }, 400);
    }, 5000);
  }

  static get styles () {
    return css`
      @keyframes snackbar-enter {
        0% {
          transform: translateY(-200%);
        }
        100% {
          transform: translateY(0%);
        }
      }
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
        animation: snackbar-enter 0.4s;
        transition: transform 0.4s;
      }
      .snackbar.error {
        background: #ffcdd2;
        color: #d32f2f;
        border: #d32f2f solid 2px;
      }
      .snackbar.success {
        background: #dcedc8;
        color: #689f38;
        border: #689f38 solid 2px;
        box-shadow: 0px 6px 12px rgba(104, 159, 56, 0.5);
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
      <div class="snackbar ${this.type}">
        ${this.title}
      </div>
    `;
  }

}
customElements.define('pwm-snackbar', Snackbar);
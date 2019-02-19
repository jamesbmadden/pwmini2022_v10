import { LitElement, html } from 'lit-element';

export class GravitonButton extends LitElement {
  static get properties() {
    return {
      filled: { type: Boolean }
    }
  }
  render() {
    return html`
      <style>
        .btn {
          box-sizing:border-box;
          display:inline-block;
          background-color:#fafafa;
          min-width:4rem;
          height:2.25rem;
          padding:0rem 1rem;
          border:0px;
          color:#222;
          border-radius:1.125rem;
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          cursor:pointer;
          overflow:hidden;
          font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
          outline: none;
          -webkit-touch-callout: none; /* iOS Safari */
          -webkit-user-select: none; /* Safari */
          -moz-user-select: none; /* Firefox */
          -ms-user-select: none; /* Internet Explorer/Edge */
          user-select: none;
        }
        .btn.fill {
          color: white;
          background:${grad};
          box-shadow: 0px 3px 6px rgba(244, 67, 54, 0.16);
        }
        .btn-wrapping {
          display:inline-block;
          margin:0.25rem 0rem;
        }
      </style>
      <div class="btn-wrapping">
        <button class="btn ${this.filled ? 'fill' : 'light'}">
          <slot></slot>
          <mwc-ripple ?accent=${this.filled}></mwc-ripple>
        </button>
      </div>
    `;
  }
}

customElements.define('graviton-button', GravitonButton);
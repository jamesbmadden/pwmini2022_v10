import { LitElement, html, css } from 'lit-element';

class Dialogue extends LitElement {

  static get properties () {
    return {
      open: { type: Boolean }
    }
  }

  static get styles () {
    return [
      css`
      .dialogue {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 100%;
        max-width: 420px;
        background: #fff;
        z-index: 6;
        overflow: hidden;
      }
      .dialogue-background {
        position: fixed;
        top: 0px;
        left: 0px;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.5);
        z-index: 5;
      }
      .dialogue-header {
        overflow: hidden;
      }
    `]
  }

  render () {
    return html`
      <div class="dialogue-background" ?hidden=${!this.open}></div>
      <div class="dialogue" ?hidden=${!this.open}>
        <header class="dialogue-header">
          <slot name="header"></slot>
        </header>
        <slot name="body"></slot>
        <footer class="dialogue-footer">
          <slot name="footer"></slot>
        </footer>
      </div>
    `;
  }

}

customElements.define('app-dialogue', Dialogue);
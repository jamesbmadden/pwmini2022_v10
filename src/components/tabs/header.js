import { LitElement, html } from 'lit-element';

export class HeaderComponent extends LitElement {
  static get properties () {
    return {
      title: { type: String },
      tabs: { type: Array },
      filled: { type: Boolean }
    }
  }
  constructor () {
    super();
    this.filled = true;
  }
  render () {
    return html`
      <style>
        header {
          position:fixed;
          top:0px;
          left:0px;
          width:100vw;
          height:${this.tabs.length > 0 ? 7 : 3.5}rem;
          transition:box-shadow 0.4s cubic-bezier(0.4,0,0,1);
          box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          color:#222;
          overflow:hidden;
          z-index:4;
          background-color:white;
          overflow:hidden;
          display:flex;
          align-items:center;
          flex-direction:column;
          -webkit-touch-callout: none;
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
        }
        header[filled] {
          color: white;
          background: ${grad};
        }
        .title {
          text-align:center;
          font-size:20pt;
          height:3.5rem;
          margin:0px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        tab-container {
          width:100%;
        }
      </style>
      <header ?filled=${this.filled}>
        <p class="title">${this.title}</p>
        <tab-container id="${`${this.title}-tabs`}" .tabs=${this.tabs} ?light=${this.filled}></tab-container>
      </header>
    `;
  }
}
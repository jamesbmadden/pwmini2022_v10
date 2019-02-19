import { LitElement, html } from 'lit-element';

class GravitonDropdown extends LitElement {
  static get properties () {
    return {
      options: { type: Array },
      value: { type: String }
    }
  }
  connectedCallback () {
    super.connectedCallback();
    this.value = this.options[0];
  }
  render () {
    return html`
      <style>
        select {
          height: 3.5rem;
          width: 100%;
          font-size: 16pt;
          padding-left: 8px;
          background:#fff;
          border:1px solid #bdbdbd;
          border-radius: 4px;
          cursor: pointer;
          background-color: transparent;
          -webkit-appearance: none;
        }
        .select-container {
          position:relative;
          margin-top:12px;
        }
        .select-label {
          z-index:1;
          position:absolute;
          top:16px;
          left:2px;
          color:#222;
          background:#fff;
          transition:transform 0.2s cubic-bezier(1,0,0,1), font-size 0.2s cubic-bezier(1,0,0,1), color 0.2s cubic-bezier(1,0,0,1);
          transform:translate(4px,-24px);
          font-size:12px;
          pointer-events:none;
        }
        select:focus {
          outline: none;
          border: 1px solid ${red};
        }
        select:focus ~ .select-label {
          color: ${red};
        }
        .material-icons {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          display: inline-block;
          line-height: 1;
          text-transform: none;
          letter-spacing: normal;
          word-wrap: normal;
          white-space: nowrap;
          direction: ltr;
          -webkit-font-smoothing: antialiased;
          text-rendering: optimizeLegibility;
          -moz-osx-font-smoothing: grayscale;
          font-feature-settings: 'liga';
        }
        .drop-icon {
          position: absolute;
          font-size: 1.5rem;
          right: 0.25rem;
          top: 1rem;
          pointer-events: none;
        }
      </style>
      <div class="select-container">
        <select id="select" @input=${event => {
          this.value = event.target.value;
          this.dispatchEvent(new Event('input'));
        }} @change=${(e)=>this.dispatchEvent(new Event('change'))}>
          ${this.options.map(option => {
            return html`<option>${option}</option>`;
          })}
        </select>
        <label class="select-label" for="select"><slot></slot></label>
        <i class="material-icons drop-icon">arrow_drop_down</i>
      </div>
    `;
  }
}

customElements.define('gvt-dropdown', GravitonDropdown);
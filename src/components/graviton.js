/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { LitElement, html } from 'lit-element';
import { red, grad } from './shared';

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

class GravitonPanel extends LitElement {

  static get properties () {
    return {
      expanded: { type: Boolean },
      value: { type: String }
    }
  }

  constructor () {
    super();
    this.expanded = false;
  }

  render () {
    return html`
      <style>
        .panel-title {
          position: relative;
          height: 3rem;
          display: flex;
          align-items: center;
          flex-direction: row;
          cursor: pointer;
        }
        .panel:not([expanded]) > .panel-title:hover {
          background: #e3e3e3;
        }
        .panel-body {
          position: relative;
          height: 0;
          overflow: hidden;
        }
        .panel {
          box-sizing: border-box;
          width: calc(100% - 32px);
          margin: 0px auto;
          box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.12), 0 1px 5px 0 rgba(0, 0, 0, 0.2);
          transition: margin 0.2s cubic-bezier(0.4, 0, 0.2, 1), width 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          -webkit-user-select: none;
          -moz-user-select: none;
          -ms-user-select: none;
          user-select: none;
          z-index: 1;
        }
        .panel[expanded] {
          margin: 1rem auto;
          width: 100%;
        }
        .panel[expanded] > .panel-body {
          height: auto;
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
          pointer-events: none;
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .panel[expanded] .drop-icon {
          transform: rotate(200grad);
        }
        .panel-title-value {
          margin-left: 1rem;
          color: #444;
        }
      </style>
      <div class="panel" ?expanded=${this.expanded}>
        <div class="panel-title" @click=${() => {
          this.expanded = !this.expanded;
        }}>
          <slot name="title"></slot><p class="panel-title-value">${this.value !== 'undefined' ? this.value : ''}</p>
          <i class="material-icons drop-icon">arrow_drop_down</i>
        </div>
        <div class="panel-body">
          <slot name="body"></slot>
        </div>
      </div>
    `;
  }

}

customElements.define('graviton-dropdown', GravitonDropdown);
customElements.define('graviton-panel', GravitonPanel);
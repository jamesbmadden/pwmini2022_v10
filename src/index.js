/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import '@babel/polyfill';
import { LitElement, html, customElement, property } from 'lit-element';
import '@graviton/button';
import '@graviton/input';

import '@material/mwc-ripple';

import('./components/pages/classes');
import('./components/pages/select-classes');
import('./components/pages/error');

class AppState extends LitElement {
  static get properties () {
    return {
      state: { type: String },
      user: { type: Object },
      userData: { type: Object },
      loading: { type: Boolean },
      signedIn: { type: Boolean },
      mini: { type: Array },
      classes: { type: Object }
    }
  }
  createErrorBar (error) {
    let snackbar = document.createElement('pwm-snackbar');
    snackbar.title = error;
    snackbar.type = 'error';
    this.shadowRoot.appendChild(snackbar);
  }
  createSuccessBar (message) {
    let snackbar = document.createElement('pwm-snackbar');
    snackbar.title = message;
    snackbar.type = 'success';
    this.shadowRoot.appendChild(snackbar);
  }
constructor () {
    super();
    this.loading = true;
    this.state = location.pathname.split('/')[1];
    this.mini = [];
    this.userData = {
      classes:{},
      homework:[],
      events:[]
    };
    if (!localStorage.getItem('config')) {
      localStorage.clear();
      const defaultConfig = {
        images: true
      };
      localStorage.setItem('config', JSON.stringify(defaultConfig));
    }

    if (localStorage.getItem('jwt-token')) {
      this.signedIn = true;
      this.user = JSON.parse(localStorage.getItem('firebase-account'));
      (async () => {
        let response = await fetch(`https://powmini2022.firebaseapp.com/api/user/${this.user.email}?images=${JSON.parse(localStorage.getItem('config')).images}`);
        this.userData = await response.json();
        if (this.userData.classes === undefined) {
          this.state = 'select-classes';
        }
      })();
    } else {
      this.signedIn = false;
    }

    document.addEventListener('auth-valid', async event => {
      this.loading = false;
      this.user = event.detail.account;
      this.signedIn = true;
      let response = await fetch(`https://powmini2022.firebaseapp.com/api/user/${event.detail.account.email}?images=${JSON.parse(localStorage.getItem('config')).images}`);
      this.userData = await response.json();
      if (this.userData.classes === undefined) {
        this.state = 'select-classes';
      }
    });
    document.addEventListener('set-page', (e)=>{
      this.state = e.detail.page;
      history.pushState({ page: this.state }, this.state, `/${this.state}`);
    });
    document.addEventListener('reload-data', async () => {
      let response = await fetch(`https://powmini2022.firebaseapp.com/api/user/${this.user.email}?images=${JSON.parse(localStorage.getItem('config')).images}`);
      this.userData = await response.json();
    })
    document.addEventListener('show-snackbar', event => {
      if (event.detail.type === 'error') {
        this.createErrorBar(event.detail.title);
      } else {
        this.createSuccessBar(event.detail.title);
      }
    })
    window.addEventListener('popstate', event => {
      this.state = location.pathname.split('/')[1];
    });
    fetch('https://powmini2022.firebaseapp.com/api/mini').then(resp => resp.json()).then(json => { // Get Mini Events
      this.mini = json;
    });
    fetch('https://powmini2022.firebaseapp.com/api/classes').then(resp => resp.json()).then(json  => {
      this.classes = json;
    });
  }
  signOut () {
    firebase.auth().signOut();
  }
  postWork (isHomework, theclass, title, date, image) {
    console.log(isHomework, theclass, title, date, image);
  }
  getPage (page) {
    switch (page) {
      case '': 
      case 'upcoming': return html`<classes-page .mini=${this.mini} .user=${this.userData} .postWork=${this.postWork} .userData=${this.user} .signOut=${this.signOut}>loading page...</classes-page>`;
      case 'select-classes': return html`<select-classes-page .userData=${this.userData} .classes=${this.classes}></select-classes-page>`;
      default: return html`<error-page error=404></error-page>`; 
    }
  }
  render () {
    if (this.signedIn) {
      return html`
        ${this.getPage(this.state)}
      `;
    } else {
      return html`<sign-in>loading...</sign-in>`;
    }
  }
}

class SigninPage extends LitElement {
  static get properties() {
    return {
      state: { type: String },
      username: { type: String },
      password: { type: String },
      retypePassword: { type: String },
      loading: { type: Boolean },
      errorMsg: { type: String }
    }
  }
  constructor() {
    super();
    this.errorMsg = '';
    this.state = 'Sign In';
    this.loading = false;
    if (this.username === undefined) {
      this.username = '';
    }
    if (this.password === undefined) {
      this.password = '';
    }
    if (this.retypePassword === undefined) {
      this.retypePassword = '';
    }
  }
  async submit() {
    if (this.state == 'Sign In') {
      this.loading = true;

      const rawResponse = await fetch('/auth', {
        method: 'POST', body: JSON.stringify({
          email: this.username,
          password: this.password
        })
      });

      const response = await rawResponse.json();
      if (!response.success) {
        this.loading = false;
        this.errorMsg = response.error;
        return;
      }

      localStorage.setItem('jwt-token', response.token)
      localStorage.setItem('firebase-account', JSON.stringify(response.account));

      document.dispatchEvent(new CustomEvent('auth-valid', { detail: { token: response.token, account: response.account } }));

      /*firebase.auth().signInWithEmailAndPassword(this.username, this.password).catch(error => {
        this.loading = false;
        this.errorMsg = error.message;
      })*/
    } else {
      this.loading = true;
      if (this.password === this.retypePassword) {
        firebase.auth().createUserWithEmailAndPassword(this.username, this.password).catch(error => {
          this.loading = false;
          this.errorMsg = error.message;
        });
      } else {
        this.loading = false;
        this.errorMsg = 'Passwords are Not the Same.'
      }
    }
  }
  render() {
    return html`
      <style>
        :host {
          position:absolute;
          left:0px;
          width:100%;
          top:0px;
          height:100%;
          display:flex;
          flex-direction:column;
          justify-content:center;
          align-items:center;
          text-align:center;
          background-color: white;
        }
        @media (prefers-color-scheme: dark) {
          :host {
            background-color: #333;
            color: white;
          }
        }
        form {
          position: relative;
          width: 280px;
        }
        .error-msg {
          color:red;
        }
      </style>
      <form @submit=${event => event.preventDefault()}>
        <h1>${this.loading ? this.state == 'Sign In' ? 'Signing In...' : 'Signing Up...' : this.state}</h1>
        ${this.loading ? html`` :
          html`
            ${this.errorMsg != '' ? html`<p class="error-msg">${this.errorMsg}</p>` : ''}
            <gvt-input type="email" id="username" autocomplete="email" name="username" .value=${this.username} @input=${(e)=> {
              this.username = e.target.value;
            }}>Email</gvt-input><br>
            <gvt-input type="password" autocomplete="${(this.state == 'Sign In') ? 'password' : 'new-password'}" id="password" name="password" .value=${this.password} @input=${(e)=> {
              this.password = e.target.value;
            }}>Password</gvt-input><br>
            ${(this.state == 'Sign Up') ? html`
              <gvt-input type="password" autocomplete="new-password" id="verifyPassword" name="verifyPassword" .value=${this.retypePassword} @input=${(e)=> {
              this.retypePassword = e.target.value;
            }}>Retype Password</gvt-input><br>
              ` : ''}
            <div><gvt-button filled @click="${this.submit}">${this.state}</gvt-button><gvt-button @click="${() => {this.state = (this.state == 'Sign In') ? 'Sign Up' : 'Sign In'}}">${(this.state == 'Sign In') ? 'Sign Up' : 'Sign In'}</gvt-button></div><br>
          `
        }
      </form>
    `;
  }
}

customElements.define('app-state', AppState);
customElements.define('sign-in', SigninPage);
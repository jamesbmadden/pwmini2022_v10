/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import { LitElement, html, customElement, property } from 'lit-element';
import '@graviton/button';
import '@graviton/input';
import { fb } from './keys';

import '@material/mwc-ripple';

window.firebase = {};

import('firebase/app').then(module => {
  firebase = module;
  firebase.initializeApp(fb);
  document.dispatchEvent(new CustomEvent('firebase-loaded'));
  import('firebase/auth').then(module => {
    document.dispatchEvent(new CustomEvent('firebase-auth-loaded'));
  });
  import('firebase/firestore').then(module => {
    document.dispatchEvent(new CustomEvent('firebase-firestore-loaded'));
  })
});

import('./components/pages/classes');
import('./components/pages/me');
import('./components/pages/mini');
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
    document.addEventListener('firebase-auth-loaded', () => {
      firebase.auth().onAuthStateChanged(async (user) => {
        this.loading = false;
        if (user) {
          this.user = user;
          this.signedIn = true;
          let response = await fetch(`https://powmini2022.firebaseapp.com/api/user/${user.email}?images=${JSON.parse(localStorage.getItem('config')).images}`);
          this.userData = await response.json();
          if (this.userData.classes === undefined) {
            this.state = 'select-classes';
          }
        } else {
          this.signedIn = false;
        }
      });
    });
    document.addEventListener('set-page', (e)=>{
      this.state = e.detail.page;
      history.pushState({ page: this.state }, this.state, `/${this.state}`);
    });
    document.addEventListener('reload-data', async () => {
      let response = await fetch(`https://powmini2022.firebaseapp.com/api/user/${this.user.email}?images=${JSON.parse(localStorage.getItem('config')).images}`);
      this.userData = await response.json();
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
      case 'classes': return html`<classes-page .mini=${this.mini} .user=${this.userData} .postWork=${this.postWork}>loading page...</classes-page>`;
      case 'mini': return html`<mini-page .mini=${this.mini}>loading page...</mini-page>`;
      case 'me': return html`<me-page .user=${this.user} .userData=${this.userData} .signOut=${this.signOut}>loading page...</me-page>`;
      case 'select-classes': return html`<select-classes-page .userData=${this.userData} .classes=${this.classes}></select-classes-page>`;
      default: return html`<error-page error=404></error-page>`; 
    }
  }
  get bottomAppBarTabs () {
    return [
      {
        title:'Mini',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>',
        page:'mini'
      },
      {
        title:'Upcoming',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 4h5v8l-2.5-1.5L6 12V4z"/></svg>',
        page:''
      },
      {
        title:'Me',
        icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>',
        page:'me'
      }
    ];
  }
  get selectedInt () {
    switch (this.state) {
      case 'mini': return 0;
      case '':
      case 'classes': return 1;
      case 'me': return 2;
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
  submit() {
    if (this.state == 'Sign In') {
      this.loading = true;
      firebase.auth().signInWithEmailAndPassword(this.username, this.password).catch(error => {
        this.loading = false;
        this.errorMsg = error.message;
      })
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
      <form>
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
import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter';
import '@material/mwc-ripple';
import { LitElement, html, customElement, property } from 'lit-element';
import { GravitonButton, GravitonInput } from './components/graviton.js';
import { fb } from './keys';

var firebase = {};

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

import(/* webpackChunkName: "classes-page" */ './components/pages/classes');
import(/* webpackChunkName: "me-page" */ './components/pages/me');
import(/* webpackChunkName: "mini-page" */ './components/pages/mini');
import(/* webpackChunkName: "select-classes-page" */ './components/pages/select-classes');
import(/* webpackChunkName: "error-page" */ './components/pages/error');

class AppState extends LitElement {
  static get properties () {
    return {
      state: { type: String },
      user: { type: Object },
      userData: { type: Object },
      loading: { type: Boolean },
      signedIn: { type: Boolean },
      mini: { type: Array }
    }
  }
  constructor () {
    super();
    this.loading = true;
    this.state = location.pathname;
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
      history.pushState({ page: this.state }, this.state, this.state);
    });
    window.addEventListener('popstate', event => {
      this.state = location.pathname;
    });
    fetch('https://us-central1-powmini2022.cloudfunctions.net/miniEvents').then(resp => resp.json()).then(json => { // Get Mini Events
      this.mini = json;
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
      case '/': return html`<classes-page .mini=${this.mini} .user=${this.userData} .postWork=${this.postWork}>loading page...</classes-page>`;
      case '/mini': return html`<mini-page .mini=${this.mini}>loading page...</mini-page>`;
      case '/me': return html`<me-page .user=${this.user} .userData=${this.userData} .signOut=${this.signOut}>loading page...</me-page>`;
      case '/select-classes': return html`<select-classes-page .userData=${this.userData}></select-classes-page>`;
      default: return html`<error-page error=404></error-page>`; 
    }
  }
  get bottomAppBarTabs () {
    return [
      {
        title:'Mini',
        icon:'school',
        page:'/mini'
      },
      {
        title:'Classes',
        icon:'book',
        page:'/'
      },
      {
        title:'Me',
        icon:'person',
        page:'/me'
      }
    ];
  }
  get selectedInt () {
    return ['/mini', '/', '/me'].indexOf(this.state);
  }
  render () {
    if (this.signedIn) {
      return html`
        ${this.getPage(this.state)}
        <bottom-app-bar .tabs=${this.bottomAppBarTabs} .selected=${this.selectedInt}>loading Bottom App Bar...</bottom-app-bar>
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
            <graviton-input type="email" id="username" autocomplete="email" name="username" .value=${this.username} @input=${(e)=> {
              this.username = e.target.value;
            }}>Email</graviton-input><br>
            <graviton-input type="password" autocomplete="${(this.state == 'Sign In') ? 'password' : 'new-password'}" id="password" name="password" .value=${this.password} @input=${(e)=> {
              this.password = e.target.value;
            }}>Password</graviton-input><br>
            ${(this.state == 'Sign Up') ? html`
              <graviton-input type="password" autocomplete="new-password" id="verifyPassword" name="verifyPassword" .value=${this.retypePassword} @input=${(e)=> {
              this.retypePassword = e.target.value;
            }}>Retype Password</graviton-input><br>
              ` : ''}
            <div><graviton-button filled @click="${this.submit}">${this.state}</graviton-button><graviton-button @click="${() => {this.state = (this.state == 'Sign In') ? 'Sign Up' : 'Sign In'}}">${(this.state == 'Sign In') ? 'Sign Up' : 'Sign In'}</graviton-button></div><br>
          `
        }
      </form>
    `;
  }
}

customElements.define('app-state', AppState);
customElements.define('sign-in', SigninPage);
import { LitElement, html, css } from 'lit-element';
import styles from './enter-fade.less';

class FadeEnter extends LitElement {

  connectedCallback () {
    super.connectedCallback();
    if (IntersectionObserver) {
      const observer = new IntersectionObserver(entries => {
        let entry = entries[0];
        if (entry.isIntersecting) {
          this.setAttribute('intersecting', true);
        } else {
          this.removeAttribute('intersecting');
        }
      });
      observer.observe(this);
    } else {
      this.setAttribute('intersecting', true);
    }
  }

  static get styles () {
    return css([styles.toString()]);
  }

  render () {
    return html`
      <slot></slot>
    `;
  }

}

customElements.define('enter-fade', FadeEnter);
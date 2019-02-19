import { LitElement, html } from 'lit-element';

export class TabView extends LitElement {
  static get properties () {
    return {
      for: { type: String },
      selected: { type: Number },
      swipeable: { type: Boolean }
    }
  }
  constructor () {
    super();
    this.touchInfo = {
      start: {},
      previous: {}
    }
  }
  connectedCallback () {
    this.selected = 0;
    document.addEventListener(`tabs-created-${this.for}`, event => {
      this.tabContainerElement = event.detail.element;
      super.connectedCallback();
      this.tabContainerElement.addEventListener('tab-change', event => {
        this.selected = event.detail.tab;
      });
    });
    this.addEventListener('touchstart', event => {
      this.shadowRoot.querySelector('div').style.transition = 'none';
      this.swipeable = true;
      this.tabContainerElement.touchStart();
      this.touchInfo = {
        start: {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        },
        previous: this.touchInfo.start,
      }
    });
    this.addEventListener('touchmove', event => {
      if (this.swipeable) {
        this.tabContainerElement.touchMove(event.touches[0].clientX - this.touchInfo.start.x);
        this.shadowRoot.querySelector('div').style.transform = `translate(${-window.innerWidth*this.selected + event.touches[0].clientX - this.touchInfo.start.x}px)`;
        this.touchInfo.previous = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
        let yDistance = this.touchInfo.start.y - event.touches[0].clientY;
        if (Math.abs(yDistance) > 50) {
          this.dispatchEvent(new Event('touchcancel'));
          this.swipeable = false;
        }
      }
    });
    this.addEventListener('touchend', event => {
      if (this.swipeable) {
        if (this.touchInfo.previous.x - this.touchInfo.start.x < window.innerWidth/3-window.innerWidth/1.5 && this.selected < this.tabContainerElement.tabs.length-1) this.selected++;
        if (this.touchInfo.previous.x - this.touchInfo.start.x > window.innerWidth/3 && this.selected > 0) this.selected--;
        this.tabContainerElement.touchEnd(this.selected);
        this.shadowRoot.querySelector('div').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
        this.shadowRoot.querySelector('div').style.transform = `translate(-${this.selected*100/this.tabContainerElement.tabs.length}%)`;
        setTimeout(() => {
          this.shadowRoot.querySelector('div').style.transition = null;
          this.shadowRoot.querySelector('div').style.transform = null;
        }, 400);
      }
    });
    this.addEventListener('touchcancel', () => {
      this.tabContainerElement.touchCancel(this.selected);
      this.shadowRoot.querySelector('div').style.transition = 'transform 0.4s cubic-bezier(0,0,0,1)';
      this.shadowRoot.querySelector('div').style.transform = `translate(-${this.selected*100/this.tabContainerElement.tabs.length}%)`;
      setTimeout(() => {
        this.shadowRoot.querySelector('div').style.transition = null;
        this.shadowRoot.querySelector('div').style.transform = null;
      }, 400);
    });
  }
  render () {
    return html`
      <style>
        div {
          overflow-x:hidden;
          transition:transform 0.4s cubic-bezier(0.4,0,0,1);
          transform:translate(-${this.selected*100/this.tabContainerElement.tabs.length}%);
          width:${100*this.tabContainerElement.tabs.length}%;
          display:flex;
          flex-direction:row;
        }
      </style>
      <div>
        <slot></slot>
      </div>
    `;
  }
}

customElements.define('tab-view', TabView);
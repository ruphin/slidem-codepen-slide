import { html } from '../@gluon/gluon/gluon.js';
import { SlidemSlideBase } from '../slidem/slidem-slide-base.js';

export class SlidemCodepenSlide extends SlidemSlideBase {
  get template() {
    this.content = html`
      <style>
        :host([fullscreen]) {
          display: flex;
          flex-flow: column;
          justify-content: flex-end;
          background: #3d3d3e;
        }

        :host([fullscreen]) iframe {
          height: 97%;
        }

        :host(:not([fullscreen])) iframe {
          height: 100%;
        }
      </style>

      <iframe
        id='frame'
        scrolling='no'
        frameborder='no'
        allowtransparency='true'
        allowfullscreen='true'
        style='width: 100%; overflow: hidden;' />
    `;

    return super.template;
  }

  connectedCallback() {
    super.connectedCallback();
    const background = this.getAttribute('background');
    if (background) {
      if (background.match(/^--[a-zA-Z-]*$/)) {
        // Workaround for IE11 lacking CSS variables
        if (window.ShadyCSS) {
          this.style.background = window.ShadyCSS.variables[background];
        } else {
          this.style.background = `var(${background})`;
        }
      } else if (background.match(/^(http|\/|\.)/)) {
        let image = `url(${background})`;
        const darken = this.getAttribute('darken-background');
        if (darken) {
          image = `linear-gradient(rgba(0,0,0,${darken}), rgba(0,0,0,${darken})), ${image}`;
        }
        this.style.backgroundImage = image;
      } else {
        this.style.background = background;
      }
    }
    const pen = this.getAttribute('pen');
    const tabs = this.getAttribute('tabs') || 'result';
    this.$.frame.src = `//codepen.io/ruphin/embed/${pen}/?theme-id=33861&default-tab=${tabs}&embed-version=2&editable=true`;
  }
}

customElements.define(SlidemCodepenSlide.is, SlidemCodepenSlide);

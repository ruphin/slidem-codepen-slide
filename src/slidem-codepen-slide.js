import { html } from '../@gluon/gluon/gluon.js';
import { SlidemSlideBase } from '../slidem/slidem-slide-base.js';

export class SlidemCodepenSlide extends SlidemSlideBase {
  get template() {
    this.content = html`
      <iframe
        id="cp_embed_OEONzd"
        src="//codepen.io/ruphin/embed/OEONzd?height=335&amp;theme-id=0&amp;slug-hash=OEONzd&amp;default-tab=html%2Cresult&amp;user=ruphin&amp;embed-version=2&amp;pen-title=OEONzd"
        scrolling="no"
        frameborder="0"
        height="100%";
        allowtransparency="true"
        allowfullscreen="true"
        allowpaymentrequest="true"
        name="CodePen Embed"
        title="OEONzd"
        class="cp_embed_iframe "
        style="width: 100%; overflow: hidden;"
      />
    `;

    return super.template;
  }
}

customElements.define(SlidemCodepenSlide.is, SlidemCodepenSlide);

import {PolymerElement, html} from '@polymer/polymer/polymer-element.js';
import {TemplateStamp} from '@polymer/polymer/lib/mixins/template-stamp.js';


class LineUpScripted extends TemplateStamp(PolymerElement) {
  static get is() { return 'lineup-scripted'; }

  static get properties() {
    return {
      data: {
        type: Object,
        value: {}
      },
      generator: String
    };
  }

  connectedCallback() {
    super.connectedCallback();

    const script = this.querySelector('script');
    const f = new Function(`
    ${script.innerText}
    return ${this.generator}();`);
    this.data = f();

    // see https://stackoverflow.com/questions/44412325/how-to-inject-template-using-slot-with-data-binding-in-polymer2
    const template = this.querySelector('template');
    this.__instance = this._stampTemplate(template);
    // make a sibling
    this.parentElement.appendChild(this.__instance);
  }

  static get template() {
    return html`<style> :host { display: none; }</style>`;
  }
}

window.customElements.define('lineup-scripted', LineUpScripted);

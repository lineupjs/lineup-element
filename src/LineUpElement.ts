const { customElement, property, query } = Polymer.decorators;
import * as css from 'raw-loader!lineupjs/build/LineUpJS.css';
import { LineUp, asLineUp } from 'lineupjs';

{
  // see https://github.com/Polymer/polymer/issues/2386
  // font-face are not supported in custom styles need to import globally
  const style = String(css.default);
  const fontFace = style.match(/@font-face[^}]+\}/);
  if (fontFace) {
    const s = document.createElement('style');
    s.innerText = fontFace[0];
    document.head.appendChild(s);
  }
}

@customElement('lineup-element')
export class LineUpElement extends Polymer.Element {

  private instance: LineUp;

  @property({ type: Array })
  data: any[] = [];

  @query('main')
  private _main: HTMLElement;

  ready() {
    super.ready();

    this.instance = asLineUp(this._main, this.data);
  }

  update() {
    this.instance.update();
  }

  static get template() {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>

      ${css.default}


      :host {
        position: relative;
      }

      .lu {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }
    </style>
    <main></main>
    `;
    return template;
  }
}

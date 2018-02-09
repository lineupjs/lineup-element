const { customElement, property, query, observe } = Polymer.decorators;
import * as css from 'raw-loader!lineupjs/build/LineUpJS.css';
import { LocalDataProvider, LineUp, builder } from 'lineupjs';

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

  private provider: LocalDataProvider;
  private instance: LineUp;

  @property({ type: Array })
  data: any[] = [];

  @query('main')
  private _main: HTMLElement;

  ready() {
    super.ready();

    this.provider = builder(this.data).deriveColumns().buildData();
    this.instance = new LineUp(this._main, this.provider);
  }

  update() {
    this.instance.update();
  }

  @observe('data')
  private onDataChanged() {
    console.log(this.data);
    if (this.provider) {
      this.provider.setData(this.data);
    }
    //this.instance.data.setData(this.data);
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

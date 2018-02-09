const { customElement, property, query } = Polymer.decorators;
import * as css from 'raw-loader!lineupjs/build/LineUpJS.css';
import { LineUp, asLineUp } from 'lineupjs';

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
      :host > main {
        position: relative;
      }

      .lu {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
      }

      ${css.default}
    </style>
    <main></main>
    `;
    return template;
  }
}

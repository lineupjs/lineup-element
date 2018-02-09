const { customElement, property, observe } = Polymer.decorators;

@customElement('lineup-element')
export class LineUpElement extends Polymer.Element {

  @property({ type: Number, notify: true })
  personId: number = 44;

  @property()
  size: number = 60;

  @observe('size')
  private _sizeChanged(size: number) {
    console.log("size changed to " + size);
  }

  static get template() {
    return Polymer.html`
    <style>
      :host {
        display: block;
      }
    </style>
    <div>Hello World</div>
    `;
  }
}

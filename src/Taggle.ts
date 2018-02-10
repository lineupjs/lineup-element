import {LineUpElement} from './LineUpElement';

export default class TaggleElement extends LineUpElement {
  static readonly is = 'taggle-element';
}

window.customElements.define(TaggleElement.is, TaggleElement);

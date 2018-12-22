LineUp.js Polymer Wrapper (LineUp-Element)
===========================================

[![License: MIT][mit-image]][mit-url] [![NPM version][npm-image]][npm-url]  [![CircleCI][ci-image]][ci-url] 

LineUp is an interactive technique designed to create, visualize and explore rankings of items based on a set of heterogeneous attributes. 
This is a Polymer 3.0](https://www.polymer-project.org/) web component wrapper around the JavaScript library [LineUp.js](https://github.com/lineupjs/lineupjs). Details about the LineUp visualization technique can be found at [http://lineup.caleydo.org](http://lineup.caleydo.org). 

Usage
-----

**Installation**

```bash
bower install https://github.com/lineupjs/lineup-element
```

```html
<link rel="import" href="bower_components/lineup-element/lineup-element.html">
```

**Minimal Usage Example**

```javascript
// generate some data
const arr = [];
const cats = ['c1', 'c2', 'c3'];
for (let i = 0; i < 100; ++i) {
  arr.push({
    a: Math.random() * 10,
    d: 'Row ' + i,
    cat: cats[Math.floor(Math.random() * 3)],
    cat2: cats[Math.floor(Math.random() * 3)]
  })
}
conat data = { arr, cats };
```
```jsx
<lineup-element data="[[data.arr]]"></lineup-element>
```

TODO
[CodePen]()

![Minimal Result](https://user-images.githubusercontent.com/4129778/34654173-32180ff8-f3f8-11e7-8469-229fa34a65dc.png)


**Advanced Usage Example**

```jsx
// arr from before
<lineup-element data="[[data.arr]]" side-panel side-panel-collapsed default-ranking="true">
  <lineup-string-desc column="d" label="Label" width="100" ></lineup-string-desc>
  <lineup-categorical-desc column="cat" categories="[[cats]]" color="green" ></lineup-categorical-desc>
  <lineup-categorical-desc column="cat2" categories="[[cats]]" color="blue" ></lineup-categorical-desc>
  <lineup-number-desc column="a" domain="[0, 10]" color="blue" ></lineup-number-desc>
  <lineup-ranking group-by="cat" sort-by="a:desc">
    <lineup-support-column type="*" ></lineup-support-column>
    <lineup-column column="*" ></lineup-column>
  </lineup-ranking>
</lineup-element>
```

TODO
[CodePen]()

![Advanced Result](https://user-images.githubusercontent.com/4129778/34654174-3235f784-f3f8-11e7-9361-44f5fa068bb9.png)


Supported Browsers
------------------

 * Chrome 64+ (best performance)
 * Firefox 57+
 * Edge 16+
 


Development Environment
-----------------------

**Installation**

```bash
git clone https://github.com/lineupjs/lineup-element.git
cd lineup-element
npm install
```

**Build distribution packages**

```bash
npm run build
```

**Run Linting**

```bash
npm run lint
```


**Serve integrated webserver**

```bash
npm run watch
npm start
```


Authors
-------

 * Samuel Gratzl (@sgratzl)

[npm-image]: https://badge.fury.io/js/lineup-element.svg
[npm-url]: https://npmjs.org/package/lineup-element
[mit-image]: https://img.shields.io/badge/License-MIT-yellow.svg
[mit-url]: https://opensource.org/licenses/MIT
[ci-image]: https://circleci.com/gh/lineupjs/lineup-element.svg?style=shield
[ci-url]: https://circleci.com/gh/lineupjs/lineup-element


 


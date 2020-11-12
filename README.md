# Ligi.js

*Pronounced with a hard G as in golf. [It means __bind__.](https://en.bab.la/dictionary/esperanto-english/ligi)*

Ligi.js is a Javascript micro-library for keeping DOM elements in sync with arrays, and updating only properties that have changed. It is not a full declarative framework, but a simple set of utilities to help with reactivity in pure Javascript.

## Getting Started

### Method 1: Include in HTML

#### ES6-Compatible Browsers

For browsers that support ES6 features, you can include one of these tags before your code that uses Ligi:

```html
<script src="https://unpkg.com/ligi/dist/ligi.umd.min.js"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/gh/universe-software/ligi/dist/ligi.umd.min.js"></script>
```

#### Non ES6-Compatible Browsers

For older browser versions that don't support ES6 features, you can include one of these tags before your code that uses Ligi. This version is larger.

```html
<script src="https://unpkg.com/ligi"></script>
```

or

```html
<script src="https://cdn.jsdelivr.net/gh/universe-software/ligi/dist/ligi.umd.es5.min.js>
```

### Method 2: Browser ES Modules

In browsers that support ES modules, you can use one of these `import` lines **if your code is in a &lt;script type="module"&gt;**:

```javascript
import $_ from 'https://unpkg.com/ligi/dist/ligi.esm.min.js'
```

or

```javascript
import $_ from 'https://cdn.jsdelivr.net/gh/universe-software/ligi/dist/ligi.esm.min.js'
```

### Method 3: NPM and Bundling

If you're using a Javascript bundler like Webpack, Rollup, or Browserify, you can install the `ligi` package from NPM and import it like this:

```javascript
const $_ = require('ligi')
```

or, if your bundler supports ES modules:

```javascript
import $_ from 'ligi'
```

## Usage

Ligi defines one function, typically imported as `$_`, which has four uses:

### Synchronize DOM With Arrays

```javascript
$_(element, key, create, update, [initial]): function(any[])
```

| Parameter | Type | Usage |
| --- | --- | --- |
| `element` | [`Element`](https://developer.mozilla.org/en-US/docs/Web/API/element) | A container DOM element that's children will be synchronized with the array. **Should have no children, unless the `initial` parameter is passed to this function.**
`key` | `function(any): any` | A function that will be called whenever Ligi needs a unique ID for an item from the array. It should take an item from the array and return a unique deterministic key ID for that item, which can be any value type (not an object or array). |
| `create` | `function(any):` [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/node) | A function that will be called when there is a new item in the list and a corresponding DOM element needs to be created. It should create and return a DOM [`Node`](https://developer.mozilla.org/en-US/docs/Web/API/node). It is passed the corresponding item from the array, but you usually won't use that here because `update` is immediately called on the newly created node. |
| `update` | `function(`[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/node)`, any)` | A function that will be called with every child node of the container element after an update, including newly created nodes. It takes the DOM node and the corresponding item from the array as parameters and should update the node as necessary. Since it is called *every* time, it should check and update only properties that have changed, which `$_` can help with as explained below. |
| `initial` (optional) | `any[]` | Use this if the container element is not empty. This array should have the same length as there are child elements in the container, and ideally be the 'initial value' for the bound array. **Ligi doesn't immediately use this, but it's important for non-empty containers because it keeps unnecessary elements from being created.** |

#### Returns

A function that you can call with an array to update the list. Call this with the array every time you need to update. **Ligi will not do anything unless you call this.**

#### Example

An example of this is at the bottom of this page.

### Create a DOM Element

```javascript
$_(tag, props, ...children)
```

| Parameter | Type | Usage |
| --- | --- | --- |
| `tag` | `string` | The tag name of the element to create |
| `props` | `object` | An object of properties for the new element. You can set the special `is` property to create an instance of a [custom element that extends another tag](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements#Customized_built-in_elements). Setting properties that begin with `'on'` will be handled by calling [`addEventListener`](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
| `...children` | `...`[`Node`](https://developer.mozilla.org/en-US/docs/Web/API/node) &#124; ` string` | The rest of the parameters, if any, should either be `Node`s or `string`s, representing the child nodes. `string`s will be made into [`Text`](https://developer.mozilla.org/en-US/docs/Web/API/Text) nodes. |

#### Example

```javascript
document.body.appendChild(
  $_('div', {},
    $_('h1', {}, 'Hello From Ligi'),
    $_('p', {},
      $_('button', {onclick: () => alert('Click')}, 'Click Me'),
      'Lorem ipsum dolor sit amet'
    )
  )
)
```

### Update Properties If Necessary

`$_(obj, props)`

| Parameter | Type | Usage |
| --- | --- | --- |
| `obj` | `object` | The object to modify if necessary |
| `props` | `object` | An object with keys representing properties of the target object. The target object will be modified so that its property values reflect the values in this object. If a value of this object is itself an object and not array-like, it will be recursively handled. |

#### Example

```javascript
$_(document.body, {style: {backgroundColor: 'cornflowerblue'}})
```

### Test for Deep Equality

`$_(values)`

*This function isn't directly related to DOM, but when using Ligi with Web Components that take arrays or objects as properties, this is useful for checking whether they need updating.*

| Parameter | Type | Usage |
| --- | --- | --- |
| `values` | `any[]` | An array of values of any type to test for deep equality |

#### Returns

`true` if all values in the array are deeply equal, otherwise `false`.

### Example: Sync a List With an Array

```javascript
<ul id="list"></ul>
<button onclick="insert()">Insert</button>

<script>
  const list = [
  	{title: 'Foo', text: 'Lorem ipsum dolor sit amet'},
  	{title: 'Bar', text: 'Consectetur adipiscing elit'}
  ]
  
  const update = $_(
    document.getElementById('list'),
    
    // Key Function:
    item => item.title,
    
    // Create Function:
    () => $_('li', {},
      $_('h3'),
      $_('p')
    ),
    
    // Update Function:
    (el, item) => {
      $_(el.querySelector('h3'), {textContent: item.title})
      $_(el.querySelector('p'), {textContent: item.text})
    }
  )
  
  // Call the Returned Function
  update(list)
  
  function insert() {
    // Include a random number in the title because titles are used as keys, which must be unique
    list.splice(1, 0, {title: 'Baz ' + Math.floor(Math.random() * 100), text: 'This element was inserted in the middle.'})
    update(list)
  }
</script>
```
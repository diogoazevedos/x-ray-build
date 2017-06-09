# x-ray-build

A helper that build a [x-ray](https://github.com/lapwinglabs/x-ray) based on a schema.

### Getting started

```sh
npm install x-ray-build
```

```js
const x = require('x-ray');
const build = require('x-ray-build');
const crawl = build(x, {
  $source: 'https://github.com/diogoazevedos',
  $context: '[itemscope]',
  $selector: {
    name: '.vcard-fullname',
    repos: {
      $context: '.source',
      $selector: [{
        name: '.repo',
      }],
    },
  },
});

crawl((e, content) => console.log(content));
```

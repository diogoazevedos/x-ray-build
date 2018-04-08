const test = require('ava');
const build = require('./');

test('should all params be defined', (t) => {
  const x = (source, context, selector) => {
    t.is(source, 'source');
    t.is(context, 'context');
    t.is(selector, 'selector');
  };

  build(x, {
    $source: 'source',
    $context: 'context',
    $selector: 'selector',
  });
});

test('should the source be `null`', (t) => {
  const x = (source, context, selector) => {
    t.is(source, null);
    t.is(context, 'context');
    t.is(selector, 'selector');
  };

  build(x, {
    $context: 'context',
    $selector: 'selector',
  });
});

test('should the context be `null`', (t) => {
  const x = (source, context, selector) => {
    t.is(source, 'source');
    t.is(context, null);
    t.is(selector, 'selector');
  };

  build(x, {
    $source: 'source',
    $selector: 'selector',
  });
});

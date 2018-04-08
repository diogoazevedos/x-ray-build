const test = require('ava');
const build = require('./');

test('should all params be defined', (t) => {
  const x = ($source, $context, $selector) => {
    t.is($source, 'https://github.com/diogoazevedos');
    t.is($context, '[itemscope]');
    t.is($selector, '.vcard-fullname');
  };

  build(x, {
    $source: 'https://github.com/diogoazevedos',
    $context: '[itemscope]',
    $selector: '.vcard-fullname',
  });
});

test('should the source be null and all others be defined', (t) => {
  const x = ($source, $context, $selector) => {
    t.is($source, null);
    t.is($context, '[itemscope]');
    t.is($selector, '.vcard-fullname');
  };

  build(x, {
    $context: '[itemscope]',
    $selector: '.vcard-fullname',
  });
});

test('should the context be null and all others be defined', (t) => {
  const x = ($source, $context, $selector) => {
    t.is($source, 'https://github.com/diogoazevedos');
    t.is($context, null);
    t.is($selector, '.vcard-fullname');
  };

  build(x, {
    $source: 'https://github.com/diogoazevedos',
    $selector: '.vcard-fullname',
  });
});

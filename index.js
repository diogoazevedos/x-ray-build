/* eslint-disable no-use-before-define */

const { isPlainObject } = require('lodash');
const {
  curry,
  compose,
  view,
  over,
  complement,
  isNil,
  lensIndex,
  lensProp,
  __,
  defaultTo,
  all,
  anyPass,
  cond,
  map,
  T,
  identity,
  converge,
} = require('ramda');

const viewThrough = curry((lens, f) => compose(view(lens), over(lens, f)));
const isNotNil = complement(isNil);

const headLens = lensIndex(0);
const sourceLens = lensProp('$source');
const contextLens = lensProp('$context');
const selectorLens = lensProp('$selector');

const viewDefaultNil = viewThrough(__, defaultTo(null));
const isArrayOfPlainObject = all(isPlainObject);

const isBlueprintObject = anyPass([
  viewThrough(sourceLens, isNotNil),
  viewThrough(contextLens, isNotNil),
  viewThrough(selectorLens, isNotNil),
]);

const resolve = curry((f, x) => cond([
  [isBlueprintObject, build(f)],
  [isPlainObject, map(resolve(f))],
  [isArrayOfPlainObject, over(headLens, resolve(f))],
  [T, identity],
])(x));

const build = curry((f, x) => converge(f, [
  viewDefaultNil(sourceLens),
  viewDefaultNil(contextLens),
  viewThrough(selectorLens, resolve(f)),
])(x));

module.exports = build;

/* eslint-disable no-use-before-define, no-underscore-dangle */

const R = require('ramda');
const _ = require('lodash');

const viewThrough = R.curry((lens, f) => R.compose(R.view(lens), R.over(lens, f)));
const isNotNil = R.complement(R.isNil);

const headLens = R.lensIndex(0);
const sourceLens = R.lensProp('$source');
const contextLens = R.lensProp('$context');
const selectorLens = R.lensProp('$selector');

const viewDefaultNil = viewThrough(R.__, R.defaultTo(null));
const isArrayOfPlainObject = R.all(_.isPlainObject);

const isBlueprintObject = R.anyPass([
  viewThrough(sourceLens, isNotNil),
  viewThrough(contextLens, isNotNil),
  viewThrough(selectorLens, isNotNil),
]);

const resolve = R.curry((f, x) => R.cond([
  [isBlueprintObject, build(f)],
  [_.isPlainObject, R.map(resolve(f))],
  [isArrayOfPlainObject, R.over(headLens, resolve(f))],
  [R.T, R.identity],
])(x));

const build = R.curry((f, x) => R.converge(f, [
  viewDefaultNil(sourceLens),
  viewDefaultNil(contextLens),
  viewThrough(selectorLens, resolve(f)),
])(x));

module.exports = build;

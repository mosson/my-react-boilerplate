'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const path = require('path');

const entries = require('./lib/entry-point')();
const build_js = require('./lib/build-js');
const build_css = require('./lib/build-css');
const build_partial = require('./lib/build-partial');

const global = Function('return this')();
global.appRoot = path.resolve(__dirname, '..');

function main() {
  console.log('[build] start');
  _.each(entries, entry => {
    Promise
      .all([build_js(entry), build_css(entry)])
      .then(() => {
        build_partial(entry);
      })
      .catch((e) => {
        throw('[build] error: ', e);
      })
  });
}

main();

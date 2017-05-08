'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const is = require('is_js');

const watch_js = require('./lib/watch-js');
const browser_sync = require('./lib/browser-sync');

const entries = function () {
  const entries = require('../webpack.config').entry;
  if (is.string(entries)) {
    return [entries];
  } else {
    return entries;
  }
}();

function main() {
  console.log('[watch] start');

  watch_js()
    .then(() => {
      console.log('bs start!!!!');
      browser_sync();
    })
    .catch((err) => {
      throw ('[watch] error: ', err);
    });
}

main();

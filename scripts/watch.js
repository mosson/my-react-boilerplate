'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const watch_js = require('./lib/watch-js');
const watch_css = require('./lib/watch-css');
const watch_lint = require('./lib/watch-lint');
const build_html = require('./lib/build-placeholder-html');

const browser_sync = require('./lib/browser-sync');

const entries = require('./lib/entry-point')();

function main() {
  console.log('[watch] start');

  Promise.all(
    _.map(entries, entry => {
      watch_js(entry);
      watch_css(entry);
      watch_lint(entry);
    })
  )
    .then(() => {
      return Promise.all(
        _.map(entries, entry => {
          return build_html(entry);
        })
      );
    })
    .then(() => {
      browser_sync(_.first(entries));
    })
    .catch((err) => {
      throw('[watch] error: ', err);
    });
}

main();

'use strict';

const browserSync = require('browser-sync');
const pathToRegexp = require('path-to-regexp');

const MockMux = require('./browser-sync-mux');

const config = require('../../mock.config');

/**
 *
 * @param entry コマンド実行時に自動的にブラウザで開かれる最初のページのエントリ名
 * @returns {*}
 */

function main() {
  console.log('[browser-sync] start');

  return browserSync(
    {
      server   : {
        baseDir  : config.serveRoot,
        directory: true
      },
      files    : config.serveRoot,
      startPath: 'debug'
    },
    (err, bs) => {
      if (err) return console.error('[browser-sync] error', err);
      new MockMux(bs);
    }
  );
}

module.exports = main;

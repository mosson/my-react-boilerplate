'use strict';

const browserSync = require('browser-sync');
const pathToRegexp = require('path-to-regexp');

const config = require('../../index');

const MockMux = require('./browser-sync-mux');

/**
 *
 * @param entry コマンド実行時に自動的にブラウザで開かれる最初のページのエントリ名
 * @returns {*}
 */

function main(entry) {
  console.log('[browser-sync] start');

  return browserSync(
    {
      server   : {
        baseDir  : config.serve_root_path,
        directory: true
      },
      files    : config.serve_root_path,
      startPath: config.entries[entry].startPath
    },
    (err, bs) => {
      if (err) return console.error('[browser-sync] error', err);
      new MockMux(bs);
    }
  );
}

module.exports = main;

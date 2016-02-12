'use strict';

const exec = require('./exec');
const config = require('../../index');

/*
  eslint CLIのラッパー
 */

function main() {
  console.log('[watch-lint] start');

  return exec([
    'esw',
    '-w',
    '-f simple-detail',
    config.javascript_src_path
  ].join(' '));
}

module.exports = main;

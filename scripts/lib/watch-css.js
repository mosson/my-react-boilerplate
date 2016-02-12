'use strict';

const exec = require('./exec');
const config = require('../../index');

/*
  stylus CLIのラッパー
 */

function main(entry) {
  console.log('[watch-css] start');
  return exec([
    'stylus ' + config.stylesheet_src_path + entry + '.styl',
    '--use autoprefixer-stylus',
    '--watch',
    '--sourcemap-inline',
    '--out ' + config.stylesheet_debug_build_path
  ].join(' '));
}

module.exports = main;

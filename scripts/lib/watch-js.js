'use strict';

const exec = require('./exec');
const args = require('./args');
const config = require('../../index');
const path = require('path');

/*
  watchify CLIのラッパー
 */

function main(entry) {
  console.log('[watch-js] start');
  return exec([
    'NODE_PATH=' + (args.options.browserify_paths || config.browserify_paths),
    'watchify',
    '-e ' + path.join(config.javascript_src_path, entry + '.js'),
    '-o ' + path.join(config.javascript_debug_build_path, entry + '.js'),
    '-d',
    '-v',
    '-t [ babelify --presets [ es2015 react ] ]'
  ].join(' '));
}

module.exports = main;

'use strict';

const path = require('path');

const exec = require('./exec');
const args = require('./args');
const config = require('../../index');

/*
  browserify CLIのラッパー
 */

function main(entry) {
  return exec([
    'NODE_ENV=production',
    'NODE_PATH=' + (args.options.browserify_paths || config.browserify_paths),
    'browserify',
    '-e ' + path.join(config.javascript_src_path, entry + '.js'),
    '-o ' + path.join(config.javascript_build_path, entry + '.js'),
    '-t [ babelify --presets [ es2015 react ] ]'
  ].join(' '));
}

module.exports = main;

'use strict';

const path = require('path');

const exec = require('./exec');
const config = require('../../index');

/*
  stylus CLIのラッパー
 */

function main(entry) {
  return exec([
    'NODE_ENV=production',
    'stylus',
    path.join(config.stylesheet_src_path, entry + '.styl'),
    '--compress',
    '--use autoprefixer-stylus',
    '--out ' + config.stylesheet_build_path
  ].join(' '));
};

module.exports = main;
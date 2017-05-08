'use strict';

const exec = require('./exec');

function main() {
  return exec('webpack -p');
}

module.exports = main;

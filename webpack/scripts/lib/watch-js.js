'use strict';

const exec = require('./exec');

function main() {
  console.log('[watch-js] start');
  return exec('webpack -d -w', function(){}, true);
}

module.exports = main;

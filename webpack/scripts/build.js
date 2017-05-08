'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const path = require('path');

const build_js = require('./lib/build-js');

function main() {
  console.log('[build] start');

  build_js()
    .catch((e) => {
      throw ('[build] error: ', e);
    })
}

main();

'use strict';

const Promise = require('bluebird');
const _ = require('lodash');
const watch_js = require('./watch-js');
const watch_css = require('./watch-css');
const watch_lint = require('./watch-lint');
const build_html = require('./build_html');

const browser_sync = require('./browser-sync');

const entries = require('./entry-point')();

function main() {

}

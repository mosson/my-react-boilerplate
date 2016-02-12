'use strict';

/*
 CLIから指定されたエントリーポイントを配列にくるんで返す
 指定がない場合はconfigに書いてあるすべてのエントリーポイントを返す
 */

const args = require('./args');
const _ = require('lodash');
const entries = _.keys(require('../../index').entries);

function main() {
  let currentEntryPoint = (args.options || {}).entry;

  if (currentEntryPoint) {
    if (!_.contains(entries, currentEntryPoint)) throw new Error('Invalid Entry Point: ', currentEntryPoint);
    return [currentEntryPoint];
  } else {
    return entries;
  }
}

module.exports = main;

'use strict';

const Promise = require('bluebird');
const exec = require('child_process').exec;

const bufferSize = 1024 * 1000;

/*
 CLI実行コマンドのラッパー

 node環境下から別プロセスを立ち上げてシェルを叩くと出力されないことの対応
 */

function onData(callback, data) {
  callback && callback(data);
  process.stdout.write(data);
}

function executed(fulfill, reject, error, stdout, stderr) {
  if (stdout) console.log('[exec] stdout: ' + stdout);
  if (stderr) console.log('[exec] stderr: ' + stderr);

  if (error !== null) {
    console.error('[exec] error: ' + error);
    reject(error);
  } else {
    fulfill();
  }
}

function main(cmd, callback, isAsync) {
  return new Promise(function (fulfill, reject) {
    console.log('[exec] start: \"' + cmd + '\"');

    let proc = exec(
      cmd,
      {maxBuffer: bufferSize},
      executed.bind(this, fulfill, reject)
    );

    if(isAsync) fulfill();

    proc.stdout.on('data', onData.bind(this, callback));
  });
}

module.exports = main;

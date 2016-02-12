'use strict';

const Promise = require('bluebird');
const fs = require('fs');
const path = require('path');

const config = require('../../index');
const global = Function("return this")();

/*
  エントリポイントのルートノードを文字列としてファイルに書き込む
  RailsのPartialなどに読み込ませてプリレンダリングとして使用するようとを想定
 */

/**
 * プロダクトコードをビルドしたファイルをJSとして読み込む
 * プロダクトコードでdocumentが存在しない時にglobal.templateにレンダリング結果を格納することを想定している
 * @param entry
 */

function setTemplate(entry) {
  require(path.join(
    global.appRoot,
    config.javascript_build_path,
    entry
  ));
}

function write(entry) {
  // 設定ファイルになければ何もしない
  let buildPath = config.entries[entry].buildPath;
  if (!buildPath) return Promise.resolve(true);

  return new Promise((fulfill, reject) => {
    setTemplate(entry);

    console.log('[build-partial] write: ', buildPath);

    fs.writeFile(buildPath, global.template, (err) => {
      if (err) return reject(err);
      fulfill();
    });
  });
}

function main(entry) {
  try {
    let preRenderFn = (config.entries[entry] || {}).preRenderFn;
    ((preRenderFn && preRenderFn()) || Promise.resolve(true)).then(() => {
      write(entry);
    });
  } catch (e) {
    throw(e);
  } finally { // defer
    global.preState = undefined;
  }
}

module.exports = main;
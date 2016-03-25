'use strict';

const Promise = require('bluebird');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');
const assign = require('object-assign');

const config = require('../../index');

/*
  エントリーポイント名のテンプレートを探し、HTMLファイルとして書き出す

  エントリーポイントのJS/CSSを読み込むためのHTMLを書き出すためのテストページの作成
  RailsなどのWAFでプリレンダ用途として使う場合はbuild-partialを参照
 */


function wrote(fulfill, reject, err) {
  if (err) {
    console.log('[build-placeholder-html] wrote error: ' + err);
    reject(err);
  } else {
    fulfill();
  }
}

function read(entry, fulfill, reject, err, text) {
  if(err) {
    console.error('[build-placeholder-html] read error: ' + err);
    return reject();
  }

  let dist = config.entries[entry].placeholdPath;
  console.log('[build-placeholder-html] read: ', dist);

  let js = '/' + path.join(config.javascript_debug_build_path.replace(config.serve_root_path, ''), entry + '.js');
  let css = '/' + path.join(config.stylesheet_debug_build_path.replace(config.serve_root_path, ''), entry + '.css');

  fs.writeFile(
    dist,
    ejs.render(
      text,
      assign(
        {},
        config,
        {
          entry: entry,
          javascript_path: js,
          stylesheet_path: css
        }
      ),
      {}
    ),
    wrote.bind(this, fulfill, reject)
  );
}

function main(entry) {
  console.log('[build-html] start');

  return new Promise((fulfill, reject) => {
    fs.readFile(
      path.join(config.html_placeholders_path, entry + '.ejs'),
      'utf8',
      read.bind(this, entry, fulfill, reject)
    );
  });
}

module.exports = main;
'use strict';

/*
 フロントエンドのビルド環境設定ファイル
 */

const path = require('path');

const config = {
  /*
   build/watchコマンドで使用
   JavaScriptのソースファイルの置き場所
   */
  javascript_src_path: 'src/javascripts/',

  /*
   watchコマンドで使用
   JavaScriptの一時的なビルドファイルの置き場所: BrowserSyncでホストする位置以下にあること
   */
  javascript_debug_build_path: 'public/debug/javascripts/',

  /*
   buildコマンドで使用
   JavaScriptをコンパイルしたものの出力先
   */
  javascript_build_path: 'dist/javascripts/',

  /*
   build/watchコマンドで使用
   cssのソースファイルの置き場所を指定
   */
  stylesheet_src_path: 'src/stylesheets/',

  /*
   watchコマンドで使用
   CSSのコンパイルしたソースを一時的においておく場所を指定: BrowserSyncサーバーからホストできる位置
   */
  stylesheet_debug_build_path: 'public/debug/stylesheets/',

  /*
   buildコマンドで使用
   CSSのコンパイルしたソースを置く場所を指定
   */
  stylesheet_build_path: 'dist/stylesheets/',

  /*
   watchコマンドで使用
   確認用ページのHTMLのソースを指定
   */
  html_placeholders_path: 'src/entries/',

  /*
   watchコマンドで使用
   確認用サーバーのルートパスを指定
   */
  serve_root_path: 'public/',

  /*
   watchコマンドで使用
   確認用サーバーのモック配信機能のディレクトリを指定
   モックはすべてJavaScriptで記述される　詳しくはサンプルを配置しているのでそちらを参照
   */
  mock_dir: 'mock',

  /*
   build/watchコマンドで使用
   ページごとにエントリーポイントを作成するための設定
   1HTMLに対して1Javascript:1CSSをコンパイルするための設定
   */
  entries: {
    /*
     keyがエントリーポイント名

     pattern: モック配信のエンドポイントになる　正規表現を使用可能
     startPath: デバッグサーバーが立ち上がった時に最初に開くパス
     placeholdPath: モック配信時の一時ファイルの置き場所
     preRenderFn: build時に予め操作する場合に呼ばれるスクリプト（オプション）
     buildPath: build時にそのエントリーポイントのプリレンダー結果を出力する場所（オプション）
     */
    sample: {
      pattern      : '/sample/*',
      startPath    : '/sample',
      placeholdPath: 'dist/htmls/sample.html',
      preRenderFn  : require('./pre-renders/sample'),
      buildPath    : 'dist/htmls/_sample.html'
    },

    sample2: {
      pattern      : '/sample2/*',
      startPath    : '/sample2',
      placeholdPath: 'dist/htmls/sample2.html',
      preRenderFn  : require('./pre-renders/sample2'),
      buildPath    : 'dist/htmls/_sample2.html'
    }
  }

};

config.browserify_paths = [
  config.javascript_src_path,
  'node_modules'
].join(':');

config.appRoot = path.resolve(__dirname, './');

module.exports = config;

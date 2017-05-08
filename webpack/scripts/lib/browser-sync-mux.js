'use strict';

const _ = require('lodash');
const is = require('is_js');
const fs = require('fs');
const path = require('path');
const assign = require('object-assign');
const Promise = require('bluebird');
const connectUtil = require('browser-sync/lib/connect-utils');
const pathToRegexp = require('path-to-regexp');

const config = require('../../mock.config');
const entries = require('../../webpack.config.js').entry;

const Handler = require('./broswer-sync-handler');
const template = require('./browserify-entry-template');

const BLACK_LIST = [
  '.',
  '..',
  '.DS_Store',
  '.keep',
  '.gitkeep'
];

/*
 browser-sync のデバッグ用サーバーのモック部分のマルチプレクサ

 マルチプレクサ:
 入力された URL にマッチするパターンを登録されているパターン群の中から探して、
 それに対応する handler を呼び出す
 */

class MockMux {
  /**
   *
   * @param bs browser-syncオブジェクト。Middlewareとして自身を登録する
   */

  constructor(bs) {
    if (!bs) console.error('[MockMux] error:', 'Requires browser-sync');
    this.bs = bs;
    this._routes = {};

    this.buildRoutes();
    this.buildEntryRoutes();

    bs.addMiddleware('*', this.handle.bind(this), { override: true });
  }

  /**
   * 指定された位置からファイルシステムを再帰的に読み取りモックサーバーのルートを構築する
   *
   * @param directory 読み取り開始位置
   * @returns {{}|*}
   */

  buildRoutes(directory) {
    directory = directory || config.mockDir;

    _.map(fs.readdirSync(directory), (file_or_directory_name) => {
      if (_.includes(BLACK_LIST, file_or_directory_name)) return;

      let file_or_directory_path = path.join(directory, file_or_directory_name).toString();

      if (fs.statSync(file_or_directory_path).isDirectory()) {
        this.buildRoutes(file_or_directory_path);
      } else {
        Handler.register(file_or_directory_path, require(path.join(config.appRoot, file_or_directory_path)));
      }
    });
  }

  /**
   * エントリーポイントのエンドポイントを登録する
   * build-placeholder-htmlタスクで出力されたファイルを配信するだけのハンドラを生成
   *
   */

  buildEntryRoutes() {
    var registerEntryRoute = function (route) {
      fs.writeFileSync(
        path.join(config.serveRoot, 'debug', route + ".html"),
        template({
          entry: route,
          bsScript: connectUtil.scriptTags(this.bs.options)
        })
      );
    }

    if (is.string(entries)) {
      registerEntryRoute.call(this, entries);
    } else {
      _.each(entries, (__, key) => {
        registerEntryRoute.call(this, key);
      });
    }
  }

  /**
   * HTTPリクエストに対応したhandlerが登録されていればhandlerを呼ぶ
   *
   * @param req
   * @param res
   * @param next
   */

  handle(req, res, next) {
    let handler = Handler.find(req.method, req.url);

    if (handler) {
      handler.invoke(req, res);
    } else {
      next();
    }
  }

}

module.exports = MockMux;

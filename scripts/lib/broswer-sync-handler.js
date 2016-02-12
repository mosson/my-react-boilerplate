'use strict';

const _ = require('lodash');
const pathToRegexp = require('path-to-regexp');
const is = require('is_js');
const Promise = require('bluebird');
const assign = require('object-assign');
const qs = require('querystring');
const path = require('path');

const config = require('../../index');

const METHODS = /GET\/|POST\/|PUT\/|PATCH\/|DELETE\/|OPTIONS\//;

class Handler {
  /**
   * ファイルシステム上のJSファイル（filePath）か引数（handleFn）をハンドラとして登録する
   *
   * @param filePath ファイルシステム上のパス: パス内にHTTP METHODが含まれている必要がある
   * @param handleFn 実行されるハンドラ: 未指定の場合fileをJSとして実行
   */

  static register(filePath, handleFn) {
    let handler = new Handler(filePath, handleFn);

    if (!this._routes) this._routes = {};
    if (!this._routes[handler.method]) this._routes[handler.method] = {};

    this._routes[handler.method][handler.path] = handler;
  }

  /**
   * ルート定義にある変数を取得して辞書を作成し、対応するhandlerを返却する
   * @param method HTTPメソッド
   * @param path リクエストパス
   * @returns handleFn
   */

  static find(method, path) {
    let params = {};
    let handler = _.find(this._routes[method], (__, pattern) => {
      let keys = [];
      let re = pathToRegexp(pattern, keys);
      let matches = re.exec(path);

      if (matches) { // もしpathが登録されているhandlerのpattenに一致するものがあればpathから変数辞書を作成する
        params = _.object(_.map(keys, (param, index) => {
          return [param.name, matches[index + 1]]
        }));
      }

      return matches && !!matches[0];
    });

    if (handler) handler.params = params || {};

    return handler;
  }

  /**
   * リクエストのペイロードをJSONかQueryString形式でデコードを試して返す
   *
   * @param data
   * @returns {*}
   */

  static parse(data) {
    try {
      return JSON.parse(data);
    } catch (e) {
      try {
        return qs.parse(data);
      } catch (e) {
        return {};
      }
    }
  }

  /**
   * ファイルシステム上のJSファイルをハンドラとして登録する
   *
   * @param filePath ファイルシステム上のパス: パス内にHTTP METHODが含まれている必要がある
   * @param handleFn 実行されるハンドラ: 未指定の場合fileをJSとして実行
   */

  constructor(filePath, handleFn) {
    filePath.replace(METHODS, (method_dir) => {
      this._path = path.normalize(
        path.join(
          '/',
          filePath
            .replace(config.appRoot, '')
            .replace(config.mock_dir, '')
            .replace(method_dir, '')
            .replace(path.extname(filePath), '')
        )
      );

      this._method = method_dir.replace(/\//gim, '');
      this._action = handleFn;

      if (!this._action) console.error('[Handler] registered error:', this._method, this._path, 'handleFn is undefined');

      console.log('[Handler] registered:', this._method, this._path);
    });
  }

  /**
   * リクエストを処理してから登録されているアクションを実行する
   *
   * @param req
   * @param res
   * @param next
   */

  invoke(req, res) {
    try {
      console.log('[Handler] handle: ', req.method, req.url);
      req.params = assign({}, req.params || {}, this.params || {});

      this.handle(req)
        .then(() => {
          return this.action(res, req, config);
        })
        .then((payload) => {
          // レスポンスを閉じる
          res.end(is.object(payload) || is.array(payload) ? JSON.stringify(payload) : payload);
        });
    } catch (e) {
      throw(e);
    } finally { // defer
      this.params = undefined;
    }
  }

  /**
   * リクエストを処理する(ex: POST処理, JSONデコード)
   */

  handle(req) {
    return new Promise((fulfill, reject) => {
      let postData = '';

      req.on("data", chunk => {
        postData += chunk;
      });

      req.on('end', () => {
        req.body = postData; // action内から参照できるように生データを保存
        assign(req.params, Handler.parse(postData)); // 扱いやすいようにparamsにも格納
        fulfill(postData);
      });
    });
  }

  get action() {
    return this._action;
  }

  get path() {
    return this._path;
  }

  get method() {
    return this._method;
  }
}

module.exports = Handler;

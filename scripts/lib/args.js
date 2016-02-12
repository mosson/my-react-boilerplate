'use strict';

/**
 * コマンド引数の定義ファイル
 */

const argv = require('argv');

argv.option({
  name       : 'entry',
  short      : 'e',
  type       : 'string',
  description: 'エントリーポイントを指定します',
  example    : "'npm run build --entry=value' or 'npm run watch -e value'"
});

argv.option({
  name       : 'browserify_paths',
  short      : 'b',
  type       : 'string',
  description: 'Browserifyの起点となるパスを指定します',
  example    : "'npm run build --browserify_paths=/src/javascripts:./node_modules'"
});

module.exports = argv.run();

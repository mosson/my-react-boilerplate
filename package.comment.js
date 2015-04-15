{
  "name": "my-react
  "version": "0.0.1
  "description": "my react boilterplate
  "main": "index.js
  "scripts": {
    "test": "jest"
  },
  "keywords": [
    "for
    "experiments"
  ],
  "author": "mosson
  "license": "MIT
  "devDependencies": {
    "gulp": "*
    "gulp-webserver": "*
    "vinyl-source-stream": "*
    "browserify": "*
    "reactify": "*
    "jasmine": "*
    "jest-cli": "*"
  },

  "dependencies": {
    "react": "*
    "react-tools": "*"
  },

  // scripts.test で jestコマンドが実行される
  // そのときに環境変数に以下を渡している
  // それぞれの使い方はAPI DOC の Config Options をみると良い
  // # http://facebook.github.io/jest/docs/api.html#content

  "jest": {

    // dependencies の キャッシュ を格納するDir
    "cacheDirectory": "jest-cli/.haste_cache

    // カバレッジを収集するか default: false
    "collectCoverage": true,

    // テスト環境下のグローバルに変数をつめることができる
    "globals":  {
      "__DEV__": true
    },

    // 自作モジュールが読み込むモジュールの拡張子
    // require('./mine[.xxx]') の省略されたところ
    "moduleFileExtensions": ["js", "json"],

    // 正規表現の文字列
    // テスト環境ではrequireをできなくする
    "modulePathIgnorePatterns": ["/node_modules/"],

    // default: package.jsonが配置されている階層 か　`pwd`
    // テストファイルやモジュールの位置を読むときに仕様
    // <rootDir>は特殊な意味を持ち、上記と同じ
    //\"rootDir\": \"\"

    // テストを実行する前に対象モジュールにたいして行う処理
    // ES6トランスパイルを想定している
    // このリポジトリではJSXをJSにコンパイルする
    "scriptPreprocessor": "<rootDir>/preprocessor.js

    // すべてのテストが実行される前にテスト環境の前準備をするスクリプト
    // \"setupEnvScriptFile\": \"\",

    // テストファイルが格納されているディレクトリ
    "testDirectoryName": "__tests__

    // テストファイルの対象拡張子
    "testFileExtensions": ["js", "coffee"],

    // テストディレクトリを探す起点
    "testPathDirs": [""],

    // 正規表現の文字列
    // テストをスキップするパスのパターン
    // \"testPathIgnorePatterns\": [\"\"],

    // 正規表現の文字列
    // テスト環境ではロードされたモジュールはすべてモックオブジェクトとなる
    // このパラメータに該当するものはモックオブジェクトではなくそのまま読み込まれるようになる
    // テストファイル中でjest.mock / jest.dontMock を呼ぶことでも同じことが可能
    "unmockedModulePathPatterns": ["<rootDir>/node_modules/"]
  }
}

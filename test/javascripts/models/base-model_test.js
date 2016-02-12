'use strict';

import Subject from 'models/base-model';

import assert from 'assert';

import sinon from 'sinon';

import _ from 'lodash';

describe('models/base-model', () => {
  class Dummy extends Subject {

  }

  class TestSubject extends Subject {

  }

  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  describe('::hasMany(name, targetClass, defaultID)', () => {
    it('関連モデルの取得メソッドが生える', () => {
      TestSubject.hasMany('foos', Dummy);
      let subject = new TestSubject();
      assert.notEqual(subject._get_foos, undefined);
      assert.deepEqual(subject._get_foos(), subject.foos, 'getterで取得したものと同一');
    });

    it('関連モデルの生成・更新メソッドが生える', () => {
      TestSubject.hasMany('foos', Dummy);
      let subject = new TestSubject();

      assert.notEqual(subject._update_foos, undefined);

      subject.state.foos = {
        '1': new Dummy({id: 1}),
        '2': new Dummy({id: 2}),
        '3': new Dummy({id: 3})
      };

      subject._update_foos([
        {id: 1, name: 'foo1'},
        {id: 2, name: 'foo2'},
        {name: 'foo3'}, // IDがないものは更新されない
        {id: 4, name: 'foo4'}
      ]);

      assert.equal(subject.state.foos['1'].state.name, 'foo1');
      assert.equal(subject.state.foos['2'].state.name, 'foo2');
      assert.equal(subject.state.foos['3'].state.name, undefined, '該当しないプロパティは更新されない');

      assert.equal(subject.state.foos['4'].state.id, 4, '更新時に存在しないものは生成される');
      assert.equal(subject.state.foos['4'].state.name, 'foo4');
    });


    it('関連モデルの破棄メソッドが生える', () => {
      TestSubject.hasMany('foos', Dummy);
      let subject = new TestSubject();

      assert.notEqual(subject._destroy_foos, undefined);

      subject.state.foos = {
        '1': new Dummy({id: 1}),
        '2': new Dummy({id: 2}),
        '3': new Dummy({id: 3})
      };

      assert.equal(_.keys(subject.state.foos).length, 3);

      subject._destroy_foos([
        {id: 1, _destroyed: true},
        {id: 2, _destroyed: false}
      ]);

      assert.equal(_.keys(subject.state.foos).length, 2);
      assert.equal(subject.state.foos['1'], undefined, '{id: 1} のみが削除される');
    });

    it('シリアライズできるオブジェクトに変換するメソッドが生える', () => {
      TestSubject.hasMany('foos', Dummy);
      let subject = new TestSubject();

      assert.notEqual(subject._foos_as_json, undefined);

      subject.state.foos = {
        '1': new Dummy({id: 1}),
        '2': new Dummy({id: 2}),
        '3': new Dummy({id: 3})
      };

      sandbox.stub(Dummy.prototype, 'asJSON').returns(42);

      assert.deepEqual(subject._foos_as_json(), [42, 42, 42], '関連モデルのasJSONの戻り値を格納');
    });

    it('getterメソッドを生やす', () => {
      TestSubject.hasMany('foos', Dummy);
      let subject = new TestSubject();

      subject.state.foos = {
        '1': new Dummy({id: 1}),
        '2': new Dummy({id: 2}),
        '3': new Dummy({id: 3})
      };

      assert(subject.foos instanceof Array, '取得時には配列として返す');
      assert.equal(subject.foos[0].id, 1);
      assert.equal(subject.foos[1].id, 2);
      assert.equal(subject.foos[2].id, 3);
    });
  });

  describe('::hasOne(name, targetClass, defaultID)', () => {
    it('関連モデルの取得メソッドが生える', () => {
      TestSubject.hasOne('foo', Dummy);
      let subject = new TestSubject();
      assert.notEqual(subject._get_foo, undefined);
      assert.deepEqual(subject._get_foo(), subject.foo, 'getterで取得したものと同一');
    });

    it('関連モデルの生成・更新メソッドが生える', () => {
      TestSubject.hasOne('foo', Dummy);
      let subject = new TestSubject();

      assert.notEqual(subject._update_foo, undefined);

      subject.state.foos = new Dummy({id: 1});

      subject._update_foo({id: 1, name: 'foo1'});

      assert.equal(subject.state.foo.state.name, 'foo1');
    });


    it('関連モデルの破棄メソッドが生える', () => {
      TestSubject.hasOne('foo', Dummy);
      let subject = new TestSubject();

      assert.notEqual(subject._destroy_foo, undefined);

      subject.state.foo = new Dummy({id: 1});

      subject._destroy_foo({id: 1, _destroyed: true});

      assert.equal(subject.state.foo, undefined);
    });

    it('シリアライズできるオブジェクトに変換するメソッドが生える', () => {
      TestSubject.hasOne('foo', Dummy);
      let subject = new TestSubject();

      assert.notEqual(subject._foo_as_json, undefined);

      subject.state.foo = new Dummy({id: 1});

      sandbox.stub(Dummy.prototype, 'asJSON').returns(42);

      assert.deepEqual(subject._foo_as_json(), 42, '関連モデルのasJSONの戻り値を格納');
    });

    it('getterメソッドを生やす', () => {
      TestSubject.hasOne('foo', Dummy);
      let subject = new TestSubject();

      subject.state.foo = new Dummy({id: 1});

      assert(subject.foo instanceof Dummy);
      assert.equal(subject.foo.id, 1);
    });
  });

  describe('::isEncode(value)', () => {
    it('引数がシリアライズして良い値かどうかを返す', () => {
      assert.equal(TestSubject.isEncode(true), true, 'BoolはOK');
      assert.equal(TestSubject.isEncode(false), true, 'BoolはOK');
      assert.equal(TestSubject.isEncode(1), true, 'NumberはOK');
      assert.equal(TestSubject.isEncode('str'), true, 'StringはOK');
      assert.equal(TestSubject.isEncode(new Date()), true, 'DateはOK');
      assert.equal(TestSubject.isEncode(null), true, 'nullはOK');
      assert.equal(TestSubject.isEncode(undefined), true, 'undefinedはOK');
      assert.equal(TestSubject.isEncode([]), false, 'arrayはNG, サーバー側へ送る場合はネスとしない');
      assert.equal(TestSubject.isEncode({}), false, 'objectはNG, サーバー側へ送る場合はネスとしない');
      assert.equal(TestSubject.isEncode(function () {
      }), false, 'functionはもってのほか');
    });
  });

  describe('#constructor(state)', () => {
    it('引数で渡された値に更新して、辞書に登録し、新規作成', () => {
      let subject = new TestSubject({
        id  : 666,
        name: 'foo1'
      });

      assert.equal(subject.id, 666);
      assert.equal(subject.state.name, 'foo1');
      assert.equal(TestSubject._instances['666'], subject);
    });
  });

  describe('#update(state)', () => {
    it('更新できる', () => {
      TestSubject.hasOne('foo', Dummy);
      TestSubject.hasMany('foos', Dummy);

      let subject = new TestSubject({id: 888});
      subject.state.foos = {
        '6': new Dummy({id: 6})
      };

      subject.update({
        id  : 888,
        name: 'foo888',
        foo : {
          id  : 4,
          name: 'foo4'
        },
        foos: [
          {id: 5, name: 'foos5'},
          {id: 6, name: 'foos6'}
        ]
      });

      assert.equal(subject.id, 888);
      assert.equal(subject.state.name, 'foo888');
      assert.equal(subject.foo.id, 4, 'ない場合は新規作成 0');
      assert.equal(subject.foo.state.name, 'foo4', 'ない場合は新規作成 1');
      assert.equal(subject.foos[0].id, 5, 'ない場合は新規作成 2');
      assert.equal(subject.foos[0].state.name, 'foos5', 'ない場合は新規作成 3');
      assert.equal(subject.foos[1].id, 6, 'ある場合は更新');
      assert.equal(subject.foos[1].state.name, 'foos6', 'ある場合は更新');
    });
  });

  describe('#destroy(state)', () => {
    it('関連先を削除できる', () => {
      TestSubject.hasOne('foo', Dummy);
      TestSubject.hasMany('foos', Dummy);

      let subject = new TestSubject({
        id  : 8888,
        foo : {
          id: 8889
        },
        foos: [
          {id: 9000},
          {id: 9001},
          {id: 9002}
        ]
      });

      subject.destroy({
        id  : 8888,
        foo : {
          id        : 8889,
          _destroyed: true
        },
        foos: [
          {id: 9000, _destroyed: true},
          {id: 9001, _destroyed: false},
          {id: 9002}
        ]
      });

      assert.notEqual(subject, undefined, '自身を削除することはできない');
      assert.equal(_.keys(subject.foos).length, 2);
      assert.equal(subject.state.foo, undefined);
    });
  });

  describe('#toObject()', () => {
    it('Viewに接続するためのオブジェクトを生成して返す', () => {
      TestSubject.hasOne('foo', Dummy);
      TestSubject.hasMany('foos', Dummy);

      let subject = new TestSubject({
        id  : 8888,
        name: 'subject8888',
        foo : {
          id  : 8889,
          name: 'foo8889'
        },
        foos: [
          {id: 9000, name: 'foo9000'},
          {id: 9001, name: 'foo9001'},
          {id: 9002, name: 'foo9002'}
        ]
      });

      let expected = {
        id  : 8888,
        name: 'subject8888',
        foo : subject.foo,
        foos: subject.foos
      };

      assert.deepEqual(subject.toObject(), expected, '関連先はインスタンスのまま渡す');
    });
  });

  describe('#asJSON()', () => {
    it('API用にシリアライズできるプロパティのみを抽出してオブジェクトとして返す', () => {
      TestSubject.hasOne('foo', Dummy);
      TestSubject.hasMany('foos', Dummy);

      let subject = new TestSubject({
        id  : 8888,
        name: 'subject8888',
        foo : {
          id  : 8889,
          name: 'foo8889',
          arr : []
        },
        foos: [
          {id: 9000, name: 'foo9000', age: null},
          {
            id: 9001, name: 'foo9001', fn: function () {
          }
          },
          {id: 9002, name: 'foo9002', dict: {}}
        ]
      });

      let expected = {
        id  : 8888,
        name: 'subject8888',
        foo : {
          id  : 8889,
          name: 'foo8889'
        },
        foos: [
          {id: 9000, name: 'foo9000', age: null},
          {id: 9001, name: 'foo9001'},
          {id: 9002, name: 'foo9002'}
        ]
      };

      assert.deepEqual(subject.asJSON(), expected);
    });
  });

  describe('#_update_id(v)', () => {
    it('idは整数しか代入できない', () => {
      let subject = new Subject({
        id: 4
      });

      subject._update_id('hoge');

      assert.equal(subject.id, null);
    });
  });

  describe('#get id()', () => {
    it('idはそのまま呼び出して取得可能', () => {
      let subject = new Subject({
        id: 5
      });

      assert.equal(subject.state.id, 5);
      assert.equal(subject.id, 5);
    });
  });
});

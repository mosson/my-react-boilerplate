'use strict';

import assert from 'assert';
import sinon from 'sinon';

import Subject from 'stores/abstract-store';

import Dispatcher from 'dispatcher';
import Constant from 'constants/common/constant';

import BaseModel from 'models/base-model';

class TestSubject extends Subject {

  trigger() {

  }

  hoge() {

  }

  registration() {
    return {
      hoge: this.hoge.bind(this)
    };
  }
}

describe('stores/abstract-store', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  describe('::static getInstance(key)', () => {
    it('keyに応じた新規・既存インスタンスを返す', () => {
      let test1 = TestSubject.getInstance(1);

      assert(test1 instanceof TestSubject, '新規作成');

      let test2 = TestSubject.getInstance(1);

      assert.equal(test1, test2, 'keyが同じ場合は同一オブジェクトを参照');
    });
  });

  describe('constructor(key)', () => {
    it('初期化する', () => {
      sandbox.stub(TestSubject.prototype, 'update');
      sandbox.stub(TestSubject.prototype, 'destroy');
      sandbox.stub(TestSubject.prototype, 'hoge');

      let test1 = TestSubject.getInstance(4);

      assert(test1 instanceof TestSubject, 'newを呼ばずに使う');
      assert.equal(test1.key, 4, '辞書キーを保持している');

      Dispatcher.dispatch({actionType: Constant.ACTIONS.UPDATE});
      assert(test1.update.called, 'しかるべきコールバックが設定される');

      Dispatcher.dispatch({actionType: Constant.ACTIONS.DESTROY});
      assert(test1.destroy.called, 'しかるべきコールバックが設定される');

      Dispatcher.dispatch({actionType: 'hoge'});
      assert(test1.hoge.called, 'registrationをoverrideすることでコールバックを追加できる');

      assert(test1._state instanceof BaseModel, 'proxyにはBaseModelの派生を使う');
    });
  });

  describe('#update(payload)', () => {
    it('proxyのupdateにdataを渡して、更新をViewに通知するためのメソッドを呼ぶ', () => {
      let subject = TestSubject.getInstance(5);

      sandbox.stub(subject._state, 'update');
      sandbox.stub(subject, 'trigger');

      Dispatcher.dispatch({
        actionType: Constant.ACTIONS.UPDATE,
        data      : {
          foo: 'bar'
        }
      });

      assert(subject._state.update.called);
      assert.deepEqual(subject._state.update.lastCall.args[0], {
        foo: 'bar'
      });
      assert(subject.trigger.called);
    });
  });

  describe('#destroy(payload)', () => {
    it('proxyのupdateにdataを渡して、更新をViewに通知するためのメソッドを呼ぶ', () => {
      let subject = TestSubject.getInstance(5);

      sandbox.stub(subject._state, 'destroy');
      sandbox.stub(subject, 'trigger');

      Dispatcher.dispatch({
        actionType: Constant.ACTIONS.DESTROY,
        data      : {
          foo: 'bar'
        }
      });

      assert(subject._state.destroy.called);
      assert.deepEqual(subject._state.destroy.lastCall.args[0], {
        foo: 'bar'
      });
      assert(subject.trigger.called);
    });
  });

  describe('#get state()', () => {
    it('Viewのstateに合致する形にproxyのデータを変更して取得できる', () => {
      let subject = TestSubject.getInstance(10);

      Dispatcher.dispatch({
        actionType: Constant.ACTIONS.UPDATE,
        data      : {
          foo: 'bar'
        }
      });

      assert.deepEqual(subject.state, {
        foo: 'bar'
      });
    });
  });
});

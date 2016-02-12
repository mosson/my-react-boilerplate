'use strict';

import Subject from 'actions/abstract-action';

import Dispatcher from 'dispatcher';
import Constant from 'constants/common/constant';

import sinon from 'sinon';
import assert from 'assert';

describe('actions/abstract-action', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();

    Subject.MessageAPI = {
      error: sandbox.spy()
    };
  });

  afterEach(() => {
    sandbox && sandbox.restore();
  });

  describe('::update(data)', () => {
    it('Dispatcherに更新を通知する', () => {
      sandbox.stub(Dispatcher, 'dispatch');

      Subject.update({foo: 'bar'});

      assert(Dispatcher.dispatch.called);
      assert.deepEqual(Dispatcher.dispatch.lastCall.args[0], {
        actionType: Constant.ACTIONS.UPDATE,
        data      : {foo: 'bar'}
      })
    });
  });

  describe('::destroy(data)', () => {
    it('Dispatcherに削除を通知する', () => {
      sandbox.stub(Dispatcher, 'dispatch');

      Subject.destroy({foo: 'bar'});

      assert(Dispatcher.dispatch.called);
      assert.deepEqual(Dispatcher.dispatch.lastCall.args[0], {
        actionType: Constant.ACTIONS.DESTROY,
        data      : {foo: 'bar'}
      })
    });
  });
});

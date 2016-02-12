'use strict';

import { EventEmitter2 } from 'eventemitter2';
import Dispatcher from 'dispatcher';
import assign from 'object-assign';

import Constant from 'constants/common/constant';

import BaseModel from 'models/base-model';

class AbstractStore extends EventEmitter2 {
  static getInstance(key) {
    key = parseInt(key, 10);
    if (!this.instances) this.instances = {};
    this.instances[key] = this.instances[key] || new this(key);
    return this.instances[key];
  }

  constructor(key) {
    super();

    this.key = key;
    this._state = new BaseModel();

    Dispatcher.register(this.register.bind(this));
  }

  register(payload) {
    let registration = assign({}, this.registration(), {
      [Constant.ACTIONS.UPDATE] : this.update.bind(this),
      [Constant.ACTIONS.DESTROY]: this.destroy.bind(this)
    });

    registration[payload.actionType] && registration[payload.actionType](payload);
  }

  update(payload) {
    this._state.update(payload.data);
    this.trigger();
  }

  destroy(payload) {
    this._state.destroy(payload.data);
    this.trigger();
  }

  registration() {
    return {};
  }

  trigger() {
    throw 'Abstract Method called.';
  }

  get state() {
    return this._state.toObject();
  }
}

export default AbstractStore;

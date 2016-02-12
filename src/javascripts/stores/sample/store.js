'use strict';

import AbstractStore from 'stores/abstract-store';
import BaseModel from 'models/base-model';
import Constant from 'constants/sample/constant';

import Entry from 'models/common/entry';

class Model extends BaseModel {

}

Model.hasMany('entries', Entry);

class Store extends AbstractStore {
  constructor(key) {
    super(key);
    this._state = new Model();
  }

  trigger() {
    this.emit(Constant.EVENT.CHANGED);
  }

  get state() {
    return this._state.toObject();
  }
}

export default Store;

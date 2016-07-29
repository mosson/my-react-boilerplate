'use strict';

import AbstractStore from 'stores/abstract-store';
import BaseModel from 'models/base-model';
import Constant from 'constants/flowtype/constant';

import Count from 'models/flowtype/count';

class Model extends BaseModel {

}

Model.hasOne('count', Count);

class Store extends AbstractStore {
  constructor(key) {
    super(key);
    this._state = new Model({
      count: {
        id: 1
      }
    });
  }

  trigger() {
    this.emit(Constant.EVENT.CHANGED);
  }

  get state() {
    return this._state.toObject();
  }
}

export default Store;

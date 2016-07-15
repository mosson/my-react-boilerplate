'use strict';

/* @flow */
import BaseModel from 'models/base-model';

class Count extends BaseModel {
  get clicks(): number {
    return this.state.clicks || 0;
  }
}

export default Count;

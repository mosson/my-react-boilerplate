'use strict';

import BaseModel from 'models/base-model';

class Entry extends BaseModel {
  get body() {
    return this.state.body;
  }
}

export default Entry;

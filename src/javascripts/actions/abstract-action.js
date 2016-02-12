'use strict';

import _ from 'lodash';
import Promise from 'bluebird';

import Dispatcher from 'dispatcher';

import Constant from 'constants/common/constant';

const global = Function('return this')();

class AbstractAction {
  static update(data) {
    Dispatcher.dispatch({
      actionType: Constant.ACTIONS.UPDATE,
      data      : data
    });
  }

  static destroy(data) {
    Dispatcher.dispatch({
      actionType: Constant.ACTIONS.DESTROY,
      data      : data
    });
  }
}

export default AbstractAction;

'use strict';

import assign from 'object-assign';

import AbstractAction from 'actions/abstract-action';

import EntryAPI from 'actions/common/entry-api';

class Action extends AbstractAction {

}

assign(Action, EntryAPI);

export default Action;

'use strict';

import React from 'react';
import { Component, PropTypes } from 'react';

import assign from 'object-assign';

import Entries from 'components/common/entries';

import Action from 'actions/sample/action';
import Store from 'stores/sample/store';

import Constant from 'constants/sample/constant';

class App extends Component {
  constructor(...props) {
    super(...props);

    this.state = assign({}, this.store.state);
    this.boundStoreHdl = this._storeHdl.bind(this);
  }

  componentDidMount() {
    this.store && this.store.addListener(Constant.EVENT.CHANGED, this.boundStoreHdl);
  }

  componentWillUnmount() {
    this.store && this.store.removeListener(Constant.EVENT.CHANGED, this.boundStoreHdl);
  }

  render() {
    return (
      <div>
        <h1>これはsample</h1>
        <Entries entries={this.state.entries}
                 action={Action}/>
      </div>
    );
  }

  _storeHdl() {
    this.setState(this.store.state);
  }

  get store() {
    this._store = this._store || Store.getInstance();
    return this._store;
  }
}

export default App;

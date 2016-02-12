'use strict';

import React from 'react';
import { Component, PropTypes } from 'react';

import _ from 'lodash';

import Entry from 'models/common/entry';

class Entries extends Component {
  componentDidMount() {
    this.props.action.EntryAPI && this.props.action.EntryAPI.fetch.call(this.props.action);
  }

  render() {
    return (
      <div className="Entries">
        {this._resolveEntries()}
      </div>
    );
  }

  _resolveEntries() {
    return _.map(this.props.entries, entry => {
      return (
        <div className="Entries__Entry"
             key={entry.id}>
          {entry.body}
        </div>
      );
    });
  }
}

Entries.defaultProps = {
  action: function () {
  },
  entries: []
};

Entries.propTypes = {
  action: PropTypes.func,
  entries: PropTypes.arrayOf(PropTypes.instanceOf(Entry))
};

export default Entries;
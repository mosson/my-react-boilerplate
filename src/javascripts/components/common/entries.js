'use strict';

/* @flow */
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
    let entries: Array<Object> = this.props.entries;

    return _.map(entries, (entry: { body: string, id: number }) => {

      let id: number = entry.id;
      let body: string = entry.body;

      return (
        <div className="Entries__Entry"
             key={id}>
          {body}
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

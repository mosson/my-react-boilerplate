'use strict';

/* @flow */
import React from 'react';
import { Component, PropTypes } from 'react';
import Action from 'actions/flowtype/action';
import Count from 'models/flowtype/count';

type Props = {
  count: Object
}

type DefaultProps = {
  count: Object
}

class Counter extends Component {
  render() {
    let clickCount = this.props.count.clicks;

    return (
      <button onClick={this._clickHdl.bind(this, clickCount)}>
        Clicks: {clickCount}
      </button>
    );
  }

  _clickHdl(count: number) {
    Action.update({
      count: {
        clicks: count + 1
      }
    });
  }
}

Counter.defaultProps = {
  count: new Count()
};

Counter.propTypes = {
  count: PropTypes.instanceOf(Count)
};

export default Counter;

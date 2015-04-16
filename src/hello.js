"use strict";

var React = require("react");
var Promise = require("bluebird");
var request = require("superagent");

module.exports = React.createClass({
  render: function () {
    return (
      <h1>Hello, {this.props.name}!!</h1>
    );
  }
});
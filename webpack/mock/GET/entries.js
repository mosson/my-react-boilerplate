'use strict';

const _ = require('lodash');

module.exports = function (res, req) {
  res.setHeader("Content-Type", "application/json");

  return _.map(_.range(10), (i) => {
    return {
      id  : i + 1,
      body: `テスト${i + 1}`
    }
  });
};

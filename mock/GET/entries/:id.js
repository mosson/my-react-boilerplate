'use strict';

module.exports = function (res, req) {
  res.setHeader("Content-Type", "application/json");

  let entry = {
    // パスを変数名に割り当てて参照することが可能
    id  : req.params.id,
    body: 'テスト'
  };

  return entry;
};

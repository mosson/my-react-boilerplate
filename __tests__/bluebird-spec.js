var Promise = require('bluebird');
var request = require('superagent');
require('superagent-mock')(
  request,
  [
    {
      pattern : '/success',
      fixtures: function () {
        return 0;
      },
      callback: function (match, data) {
        return {
          status: data
        };
      }
    },
    {
      pattern : '/error',
      fixtures: function () {
        return 1;
      },
      callback: function (match, data) {
        return {
          status: data
        };
      }
    }
  ]
);

describe('Bluebird spec', function () {
  function sampleRequest(url) {
    return new Promise(function (resolve, reject) {
      request.get(url).end(function (err, res) {
        if (res.status == 0) {
          resolve('success');
        } else {
          reject('error');
        }
      })
    });
  }

  pit('success', function () {
    return sampleRequest('/success').then(
      function(){ expect(1).toBe(1); },
      function(){ expect(1).toBe(0); }
    );
  });

  pit('error', function () {
    return sampleRequest('/error').then(
      function(){ expect(1).toBe(0); },
      function(){ expect(1).toBe(1); }
    );
  });
});

describe('非同期テストとステータス', function () {
  it('ステータスを取得できる', function () {
    var promise = new Promise(
      function (resolve, reject) {
        //resolve(1);
      }
    );

    expect(promise.isPending()).toEqual(true);
    expect(promise.isFulfilled()).toEqual(false);
    expect(promise.isRejected()).toEqual(false);
  });
});
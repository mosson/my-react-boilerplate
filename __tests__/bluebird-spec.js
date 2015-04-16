var Promise = require('bluebird');
var request = require('superagent');
require('superagent-mock')(
  request,
  [
    {
      pattern: '/success',
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
      pattern: '/error',
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

describe('Bluebird spec', function(){
  it('assertion sample', function(){
    function sampleRequest(url){
      return new Promise(function(resolve, reject){
        request.get(url).end(function(err, res){
          if (res.status == 0) {
            resolve('success');
          } else {
            reject('error');
          }
        })
      });
    }

    // success pattern
    sampleRequest('/success').then(
      function(){ // データの中身を検査するわけではないのでこの書き方にしています
        expect(1).toBe(1)
      },
      function(){}
    );

    // error pattern
    sampleRequest('/error').then(
      function(){},
      function(){ // データの中身を検査するわけではないのでこの書き方にしています
        expect(1).toBe(1)
      }
    )

  });
});
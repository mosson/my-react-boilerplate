var request = require('superagent');
require('superagent-mock')(
  request,
  [
    {
      pattern : '/success',
      fixtures: function () {
        return 'success!';
      },
      callback: function (match, data) {
        return {
          body: data
        };
      }
    },
    {
      pattern : '/error',
      fixtures: function () {
        return 'Error!';
      },
      callback: function (match, data) {
        return {
          body: data
        };
      }
    }
  ]
);

describe('superagentのテストの仕方', function () {
  it("リクエストがモックされているかどうか", function () {
    request.get("/success").end(function (err, res) {
      expect(res).toEqual({body: 'success!'});
    });

    request.get("/error").end(function (err, res) {
      expect(res).toEqual({body: 'Error!'});
    });
  });
});

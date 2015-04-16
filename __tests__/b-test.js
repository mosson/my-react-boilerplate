jest.dontMock("../src/b");

// jestでは読み込まれた先のモジュールまでもがモックオブジェクトとなる
jest.dontMock("../src/a");

describe("b", function () {
  var b = require('../src/b');

  it('renders successfully', function () {
    expect(1).toBe(1);
  });
});

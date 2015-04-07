jest.dontMock("../src/hello");

var React = require('react/addons');

describe("Hello", function() {
  var Hello = require('../src/hello');

  beforeEach(function() {
    Hello = React.addons.TestUtils.renderIntoDocument(<Hello name="mosson" />);
  });

  it('renders successfully', function(){
    expect(Hello.getDOMNode().textContent).toEqual('Hello, mosson!!');
  });
});

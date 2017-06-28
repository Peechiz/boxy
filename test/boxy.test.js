var chai = require('chai')
  , expect = chai.expect;

var box = require('../boxy.js');

describe('renderLine', function() {

  it('should render the top', function() {
    expect(box.renderLine(5,'single', 'top')).to.equal('┌───┐');
  });

});

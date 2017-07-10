var chai = require('chai')
  , expect = chai.expect;

var box = require('../boxy.js');



describe('renderLine', function() {
  describe('single', function(){
    it('should render the top', function() {
      expect(box.renderLine(5,'single', 'top')).to.equal('┌───┐');
    });
    it('should render the middle', function() {
      expect(box.renderLine(5,'single', 'middle')).to.equal('├───┤');
    });
    it('should render the bottom', function() {
      expect(box.renderLine(5,'single', 'bottom')).to.equal('└───┘');
    });
  })

  describe('double', function(){
    it('should render the top', function() {
      expect(box.renderLine(5,'double', 'top')).to.equal('╔═══╗');
    });
    it('should render the middle', function() {
      expect(box.renderLine(5,'double', 'middle')).to.equal('╠═══╣');
    });
    it('should render the bottom', function() {
      expect(box.renderLine(5,'double', 'bottom')).to.equal('╚═══╝');
    });
  })
});



describe('renderContent', function(){
  describe('single', function(){
    it('should render an array', function(){
      expect(box.renderContent(['Text', 'Other text'], 'single')).to.equal('│Text│Other text│');
    })
  })

  describe('double', function(){
    it('should render an array', function(){
      expect(box.renderContent(['Text', 'Other text'], 'double')).to.equal('║Text║Other text║');
    })
  })
})


// figure out how wide to make the table
describe('get width', function(){
  it('should determine the table width', function(){
    expect(box.getWidth(
      [
        ['bob'],
        ['jimmy']
      ]
    ,0)).to.equal(5)

    expect(box.getWidth(
      [
        ['John Doe'],
        ['Role', 'Software Engineer'],
        ['Austin, Texas']
      ], 6)).to.equal(34)

    expect(box.getWidth(
      [
        ['Sam'],
        ['Just a guy with a brick and a dream'],
        ['Mason', 'Yardwork', 'Roofing']
      ], 6)).to.equal(41)
  })
})

describe('pad', function(){
  it('should pad each column in the table', function(){
    expect(box.pad(
      [
        ['John Doe'],
        ['Role', 'Software Engineer'],
        ['Austin, Texas']
      ], 1, 5)
    ).to.deep.equal(
      [
        [' John Doe     '],
        [' Role     ', ' Software Engineer     '],
        [' Austin, Texas     ']
      ]
    )
  })
})


describe('normal', function(){
  it('should add additional necessary padding', function(){

    expect(box.normal(
      [
        ['bob'],
        ['jimmy']
      ]
    )).to.deep.equal(
      [
        ['bob  '],
        ['jimmy']
      ]
    )

    /*
      │bob│sam│chad|
      │jimmy       │
    */

    expect(box.normal(
      [
        ['bob','sam','chad'],
        ['jimmy']
      ]
    )).to.deep.equal(
      [
        ['bob','sam','chad'],
        ['jimmy       ']
      ]
    )

  })
})

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


describe('pad', function(){
  it('should pad an array', function(){
    /*                                         total: 33
      │ John Doe                         │ char 8, r25 l1
      │ Role     │ Software Engineer     │ inner: 34 (1 spacer)
      │ Austin, Texas                    │ char 13, r20 l1

      inner / 2 cols = +17 per col -> 34%17 === 0
      inner / 3 cols = +11 -> 34%11 === 1

    */
    expect(box.pad(
      [
        ['John Doe'],
        ['Role', 'Software Engineer'],
        ['Austin, Texas']
      ]
    ))
    .to.deep.equal(
    [
      [' John Doe                         '],
      [' Role     ', ' Software Engineer     '],
      [' Austin, Texas                    ']
    ]);

/*
    │ Sam                                     │
    │ Just a guy with a brick and a dream     │
    │ Mason     │ Yardwork     │ Roofing      │
*/
    expect(box.pad(
      [
        ['Sam'],
        ['Just a guy with a brick and a dream'],
        ['Mason', 'Yardwork', 'Roofing']
      ]
    )).to.deep.equal(
      [
        [' Sam                                     '],
        [' Just a guy with a brick and a dream     '],
        [' Mason     ', ' Yardwork     ', ' Roofing      ']
      ]
    )
  })
})

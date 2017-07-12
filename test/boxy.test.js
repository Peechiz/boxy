var chai = require('chai'),
  expect = chai.expect;

var box = require('../boxy.js');



describe('renderLine', function() {
  describe('single', function() {
    it('should render the top', function() {
      expect(box.renderLine(3, 'single', 'top')).to.equal('┌───┐');
    });
    it('should render the middle', function() {
      expect(box.renderLine(3, 'single', 'middle')).to.equal('├───┤');
    });
    it('should render the bottom', function() {
      expect(box.renderLine(3, 'single', 'bottom')).to.equal('└───┘');
    });
  })

  describe('double', function() {
    it('should render the top', function() {
      expect(box.renderLine(3, 'double', 'top')).to.equal('╔═══╗');
    });
    it('should render the middle', function() {
      expect(box.renderLine(3, 'double', 'middle')).to.equal('╠═══╣');
    });
    it('should render the bottom', function() {
      expect(box.renderLine(3, 'double', 'bottom')).to.equal('╚═══╝');
    });
  })
});



describe('renderContent', function() {
  describe('single', function() {
    it('should render an array', function() {
      expect(box.renderContent(['Text', 'Other text'], 'single')).to.equal('│Text│Other text│');
    })
  })

  describe('double', function() {
    it('should render an array', function() {
      expect(box.renderContent(['Text', 'Other text'], 'double')).to.equal('║Text║Other text║');
    })
  })
})

describe('content preparation:', function() {

  describe('get inner width', function() {
    it('should determine the inner table width', function() {
      expect(box.getInnerWidth(
        [
          ['bob'],
          ['jimmy']
        ], 0)).to.equal(5)

      expect(box.getInnerWidth(
        [
          ['John Doe'],
          ['Role', 'Software Engineer'],
          ['Austin, Texas']
        ], 6)).to.equal(34)

    /*
      | Sam                                          |
      | Just a guy with a brick and a dream          |
      | Mason       | Yardwork       | Roofing       |
    */

      expect(box.getInnerWidth(
        [
          ['Sam'],
          ['Just a guy with a brick and a dream'],
          ['Mason', 'Yardwork', 'Roofing']
        ], 6)).to.equal(46)

    /*
      | Sam                                     |
      | Just a guy with a brick and a dream     |
      | Mason     | Yardwork     | Roofing      |
    */

      expect(box.getInnerWidth(
        [
          ['Sam'],
          ['Just a guy with a brick and a dream'],
          ['Mason', 'Yardwork', 'Roofing']
        ], 6)).to.equal(41)
    })
  })

  describe('pad', function() {
    it('should pad each column in the table', function() {

      let options = {
        leftPad: 1,
        rightPad: 5,
        padlvl: 6
      }

      expect(box.pad(
        [
          ['John Doe'],
          ['Role', 'Software Engineer'],
          ['Austin, Texas']
        ], options)).to.deep.equal(
        [
          [' John Doe     '],
          [' Role     ', ' Software Engineer     '],
          [' Austin, Texas     ']
        ]
      )
      expect(box.pad(
        [
          ['bob'],
          ['jimmy'],
        ], options)).to.deep.equal(
        [
          [' bob     '],
          [' jimmy     '],
        ]
      )
    })
  })


  describe('normal', function() {
    it('should add additional necessary padding', function() {

      let options = {
        leftPad: 0,
        rightPad: 0,
        padlvl: 0
      }

      expect(box.normal(
        [
          ['bob'],
          ['jimmy']
        ], options
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
          ['bob', 'sam', 'chad'],
          ['jimmy']
        ], options
      )).to.deep.equal(
        [
          ['bob', 'sam', 'chad'],
          ['jimmy       ']
        ]
      )

      /*
        |John Doe              |
        |Role|Software Engineer|
        |Austin, Texas         |
      */

      expect(box.normal(
        [
          ['John Doe'],
          ['Role', 'Software Engineer'],
          ['Austin, Texas']
        ], 0
      )).to.deep.equal(
        [
          ['John Doe              '],
          ['Role','Software Engineer'],
          ['Austin, Texas         ']
        ]
      )

    })
  })

  describe('prep', function() {

    let arr1 = [
      ['bob'],
      ['jimmy']
    ]

    let arr2 = [
      ['jon'],
      ['steven']
    ]

    let options = {
      leftPad: 2,
      rightPad: 2,
      padlvl: 4
    }

    let options2 = {
      leftPad: 1,
      rightPad: 5,
      padlvl: 6
    }

    it('should pad and normalize', function() {
      expect(box.prepare(arr1, options)).to.deep.equal(
        [
          ['  bob    '],
          ['  jimmy  ']
        ]
      )
      expect(box.prepare(arr1, options2)).to.deep.equal(
        [
          [' jon       '],
          [' steven    ']
        ]
      )

    })
  })

})

/*

  usage:

  boxy(str/arr, {options}) => unicode box or table

  *        0123456789abcdef | │╎┆┊╵╷╽ ─ ╴╶ ╼ ╌ ┄ ┈ | Common elements:
  * U+250x ─━│┃┄┅┆┇┈┉┊┋┌┍┎┏ | ┃╏┇┋╹╻╿ ━ ╸╺ ╾ ╍ ┅ ┉ |
  * U+251x ┐┑┒┓└┕┖┗┘┙┚┛├┝┞┟ | ┌┍┎┏ ┐┑┒┓ ├┤┝┥ ┼╋┿╂  | ┌┬┐┏┳┓╔╦╗┍┯┑╒╤╕┎┰┒╓╥╖
  * U+252x ┠┡┢┣┤┥┦┧┨┩┪┫┬┭┮┯ | └┕┖┗ ┘┙┚┛ ┟┧┢┪ ┽╀┾╁  | ├┼┤┣╋┫╠╬╣┝┿┥╞╪╡┠╂┨╟╫╢
  * U+253x ┰┱┲┳┴┵┶┷┸┹┺┻┼┽┾┿ | ┬┮┯┭ ┰┲┳┱ ┠┨┣┫ ╊╈╉╇  | └┴┘┗┻┛╚╩╝┕┷┙╘╧╛┖┸┚╙╨╜
  * U+254x ╀╁╂╃╄╅╆╇╈╉╊╋╌╍╎╏ | ┴┶┷┵ ┸┺┻┹ ┞┦┡┩ ╃╄╆╅  | ─│ ━┃ ═║
  * U+255x ═║╒╓╔╕╖╗╘╙╚╛╜╝╞╟ | ╔╦╗╒╤╕╓╥╖            |
  * U+256x ╠╡╢╣╤╥╦╧╨╩╪╫╬╭╮╯ | ╠╬╣╞╪╡╟╫╢ ═ ║ ╱╳╲ ╭╮ |
  * U+257x ╰╱╲╳╴╵╶╷╸╹╺╻╼╽╾╿ | ╚╩╝╘╧╛╙╨╜         ╰╯ |
  *

*/

let box = function(input, options){

  if ( typeof input === 'string' ){
    return handleString( input, options );
  } else if ( Array.isArray(input) === true ) {
    return handleArray( input, options );
  }

}

box.styles = {
  "single" : {
    vr: '│', // vertial rule
    hr: '─', // horizontal rule
    ul: '┌', // upper-left
    ur: '┐', // upper-right
    ll: '└', // lower-left
    lr: '┘'  // lower-right
  },
  "double" : {
    vr: '║',
    hr: '═',
    ul: '╔',
    ur: '╗',
    ll: '╚',
    lr: '╝'
  },
  "single-round" : {
    ul: '',
    ur: '',
    ll: '',
    lr: ''
  },
  "double-round" : {
    ul: '',
    ur: '',
    ll: '',
    lr: ''
  }
}

let defaults = {
  outside: 'single',
  rightPad: 5,
}



function handleString( input, options ) {

}

box.renderLine = function( length, style, type ) {
  style = box.styles[style];

  switch (type) {
    case 'top':
      return style.ul + style.hr.repeat(length-2) + style.ur;
    case 'middle':
      return ''
    default:
      return '';
  }
}

module.exports = box;

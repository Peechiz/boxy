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

let box = function(input, options) {

  // if (typeof input === 'string') {
  //   return handleString(input, options);
  // } else if (Array.isArray(input) === true) {
  //   return handleArray(input, options);
  // }

}

box.styles = {
  "single": {
    vr: '│', // vertial rule
    hr: '─', // horizontal rule
    ul: '┌', // upper-left
    ur: '┐', // upper-right
    ll: '└', // lower-left
    lr: '┘', // lower-right
    ml: '├', // middle-left
    mr: '┤', // middle-right
  },
  "double": {
    vr: '║',
    hr: '═',
    ul: '╔',
    ur: '╗',
    ll: '╚',
    lr: '╝',
    ml: '╠',
    mr: '╣'
  },
}

box.defaults = {
  outside: 'single',
  rightPad: 5,
  leftPad: 1,
  padAllColumns: true
}


box.renderLine = function(length, style, type) {
  style = box.styles[style];
  let inner = style.hr.repeat(length - 2);

  switch (type) {
    case 'top':
      return style.ul + inner + style.ur;
    case 'middle':
      return style.ml + inner + style.mr;
    case 'bottom':
      return style.ll + inner + style.lr;
    default:
      return '';
  }
}

box.renderContent = function(arr, style) {
  style = box.styles[style];

  return arr.reduce((str, item, index) => {
    str = str + `${item}${style.vr}`;
    return str;
  }, style.vr)
}

// padlvl === left pad + right pad
box.getWidth = function(arr, padlvl) {

  let width = arr.reduce((target, row) => {
    let len = size(row); // number of characters
    let spacers = row.length - 1;
    let paddedLength = len + spacers + (padlvl * row.length)
    if (paddedLength > target) {
      target = paddedLength;
    }

    return target

  }, 0)

  return width;
}

function size(arr) {
  return arr.reduce((num, item) => {
    return num + item.length
  }, 0);
}

box.pad = function(arr, left, right) {
  leftpad = ' '.repeat(left)
  rightpad = ' '.repeat(right)
  return arr.map(row => {
    return row.map(col => leftpad + col + rightpad)
  })
}

box.normal = function(arr) {
  padlvl = (arr[0][0].match(/\s/g) || []).length
  let width = box.getWidth(arr, padlvl);

  function crawlArray(array, index, n) {
    return ((index + n) % array.length + array.length) % array.length;
  }

  return arr.map(row => {
    let spacers = row.length - 1;
    let extra = width - size(row) - spacers;
    if (extra){
      let i = row.length - 1;
      while (extra > 0) {
        row[i] += ' ';
        extra--;
        i = crawlArray(row, i, -1);
      }
    }

    return row;
  })
}





module.exports = box;

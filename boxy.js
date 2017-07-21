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

  if (typeof input === 'string') {
    return handleString(input, options);
  } else if (Array.isArray(input) === true) {
    return handleArray(input, options);
  }

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
  style: 'single',
  rightPad: 5,
  leftPad: 1,
  padAllColumns: true
}

let handleArray = function(arr, options = box.defaults){

  Object.keys(box.defaults).forEach(key => {
    options[key] = options[key] || box.defaults[key]
  })

  options.padlvl = options.leftPad + options.rightPad;

  options.width = box.getInnerWidth(arr, options.padlvl);

  // prepare content
  arr = box.prepare(arr, options);


  arr = arr.map(row => {
    return box.renderContent(row, options.style)
  })

  // build
  let boxed = [];

  boxed.push( box.renderLine(options.width, options.style, 'top') );

  for (var i = 0; i < arr.length; i++) {
    boxed.push(arr[i]);
    boxed.push( box.renderLine(options.width, options.style, 'middle' ) );
  }

  boxed[boxed.length-1] = box.renderLine(options.width, options.style, 'bottom');

  return box.buildString(boxed);
}






box.buildString = function(arr){
  return arr.reduce((str,row)=>{
    str += row + '\n'
    return str
  },'')
}

box.renderLine = function(width, style, type) {
  style = box.styles[style];
  let inner = style.hr.repeat(width);

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

  return arr.reduce((str, row) => {
    str = str + `${row}${style.vr}`;
    return str;
  }, style.vr)
}

// padlvl === left pad + right pad
box.getInnerWidth = function(arr, padlvl) {

  return arr.reduce((target, row) => {
    let len = size(row); // number of characters
    let spacers = row.length - 1;
    let paddedLength = len + spacers + (padlvl * row.length)
    if (paddedLength > target) {
      target = paddedLength;
    }

    return target

  }, 0)
}

function size(arr) {
  return arr.reduce((num, item) => {
    return num + item.length
  }, 0);
}

box.prepare = function(arr, options){
  // pad
  arr = box.pad(arr, options)

  // normalize
  arr = box.normal(arr, options);

  return arr;
}

box.pad = function(arr, options) {
  const leftpad = ' '.repeat(options.leftPad);
  const rightpad = ' '.repeat(options.rightPad);
  return arr.map(row => {
    return row.map(col => leftpad + col + rightpad)
  })
}

box.normal = function(arr) {

  // at this point we don't care about padding
  // and also, we don't want to have to pass options to
  // the normalization function because why
  // would we ever need to do that
  let width = arr.reduce((longest,row)=>{
    let rowlen = size(row);
    let spacers = row.length - 1;

    if ((rowlen + spacers)  > longest){
      longest = rowlen + spacers;
    }
    return longest;
  },0)

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

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
    lr: '┘', // lower-right
    ml: '├', // middle-left
    mr: '┤', // middle-right
  },
  "double" : {
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



function handleString( input, options ) {

}

box.renderLine = function( length, style, type ) {
  style = box.styles[style];
  let inner = style.hr.repeat(length-2);

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

box.renderContent = function(arr, style){
  style = box.styles[style];

  return arr.reduce( (str, item, index)=>{
      str = str + `${item}${style.vr}`;
      return str;
    }, style.vr)
}


box.pad = function(arr, left, right) {
  left = left || box.defaults.leftPad
  right = right || box.defaults.rightPad

  let padlvl = left + right
  let padmap = box.padmap(arr, padlvl);
  let max = padmap.max;

  arr = arr.map((row, index)=>{
    if (index !== max.index){
      let spacers = row.length - 1;
      let rowsize = Math.floor((max.inner-spacers) / row.length);
      console.log('ROWSIZE:',rowsize);

      // divvy out necessary whitespace
      row = row.map(col => {
        let rightpad = ' '.repeat(rowsize - col.length - left);
        let leftpad = ' '.repeat(left);
        console.log(col)
        console.log('\t'+rightpad.length)
        console.log('\t'+rightpad.length)
        console.log('\t'+rightpad.length)
        , leftpad.length, col.length);
        return leftpad + col + rightpad;
      })
      console.log();

      // add remainder
      let i = row.length - 1;
      let remainder = max.inner - size(row);

      while (remainder > 0){
        row[i] += ' ';
        i--;
        remainder--;
      }

      return row;

    } else {
      // if biggest row, just add left and right
      return row.map(col => {
        let leftpad  = ' '.repeat(left);
        let rightpad  = ' '.repeat(right);
        return leftpad + col + rightpad
      })
    }
  })
  return arr;

}

box.padmap = function(arr, padlvl){

  let padmap = arr.reduce((out, item) => {
    let len = size(item);

    out.push({
      cols: item.length, // number of columns in row
      len  // total non-whitespace characters
    })
    return out
  },[])


  let max = padmap.reduce((out,row,index) => {
    let spacers = row.cols - 1
    let paddedLength = row.len + (padlvl * row.cols) + spacers;
    if (paddedLength > out.inner){
      out.inner = paddedLength;
      out.charLen = row.len;
      out.index = index;
    }
    return out;
  },{
    index: null, // location of biggest row
    inner: 0, // padded length of that row with spacers
    charLen: 0 // number of non-whitespace characters in row
  })

  return {
    map: padmap,
    max
  }
}

function size(arr){
  return arr.reduce((num,item) => {
     return num + item.length
   },0);
}




module.exports = box;

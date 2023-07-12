export const isEmpty = (obj) => {
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) return false;
  }
  return true;
};

export const handleBeforeUnload = () => {
  window.scrollTo(0, 0);
  console.log("before unload");
};

/*
  export function convertUnicode(input) {
    return input.replace(/\\u(\w\w\w\w)/g,function(a,b) {
      var charcode = parseInt(b,16);
      return String.fromCharCode(charcode);
    });
  }
*/

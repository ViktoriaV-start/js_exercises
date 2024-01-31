// Реализовать функцию конвертации JSON в строку

'use script';

const products = [
  {
    "id_product": 1,
    "product_name": "MANGO PEOPLE Linen Shorts",
    "size": "L",
    "color": "Red",
    "price": 52
  },
  {
    "id_product": 2,
    "product_name": "MANGO PEOPLE Linen Pants",
    "size": "L",
    "color": "Beige",
    "price": 52
  }
];

const user = {
  "name": "Alex",
  "age": 25,
  "isAdmin": true
};

/**
 * Перевести из JSON в строку
 * @param {string} value
 * @return {string}
 */
function toStringFromJson(value) {
console.log(value)
  if (value && value[0] === '[' || value[0] === '{') {
    return 'Object';
  }

  return String(value);

}


console.log(toStringFromJson(JSON.stringify(products)));
console.log(toStringFromJson(JSON.stringify(user)));
console.log(toStringFromJson(JSON.stringify(123)));
console.log(toStringFromJson(JSON.stringify(true)));
console.log(toStringFromJson(JSON.stringify(null)));
console.log(toStringFromJson(JSON.stringify('abc')));


// ПОЛИФИЛ ДЛЯ JSON.parse From https://github.com/douglascrockford/JSON-js/blob/master/json2.js
  var rx_one = /^[\],:{}\s]*$/;
  var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
  var rx_three = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
  var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
  var rx_dangerous = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
  
  function parsing(text, reviver) {
    

      // The parse method takes a text and an optional reviver function, and returns
      // a JavaScript value if the text is a valid JSON text.

      var j;

      function walk(holder, key) {

          // The walk method is used to recursively walk the resulting structure so
          // that modifications can be made.

          var k;
          var v;
          var value = holder[key];
          if (value && typeof value === "object") {
              for (k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                      v = walk(value, k);
                      if (v !== undefined) {
                          value[k] = v;
                      } else {
                          delete value[k];
                      }
                  }
              }
          }
          return reviver.call(holder, key, value);
      }


      // Parsing happens in four stages. In the first stage, we replace certain
      // Unicode characters with escape sequences. JavaScript handles many characters
      // incorrectly, either silently deleting them, or treating them as line endings.

      text = String(text);
      rx_dangerous.lastIndex = 0;
      if (rx_dangerous.test(text)) {
          text = text.replace(rx_dangerous, function(a) {
              return (
                  "\\u" +
                  ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
              );
          });
      }

      // In the second stage, we run the text against regular expressions that look
      // for non-JSON patterns. We are especially concerned with "()" and "new"
      // because they can cause invocation, and "=" because it can cause mutation.
      // But just to be safe, we want to reject all unexpected forms.

      // We split the second stage into 4 regexp operations in order to work around
      // crippling inefficiencies in IE's and Safari's regexp engines. First we
      // replace the JSON backslash pairs with "@" (a non-JSON character). Second, we
      // replace all simple value tokens with "]" characters. Third, we delete all
      // open brackets that follow a colon or comma or that begin the text. Finally,
      // we look to see that the remaining characters are only whitespace or "]" or
      // "," or ":" or "{" or "}". If that is so, then the text is safe for eval.

      if (
          rx_one.test(
              text
              .replace(rx_two, "@")
              .replace(rx_three, "]")
              .replace(rx_four, "")
          )
      ) {

          // In the third stage we use the eval function to compile the text into a
          // JavaScript structure. The "{" operator is subject to a syntactic ambiguity
          // in JavaScript: it can begin a block or an object literal. We wrap the text
          // in parens to eliminate the ambiguity.

          j = eval("(" + text + ")");

          // In the optional fourth stage, we recursively walk the new structure, passing
          // each name/value pair to a reviver function for possible transformation.

          return (typeof reviver === "function") ?
              walk({
                  "": j
              }, "") :
              j;
      }

      // If the text is not JSON parseable, then a SyntaxError is thrown.

      throw new SyntaxError("JSON.parse");
  };


console.log(parsing(JSON.stringify(products)));
console.log(parsing(JSON.stringify(user)));
console.log(parsing(JSON.stringify(123)));
console.log(parsing(JSON.stringify(true)));
console.log(parsing(JSON.stringify(null)));
console.log(parsing(JSON.stringify('abc')));

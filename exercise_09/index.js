// Реализовать функцию конвертации JSON в строку

'use script';

const products = `[
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
]`;

const user = `{
  "name": "Alex",
  "age": 25,
  "isAdmin": true
}`;

/**
 * Перевести из JSON в строку
 * @param {string} value
 * @return {string}
 */
function toStringFromJson(value) {

  if (value && value[0] === '[' || value[0] === '{') {
    return 'Object';
  }

  return value.toString();

}


console.log(toStringFromJson(products));
console.log(toStringFromJson(user));
console.log(toStringFromJson(JSON.stringify(123)));
console.log(toStringFromJson(JSON.stringify(true)));
console.log(toStringFromJson(JSON.stringify(null)));
console.log(toStringFromJson(JSON.stringify('abc')));

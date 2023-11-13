// Реализовать функцию конвертации строки в JSON со всеми необходимыми проверками и валидациями.

'use script';

var sym2 = Symbol("some");

const obj = {
  name: 'Alex',
  surname: 'Li',
  inn: 1457896, 
  getNumber: () => { return 123 }, 
  [sym2]: 123,
}

/**
 * Перевести в формат JSON
 * @param {any} x
 * @return {string}
 */
function toJson(x) {

  if (x === undefined) return undefined;
  if (x == null) return null;
  if (typeof x == 'function') return;
  if (typeof x == 'symbol') return;

  if (Array.isArray(x)) {
    if (!x.length) return '[]';
    let result = x.reduce((acc, el) => {
      return [...acc, toJson(el)];
    }, []);
    return '[' + result.join() + ']';
  }

  if ( (typeof x) === 'boolean' || (typeof x) === 'number') {
    return `${x}`;
  }

  if ((typeof x) === 'string') {
    return '"' + x + '"';
  }

  if (typeof x === 'object') {
    if (!Object.keys(x).length) {
      return '{}'
    } else {

      let result = [];

      for (let key in x) {
        if (toJson(x[key])) {
          result.push(toJson(key) + ':' + toJson(x[key]));
        }
      }
      return '{' + result.join() + '}';
    };
  }
}


console.log(JSON.stringify([1,2,3]), typeof JSON.stringify([1,2,3]))
console.log(toJson([1,2,3]), typeof toJson([1,2,3]));

console.log(JSON.stringify([]), typeof JSON.stringify([]))
console.log(toJson([]), typeof toJson([]));

console.log(JSON.stringify([1, "false", false]), typeof JSON.stringify([1, "false", false]));
console.log(toJson([1, "false", false]), typeof toJson([1, "false", false]));


console.log(JSON.stringify(555), typeof JSON.stringify(555));
console.log(toJson(555), typeof toJson(555));

console.log(JSON.stringify(true), typeof JSON.stringify(true));
console.log(toJson(true), typeof toJson(true));

console.log(JSON.stringify('abc'), typeof JSON.stringify('foo'));
console.log(toJson('abc'), typeof toJson('abc'));

console.log(JSON.stringify(undefined));
console.log(toJson(undefined));

console.log(JSON.stringify(null));
console.log(toJson(null));

console.log(JSON.stringify({}), typeof JSON.stringify({}));
console.log(toJson({}), typeof toJson({}));


console.log(JSON.stringify(obj));
console.log(toJson(obj))


const products = [
  {
    "id_product": 8,
    "product_name": "MANGO PEOPLE Linen Shorts",
    "size": "L",
    "color": "Red",
    "price": 52
  },
  {
    "id_product": 7,
    "product_name": "MANGO PEOPLE Linen Pants",
    "size": "L",
    "color": "Beige",
    "price": 52
  },
  {
    "id_product": 6,
    "product_name": "MANGO PEOPLE Linen Blazer",
    "size": "XL",
    "color": "Grey",
    "price": 52
  }
];

console.log(JSON.stringify(products));
console.log(toJson(products));

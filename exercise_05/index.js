//Разработайте функцию преобразования JSON в связный список.
//На входе функция должна получать JSON, содержащий список объектов,
// на выходе объект, представляющий из себя односвязный список.

'use strict';

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
  },
  {
    "id_product": 3,
    "product_name": "MANGO PEOPLE Linen Blazer",
    "size": "XL",
    "color": "Grey",
    "price": 52
  },
  {
    "id_product": 4,
    "product_name": "MANGO PEOPLE Top",
    "size": "M",
    "color": "Pink",
    "price": 75
  }
]`;

/**
 * Перевести JSON объект в связанный список
 * @param {object} value
 * @return {object}
 */
function jsonToList(value) {
  const data = JSON.parse(value);

  let result = {};
  let head = null;
  let tail = null;

//------------------ПЕРВЫЙ ВАРИАНТ ЦИКЛА
  let i = 0;

  while (true) {
    if (!data[i]) {
      break;
    }
    if (!head) {
      result.value = data[i];
      result.next = data[i+1] ? {value: data[i+1]} : null;
      head = result.value;
      tail = result.next;
      i++;
      continue;
   }
    if (!data[i+1]) {
      tail.next = null;
      break;
    }
    tail.next = {value: data[i+1]};
    tail = tail.next;
    i++;
  }

  return result;

//----------------- ВТОРОЙ ВАРИАНТ ЦИКЛА

// const length = data.length;

// for (let i = 0; i < length; i++) {
//   if (!data[i]) {
//     break;
//  }
//   if (!head) {
//     result.value = data[i];
//     result.next = data[i+1] ? {value: data[i+1]} : null;
//     head = result.value;
//     tail = result.next;
//     continue;
//   }
//   if (!data[i+1]) {
//     tail.next = null;
//     break;
//   }
//   tail.next = {value: data[i+1]};
//   tail = tail.next;
// }

}

console.log(jsonToList(products));
console.log(jsonToList('[]'));
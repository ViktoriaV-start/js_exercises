//Задача о палиндроме: Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).

'use strict';

/**
 * @param {number | string} value
 * @return {boolean | string}
 */

const isPalindrome = function(value) {

  if ((typeof value) !== 'string' && (typeof value) !== 'number') {
    return "Введенное значение не является ни строкой, ни числом";
  }

  let str = value.toString().replace(/ /g, '');
  let reverseStr = str.split('').reverse().join('');
    if (str === reverseStr) {
      return true;
    }
    return false;
};


//------------------ ВТОРОЙ ВАРИАНТ

// const isPalindrome = function(value) {

//   if ((typeof value) !== 'string' && (typeof value) !== 'number') {
//     return "Введенное значение не является ни строкой, ни числом";
//   }

//   let result = true;

//   let str = value.toString().replace(/ /g, '');
//   let length = str.length;

//   for (let i = 0; i < length/2; i++) {
//     if (str[i] !== str[length - i - 1]) {
//       result = false;
//       break;
//     }
//   }

//     return result;
// };

console.log(isPalindrome(123321));
console.log(isPalindrome('аргентина манит негра'));
console.log(isPalindrome([1, 2, 3]));
console.log(isPalindrome('аргентина'));
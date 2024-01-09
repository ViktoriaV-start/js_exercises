//Задача о палиндроме: Палиндром — это строка, которая читается одинаково в обоих направлениях (например, «аргентина манит негра»).

'use strict';

/**
 * @param {number | string} value
 * @return {boolean | string}
 */

//------------------ ПЕРВЫЙ ВАРИАНТ БЕЗ ЗНАКОВ ПРЕПИНАНИЯ

// const isPalindrome = function(value) {

//   if ((typeof value) !== 'string' && (typeof value) !== 'number') {
//     return "Введенное значение не является ни строкой, ни числом";
//   }

//   let str = value.toString().toLowerCase().replace(/ /g, '');
//   let reverseStr = str.split('').reverse().join('');
//     if (str === reverseStr) {
//       return true;
//     }
//     return false;
// };


//------------------ ВТОРОЙ ВАРИАНТ БЕЗ ЗНАКОВ ПРЕПИНАНИЯ

// const isPalindrome = function(value) {

//   if ((typeof value) !== 'string' && (typeof value) !== 'number') {
//     return "Введенное значение не является ни строкой, ни числом";
//   }

//   let result = true;

//   let str = value.toString().toLowerCase().replace(/ /g, '');
//   let length = str.length;

//   for (let i = 0; i < length/2; i++) {
//     if (str[i] !== str[length - i - 1]) {
//       result = false;
//       break;
//     }
//   }

//     return result;
// };

// ---------- ТРЕТИЙ ВАРИАНТ - ЕСЛИ В СТРОКЕ ВСТРЕЧАЮТСЯ ЗНАКИ ПРЕПИНАНИЯ

const isPalindrome = function(value) {

    if ((typeof value) !== 'string' && (typeof value) !== 'number') {
    return "Введенное значение не является ни строкой, ни числом";
  }

  let str = value.toString().toLowerCase().replace(/[^a-zA-Z0-9а-яА-ЯёЁ]/g, '');

  let reverseStr = str.split('').reverse().join('');
  if (str === reverseStr) {
    return true;
  }
  return false;
};


console.log(isPalindrome(123321));
console.log(isPalindrome('  Аргентина манит негра'));
console.log(isPalindrome([1, 2, 3]));
console.log(isPalindrome('Аргентина'));
console.log(isPalindrome(' '));


// ДЛЯ ТРЕТЬЕГО ВАРИАНТА
console.log(isPalindrome("A man, a plan_, a canal: Panama"))
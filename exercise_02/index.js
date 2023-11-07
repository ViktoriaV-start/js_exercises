// Задача о странных числах:
// Напишите функцию, которая принимает число и возвращает true,
// если это число является странным, и false в противном случае.
// Странным числом считается число, которое равно сумме всех своих делителей, кроме самого себя.

'use strict';

/**
 * @param {number} value
 * @return {boolean | string}
 */

function isStrangeValue(value) {

  if (!Number.isInteger(value)) return "Переданное значение не является целым числом";

  let sumDiv = 0;

  for (let i = 1; i <= value / 2; i++) {
    if (value % i == 0) {
      sumDiv += i
    };
  }
  
  if (sumDiv == value) {
    return true;
  }

  return false;
}

console.log(isStrangeValue(28));
console.log(isStrangeValue(56));
console.log(isStrangeValue('abc'));
console.log(isStrangeValue(-28));
console.log(isStrangeValue([1,2,3]));

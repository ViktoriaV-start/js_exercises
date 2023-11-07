// Напишите функцию, которая будет принимать массив функций и возвращать
// новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов,
// полученных после вызова каждой функции

'use strict';

/**
 * @return {() => string}
 */

const execute = () => {
  let param = Math.floor(Math.random() * (50));
  console.log(param);

  return () => {
    return param;
  }

};
const run1 = execute();
const run2 = execute();

console.log('Второй результат: ' + run2());
console.log('Первый результат: ' + run1());

// Напишите функцию, которая будет принимать массив функций и возвращать
// новую функцию, которая вызывает каждую функцию в этом массиве и возвращает массив результатов,
// полученных после вызова каждой функции

'use strict';


const func1 =  () => {
  return 'Первая ';
};

const func2 = () => {
  return 'Вторая ';
};

const func3 = () => {
  return 'Третья ';
};

const func4 = () => {
  return 'Четвертая ';
};

/**
 * @param {Function []} arr
 * @return {() => string[]}
 */

const execute = (arr) => {

  return () => {
    let result = [];
    for (let func of arr) {
      result.push(func());
    }
    return result;
  }

};
const run1 = execute([func1, func2]);
const run2 = execute([func1, func2, func3, func4]);

console.log(run1);
console.log(run2());
console.log(run1());

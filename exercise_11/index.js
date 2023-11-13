// Задача о замыканиях и области видимости: напишите функцию, которая возвращает другую функцию.
// Внутренняя функция должна иметь доступ к переменной, определенной во внешней функции,
// даже после того, как внешняя функция завершила свое выполнение.

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

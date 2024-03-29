// Задача о коллекции функций: у вас есть массив функций, напишите код,
// который вызовет каждую функцию в этом массиве и выведет их порядковый номер.
// Однако, вызов каждой функции должен происходить только после вызова предыдущей функции.
// Другими словами, нужно выполнить следующие шаги:
// 1. Вызвать первую функцию из массива.
// 2. После завершения работы первой функции вызвать вторую функцию.
// 3. После завершения работы второй функции вызвать третью функцию.
// 4. И так далее, пока все функции в массиве не будут вызваны по порядку. 

'use strict';

const func1 =  () => {
  console.log(1);
};

const func2 = () => {
  console.log(2);
};

const func3 = () => {
  console.log(3);
};

/**
 * Выполнение
 * @param {Function []} arr
 * @return {void}
 */
// const execute = (arr) => {

//   async function executeItem(el) {

//     return new Promise((resolve) => {
//       let timeout = Math.floor(Math.random() * (2000)) + 500;
//         console.log("Сгенерированное время ожидания: " + timeout)
//         setTimeout(() => {
//           el();
//           resolve();
//         }, timeout);
//       });
//     }

//   // Дожидается выполнения текущего промиса и только после этого вызывает следующую функцию
//   const run = (j = 0) => {

//     let i = j;

//     executeItem(arr[i]).then(() => {
//       i++;
//       if (arr[i]) run(i);
//     });

//   }

//   run();

// }

// execute([func1, func2, func3]);


function execute(arr) {
  if (!Array.isArray(arr) || !arr.length) return;

  const executeItem = (item) => {

    return new Promise((resolve) => {
      let timeout = Math.round(Math.random() * 2000 + 500);
      setTimeout(() => {
        item();
        console.log(timeout);
        resolve();
      }, timeout);
    })
    .catch(err => console.error(err));
  }

  const run = (i = 0) => {

    executeItem(arr[i]).then(() => {
      if (arr[i + 1]) run(i+1);
    })
  }

  run();

}

execute([func1, func2, func3]);
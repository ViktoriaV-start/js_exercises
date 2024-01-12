// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

// В современных системах 1 символ = 1 байт.
// Второй вариант - new Blob([str]).size - размер данных в байтах

'use strict';

/**
 * Подсчет максимальной памяти
 * @returns {number}
 */
function getMaxMemory() {
  let total = 0;
  let totalBlob = 0;
  localStorage.clear();

  try{
    let i = 0;
    while (i < 15000) {
      localStorage.setItem(`Key${i}`, "Window.localStorage: Свойство localStorage позволяет получить доступ к Storage объекту. localStorage аналогично свойству sessionStorage (en-US). Разница только в том, что свойство sessionStorage хранит данные в течение сеанса (до закрытия браузера), в отличие от данных, находящихся в свойстве localStorage, которые не имеют ограничений по времени хранения и могут быть удалены только с помощью JavaScript.");
      i++;
    }
  } catch (er) {
    console.log(er);
  }

  for(let x in localStorage) { 
  
    if (!localStorage.hasOwnProperty(x)) {
      continue;
    }

    let size = (((localStorage.getItem(x).length + x.length))); 
    total += size;

    let str = localStorage.getItem(x) + x;
    totalBlob += new Blob([str]).size;

  }

  total = (total/1024/1024).toFixed(2);
  totalBlob = (totalBlob/1024/1024).toFixed(2);

  console.log("total = " + total +" MB");
  console.log("totalBlob = " + totalBlob +" MB");

  localStorage.clear();

  return totalBlob;
}

const maxStorageMemory = getMaxMemory();
console.log(maxStorageMemory);

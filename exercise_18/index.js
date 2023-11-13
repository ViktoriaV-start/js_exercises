// Подсчитать максимальный объем данных, который можно записать в localStorage вашего браузера.

'use strict';

/**
 * Подсчет максимальной памяти
 * @returns {number}
 */
function getMaxMemory() {
  let total = 0;
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

    let size = (((localStorage[x].length + x.length) * 2)); 
    total += size; 
  } 

  console.log("total = " + (total/1024/1024).toFixed(2) +" MB");

  localStorage.clear();

  return (total/1024/1024).toFixed(2);
}

const maxStorageMemory = getMaxMemory();
console.log(maxStorageMemory);

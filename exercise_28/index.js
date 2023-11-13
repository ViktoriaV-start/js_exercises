//Задача: Создать и добавить элемент с использованием шаблонов:
// Напишите функцию, которая создает новый элемент с использованием шаблонов
// (например, с помощью тега <template>) и добавляет его в DOM.

'use script'; 

let isShow = false;
init();

/**
 * Создать элемент, используя шаблон template
 * @param {string} className 
 * @param {string} node 
 */
function createSweetsTable(className, node) {
  let elem = document.createElement('div');
  elem.className = className;

// Клонируем содержимое шаблона
  elem.append(sweets.content.cloneNode(true));

  document.querySelector(node).append(elem);
}

/**
 * Слушать событие клика на кнопку и создавать/ удалять элемент в зависимости от переменной isShow
 */
function init() {
  document.querySelector('.main').addEventListener('click', e => {
    if (e.target.classList.contains('btn')) {
      if (!isShow) {
        createSweetsTable('sweet', '.main');
        isShow = true;
      } else {
        document.querySelector('.sweet').remove();
        isShow = false;
      }
    }
  })
}

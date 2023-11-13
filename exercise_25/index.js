// Задача: Создать и добавить стиль для элемента:
// Напишите функцию, которая создает новый элемент, добавляет его в DOM
// и устанавливает для него стиль с помощью CSS.

// node.append/ prepend/ before/ after/ replaceWith (...nodes or string) используется для вставки DOM-узлов или текстовых фрагментов;
// node.insertAdjacentHTML/ Text/ Element (where, content) универсальный

// Приорите инлайн-стилей выше, чем приоритет стилей, заданных через класс во внешенй таблице стилей

'use strict';

function createEl(tag, className, content, node) {
  let element = document.createElement(tag);


  element.innerHTML = content;

  // Первый вариант inline-стили - перезапишит все имеющиеся стили
  element.style.cssText = `
  font-size: 2rem;
  padding: 1rem;
  color: red;
  `;

  // Второй вариант inline-стили - перезапишит все имеющиеся стили
  element.setAttribute('style', 'color: #154e72; padding: 2rem; font-size: 2rem;')

  // Третий вариант - добавит стили
  // element.style.background = '#faebd7';

  // Четвертый вариант - Добавить стили через класс
  // Для дублирующихся свойств значения будут взяты из inline-стилей,
  // недублирующиеся свойства будут применены
  element.className = className;

  node.append(element)
}

createEl('div', 'new', "Hello, world!", document.querySelector('.main'));

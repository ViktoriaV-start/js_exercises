// Задача: Добавить анимацию для элемента: Напишите функцию,
// которая добавляет анимацию для элемента на веб-странице, например,
// плавное изменение его положения или размера.

'use strict';

// Первый вариант -----------------------

let mainContainer = document.querySelector('.main');
let notice = document.querySelector('.notice');
notice.setAttribute('style', 'left: 0px; width: 200px; height: 200px')

/**
 * Организация анимации
 */
function animateSquare({timing, draw, duration}) {

  let start = performance.now();

  requestAnimationFrame(function animate(time) {

    // timeFraction изменяется от 0 до 1
    let timeFraction = (time - start) / duration;
    if (timeFraction > 1) timeFraction = 1;

    // вычисление текущего состояния анимации
    let progress = timing(timeFraction);

    draw(progress); // отрисовать

    if (timeFraction < 1) {
      requestAnimationFrame(animate);
    }

  });
}

/**
 * Вызвать ф-цию animateSquare и передать длительность, ф-цию для timeFraction,
 * и ф-цию draw c определением изменений
 */
animateSquare({
  duration: 2000,
  timing(timeFraction) {
    return timeFraction;
  },
  draw(progress) { 
    if (notice.style.left.slice(0, (notice.style.left.length-2)) < document.body.clientWidth - notice.style.width.slice(0, (notice.style.width.length-2)) * 1.6) {
      notice.style.left = progress*1500 + 'px';
      notice.style.width = notice.style.width.slice(0, (notice.style.width.length-2)) - 1.5 + 'px';
      notice.style.height = notice.style.height.slice(0, (notice.style.height.length-2)) - 1.5 + 'px';
    }
  }
});


// Второй вариант -----------------
/**
 * Анимация при добавлении класса
 */
function addClassAnimation() {
  document.querySelector('.square').classList.add('animate');
}

addClassAnimation();

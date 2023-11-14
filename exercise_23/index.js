// Анализатор сложности пароля: создайте функцию, которая оценивает сложность введенного пользователем пароля.
// Необходимо анализировать длину пароля, использование различных символов, наличие чисел и букв в разных регистрах.
// Выведите пользователю оценку сложности пароля и предложите улучшения, если пароль слишком слабый.


'use strict';

const messages = ['Слабая защита', 'Средняя степень защиты', 'Надежный пароль', 'Проверьте корректность пароля, пароль может содержать прописные и строчные буквы латинского алфавита, цифры и специальные символы. Обратите внимание, что некоторые символы, такие как пробел, кавычки, двоеточие, угловые скобки и некоторые другие, не разрешены для использования в пароле.'];

const specialSymbols = ['!', '@', '#', '$', '%', '&', '*', '-', '+', '=', '/', '.', '^', '~', ',', '_', '|', '(', ')', '[', ']'];


/**
 * Результат анализ степени защиты в зависимости от наличия прописных, строчных букв, цифры и спец. символа,
 * плюс в зависимости от длины пароля. Таблицу можно расширить.
 */
const table = {
  '1': { '10': messages[0], '12': messages[0], '14': messages[0], '18': messages[0] },

  '2': { '10': messages[0], '12': messages[0], '14': messages[1], '18': messages[1] },

  '3': { '10': messages[0], '12': messages[1], '14': messages[1], '18': messages[2] },

  '4': { '10': messages[0], '12': messages[1], '14': messages[2], '18': messages[2] },
}

init();

/**
 * Сгенерировать случайной число в заданном интервале
 * @param {number} min 
 * @param {number} max 
 * @return {number}
 */
function getRandomNum(min, max) {
  if (min === 0 ) {
    return Math.floor(Math.random() * (max + 1));
  } else {
    return Math.round(min - 0.5 + Math.random() * (max - min +1));
  }
}

/**
 * Перемешать массив:
 * пройти по массиву в обратном порядке и менять местами каждый элемент со случайным элементом, который находится перед ним.
 * @param {string[]} array 
 * @return {string[]}
 */
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // случайный индекс от 0 до i
    let j = getRandomNum(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

/**
 * Генерация пароля
 * @returns {string}
 */
function generatePassword() {
  let newPassword = [];

  // Функции для генерации строчной буквы, прописной буквы, цифры, символа
  const generate = {
    genLowerCase: () => String.fromCharCode(getRandomNum(97, 122)),
    genUpperCase: () => String.fromCharCode(getRandomNum(97, 122)).toUpperCase(),
    genNum: () => (getRandomNum(0, 9)),
    genSpecial: () => specialSymbols[getRandomNum(0, 20)]
  };

  // Гарантированное добавление в новый пароль по одной строчной букве, прописной букве, цифре, символу
  newPassword.push(generate.genLowerCase());
  newPassword.push(generate.genUpperCase());
  newPassword.push(generate.genNum());
  newPassword.push(generate.genSpecial());
  
  // Генерация остальных эелементов для пароля
  let count = getRandomNum(11, 15);
  for (let i =0; i < count; i++ ) {
    newPassword.push((generate[Object.keys(generate)[getRandomNum(0, 3)]])())
  }

  return (shuffle(newPassword)).join('');
}

/**
 * Запустить слушателя события submit при вводе пользователем пароля дла проверки;
 * Если введенный пароль не пустой - запустить ф-цию check(password)
 */
function init() {

  document.querySelector('.password__form').addEventListener('submit', e => {
    e.preventDefault();
    let password = document.querySelector('.password__input').value.trim();
    if (password) check(password);
  })
}


/**
 * Проверка пароля
 * @param {string} password
 */
function check(password) {
  let resultTextContainer  = document.querySelector('.password__result');
  let suggestTextContainer = document.querySelector('.password__suggest');

  suggestTextContainer.textContent = ''; 
  resultTextContainer.textContent  = '';

  let points = 0;
  let length = password.length;

  if ((/[ ]/.test(password))) {
    document.querySelector('.password__result').textContent = messages[3];
    resultTextContainer.style.color = '#547F9E';
    return;
  }

  if (/\d/.test(password)) points++;
  if (/[a-z]/.test(password)) points++;
  if (/[A-Z]/.test(password)) points++;
  if (/[!@#$%&*-+=\/\.\^~,_\|()\[\]]/.test(password)) points++;

  if (points == 0 && length != 0) {
    document.querySelector('.password__result').textContent = messages[3];
    return;
  }

  let message = '';

  if (length <= 10) {
    message = table[String(points)][String(10)];
  } else if (length <= 12) {
    message = table[String(points)][String(12)];
  } else if (length <= 14) {
    message = table[String(points)][String(14)];
  } else if (length <= 18) {
    message = table[String(points)][String(18)];
  } else {
    message = table[String(points)][String(18)];
  }

message[message.length-1] === 'а' ? resultTextContainer.style.color = '#9E547C' :
message[message.length-1] === 'ы' ? resultTextContainer.style.color = '#9E9554' :
                                    resultTextContainer.style.color = '#547F9E';

  resultTextContainer.textContent = message;

  if ((points < 4 && points != 3) ||(points == 3 && length <= 14) || (points == 4 && length <= 12)) {
    suggestTextContainer.innerHTML = `Рекомендуемый пароль: <span class="password__txt">${generatePassword()}</span>`;
  }

}

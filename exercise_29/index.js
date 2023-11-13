// Задача: Взаимодействие с формами: Напишите функцию, которая получает данные из формы на веб-странице
// и выполняет определенные действия с этими данными, например, отправляет их на сервер
// или отображает всплывающее окно с результатами.

'use script';

const formContainer = document.querySelector('.customer__main');
const infoContainer = document.querySelector('.info');
const nameInput     = document.querySelector('input[name="name"]');
const surnameInput  = document.querySelector('input[name="surname"]');
const mailInput     = document.querySelector('input[name="mail"]');
const phoneInput    = document.querySelector('input[name="phone"]');
const innInput      = document.querySelector('input[name="inn"]');

init();

/**
 * Слушать событие submit в форме и по наступлению
 * получить введенные данные и вывести их в окне.
 * Запустить ф-цию проверки введенных данных с отображением ошибки, как в L0 
 */
function init() {

  formContainer.addEventListener('submit', e => {
    e.preventDefault();

    let checked = checkValues(nameInput.value.trim(), surnameInput.value.trim(), mailInput.value.trim(), innInput.value.trim());

    if (checked) {
      infoContainer.querySelector('.info__name').textContent = nameInput.value.trim();
      infoContainer.querySelector('.info__surname').textContent = surnameInput.value.trim();
      infoContainer.querySelector('.info__mail').textContent = mailInput.value.trim();
      infoContainer.querySelector('.info__phone').textContent = phoneInput.value.trim();
      infoContainer.querySelector('.info__inn').textContent = innInput.value.trim();

      infoContainer.classList.remove('invisible');
    }
  })
}

/**
 * Функция проверки введенных данных:
 * для имени и фамилии - только буквы русского алфавита, допускается пробел в поле имя,
 * для почты - проверка на соответсвие стандарту,
 * для инн - только цифры без пробелов
 * можно добавить проверку на кол-во символов
 * @param {string} name 
 * @param {string} surname 
 * @param {string} mail 
 * @param {string} inn 
 * @returns {boolean}
 */
function checkValues(name, surname, mail, inn) {

  if (!checkContent(name, /^[а-яА-ЯЁё ]+$/, nameInput) ||
      !checkContent(surname, /^[а-яА-ЯЁё]+$/, surnameInput) ||
      !checkContent(mail, /^([!#$%&*-+{}|?/~\w]+(.?[\w]+)*@([\w-]{1,255}\.)[\w-]{2,4})?$/, mailInput) ||
      !checkContent(inn, /^[0-9 ]+$/, innInput)  
  ) return false;

  return true;
}

/**
 * Проверка введенного пользователем текста в input и переключение предупреждения о некорректном вводе
 * @param {string} value 
 * @param {RegExp} regexp 
 * @param {Node} node 
 * @returns {boolean}
 */
function checkContent(value, regexp, node) {
    if (!regexp.test(value)) {
      node.parentNode.querySelector('.customer__error').classList.remove('hidden');
      node.classList.add('red');
      return false;
    } else {
      node.parentNode.querySelector('.customer__error').classList.add('hidden');
      node.classList.remove('red');
      return true;
    }
  }

'use strict';

// Это мой токен для разработки, действует примерно сутки
const token = 'vk1.a.-yd_nHIfYIHDd4FIvb6vDPlakjMNBgPdlmhR_1cvEDfIBjkLl8V07JO9xqs6kYSBCxjK5zZoKy1cqpxdUskEorZmeFMjtnXOYtP3r4SORu8RSLMh5DdAI1IKhLRQfRnHp9ZH7YJr9Lu7wJW5r_ttgs_2OfoAV6u8L41vgIqdjupIa_PxBLJ0-ZJ11kIvDjiQ';

const posts = {};
let counter = 0;
let offset = 0;
let tempCounter = 0;

// Флаг - отмечает загрузку всех имевшихся при открытии страницы постов из localStorage
let isLocalStorageRendered = false;

// Контейнер для постов на странице
let scrollContainer = document.querySelector('.scrollContainer');

// Слушатель события скрола, вызвать функцию обработчик
document.querySelector('.main__content').addEventListener('scroll', scrollContent);

if (localStorage.counter && localStorage.counter !== 0) {
  counter = localStorage.counter;
  offset = localStorage.counter;
}

addScript();


/**
 * Возвращает отсортированный массив ключей localStorage без приставки vk
 */
function getSortedKeys() {
  let vkKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)[0] === 'v' && localStorage.key(i)[1] === 'k') {
      vkKeys.push(localStorage.key(i).slice(2));
    }
  }

  vkKeys = vkKeys.sort((a, b) => a - b);
  
  return vkKeys;
}

/**
 * Загрузить данные VK
 */
function addScript() {

  let elem = document.createElement("script");

  elem.src = `https://api.vk.com/method/wall.get?access_token=${token}&owner_id=-33276697&fields=bdate&offset=${offset}&count=100&v=5.131&callback=onVkData`;
  document.querySelector('body').insertAdjacentElement('beforeend', elem);
}

/**
 * Обработать пришедшие данные VK
 */
function onVkData(res) {
  if(!res.response) throw new Error("Ошибка при загрузке");
  let result = res.response.items;
  let length = result.length;

  for (let i = 0; i <length; i++ ) {
      posts[i] = result[i].text;
  }
  insertPosts();
}

/**
 * Отследить скролл и подгрузить посты. Запросить новый пакет постов VK, если имеющиеся в posts уже загружены на страницу.
 */
function scrollContent() {

  if (document.querySelector('.main__content').scrollTop + 500 >= document.querySelector('.main__content').scrollHeight) {

    if (Object.keys(posts).length > tempCounter + 1) {
      insertPosts();
    }

    if (tempCounter >= 100 ){
      console.log('Новый запрос');
      tempCounter = 0;
      offset = counter;
      addScript();
    }
  }
}

/**
 * Добавление постов на страницу
 */
function insertPosts() {
  let postsMarkup = '';

// При первом входе
// if (localStorage.length == 0 || (localStorage.length != 0 && isLocalStorageRendered && offset == 0)) {
    if (offset === 0) {
    console.log('Первичный вход')
    for (let i = 0; i < 5; i++) {

      postsMarkup += getPostMarkup(tempCounter);
      localStorage['vk' + counter] = posts[tempCounter];
      localStorage.counter = counter;
      counter++;
      tempCounter++;
    }
    isLocalStorageRendered = true;
  }

  if (localStorage.length !== 0 && !isLocalStorageRendered ) {
    console.log('Рендер постов из localStorage');

    let lng = localStorage.counter;

    for (let i = 0; i < lng; i++) {
      if (localStorage['vk' + i]) {
        postsMarkup += getPostMarkupStorage('vk' + i);
      }
    }
    isLocalStorageRendered = true;

  } else if (localStorage.length !== 0 && isLocalStorageRendered && offset !== 0) {
      console.log('Рендер новых постов при offset != 0 и отображенном localStorage')

      for (let i = 0; i < 5; i++) {
        postsMarkup += getPostMarkup(tempCounter);

        try {
          localStorage['vk' + counter] = posts[tempCounter];
          localStorage.counter = counter;
        } catch (er) {
          console.log(er);

          let keys = getSortedKeys();

          for (let i = 0; i < 10; i++) {
            localStorage.removeItem(`vk${keys[i]}`);
          }
        }
        
        counter++;
        tempCounter++;
      }
  }

  scrollContainer.insertAdjacentHTML('beforebegin', postsMarkup);
}

/**
 * Разметка одного поста из объекта posts
 * @param {number | string} idx
 * @returns {string} html-разметка одного поста
 */
function getPostMarkup(idx) {
  return `<div class="post">${posts[idx]}</div>`;
}

/**
 * Разметка одного поста из localStorage
 * @param {string} key
 * @returns {string} html-разметка одного поста
 */
function getPostMarkupStorage(key) {
  return `<div class="post">${localStorage[key]}</div>`;
}

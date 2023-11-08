'use strict';

// console.log(String(document.location.href).split('?')[1].split('&')[0].split('=')[1]);
// const token = String(document.location.href).split('?')[1].split('&')[0].split('=')[1];

// Для Guthub pages:
//const token = String(document.location.href).split('#')[1].split('&')[0].split('=')[1];


// Это мой токен для разработки, действует примерно сутки
const token = 'vk1.a.5D51XZ18h_ADCOYEWgeZYYUjxwTHJcwqt0lXTFEG2QLX8AV2VhSdd1BrZLzX-6St87i1E1KeVzrLsLAIV6R9NoVwJF4H90iAfkkW81BwLsOYD6bJSpJiomUMZ_9L-LQ6wDFb5Mf6wfMdXKn2MTkgRO6RicchpnFAQWXSoin3APw4kgb0XcHXt22x3snkWrH9';

const posts = {};
let counter = 0;
let offset = 0;
let tempCounter = 0;
checkLocalStorage();
let maxStorageMemory = localStorage.maxStorageMemory ?? getMaxMemory();



/**
 * Возвращает отсортированный массив ключей localStorage без приставки vk
 */
function getSortedKeys() {
  let vkKeys = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)[0] == 'v' && localStorage.key(i)[1] == 'k') {
      vkKeys.push(localStorage.key(i).slice(2));
    }
  }

  vkKeys = vkKeys.sort((a, b) => a - b);
  
  return vkKeys;
}

/**
 * Проверить localStorage, очистить его, если localStorage не содержит постов и не является пустым
 */
function checkLocalStorage() {
  if (!getSortedKeys().length && localStorage.length) {
    localStorage.clear();
  }
}

function getMaxStorageMemory() {
  if (localStorage.maxStorageMemory) {
    return localStorage.maxStorageMemory;
  } else {
    maxStorageMemory = getMaxMemory();
    localStorage.maxStorageMemory = maxStorageMemory;
  }
}

console.log(maxStorageMemory);


if (localStorage.length != 0) {
  counter = localStorage.length-1;
  offset = localStorage.length-1;
}

/**
 * Загрузить данные VK
 */
function addScript() {

  let elem = document.createElement("script");

  elem.src = `https://api.vk.com/method/wall.get?access_token=${token}&owner_id=-33276697&fields=bdate&offset=${offset}&count=100&v=5.131&callback=onVkData`;
  document.querySelector('body').insertAdjacentElement('beforeend', elem);
}

addScript();

/**
 * Обработать пришедшие данные VK
 */
function onVkData(res) {
  
  let result = res.response.items;
  let length = result.length;

  for (let i = 0; i <length; i++ ) {
    posts[i] = result[i].text;
  }
  insertPosts();
}

// Контейнер для постов на странице
let scrollContainer = document.querySelector('.scrollContainer');

// Слушатель события скрола, вызвать функцию обработчик
document.querySelector('.main__content').addEventListener('scroll', scrollContent);

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

// Флаг - отмечает загрузку всех имевшихся при открытии страницы постов из localStorage
let isLocalStorageRendered = false;

/**
 * Добавление постов на страницу
 */
function insertPosts() {
  let postsMarkup = '';

// При первом входе
// if (localStorage.length == 0 || (localStorage.length != 0 && isLocalStorageRendered && offset == 0)) {
    if (offset == 0) {
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
  
  if (localStorage.length != 0 && !isLocalStorageRendered ) {
    console.log('Рендер постов из localStorage')
    for (let i = 0; i < localStorage.length; i++) {
      if (localStorage.key(i)[0] == 'v' && localStorage.key(i)[1] == 'k') {
        postsMarkup += getPostMarkupStorage(localStorage.key(i));
      }
    }
    isLocalStorageRendered = true;

  } else if (localStorage.length != 0 && isLocalStorageRendered && offset != 0) {
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

  console.log(`Объем занятой памяти - ${getStorageValue()} KB / максимальный размер хранилища - ${maxStorageMemory} KB`);

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


/**
 * Подсчет максимальной памяти
 * @returns {number}
 */
function getMaxMemory() {
  let total = 0;
  localStorage.clear();

  try{
    let i = 0;
    // ЗДЕСЬ МОЖНО ЧЕРЕЗ WHILE (TRUE)
    while (i < 25000) {
      localStorage.setItem(`Key${i}`, "Window.localStorage: Свойство localStorage позволяет получить доступ к Storage объекту. localStorage аналогично свойству sessionStorage (en-US). Разница только в том, что свойство sessionStorage хранит данные в течение сеанса (до закрытия браузера), в отличие от данных, находящихся в свойстве localStorage, которые не имеют ограничений по времени хранения и могут быть удалены только с помощью JavaScript.");
      i++;
    }
  } catch (er) {
    console.log(er);
  }

  total = getStorageValue();

  console.log("Максимальный размер localStorage = " + total +" KB");

  localStorage.clear();
  localStorage.maxStorageMemory = total;

  return total;
}

/**
 * Подсчет объема занятой памяти в localStorage
 * @returns {number}
 */
function getStorageValue() {
  let total = 0;
  for(let x in localStorage) { 
  
    if (!localStorage.hasOwnProperty(x)) {
      continue;
    }

    let size = (((localStorage[x].length + x.length) * 2)); 
    total += size; 
  }
  return (total/1024).toFixed(2);
}

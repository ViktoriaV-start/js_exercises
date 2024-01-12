'use strict';


// Это мой токен для разработки, действует примерно сутки
const TOKEN = 'vk1.a.9Kk6g5bhl8nNMRcnBDodjqiGAqWypxKR9i-DhYXdrRPVp-axeDWeWYePdjzXt7CyUWc7aThvRJB8isvdOK2ki29CNg3AK1mk9A7ZekGcttKRkeWJS4rIrr2VWfSAdo123bLWlGUM8sxCLtPdYfjeqp1H4nGUurSfSHkcOjAjR2QNPeXKo5c-HmRMmHoDaa8t';

class Posts {

  posts = {};
  counter = 0;
  offset = 0;
  tempCounter = 0;
  scrollContainer = document.querySelector('.scrollContainer');
  isLocalStorageRendered = false;
  maxStorageMemory = 0;

  constructor() {
    this.maxStorageMemory = localStorage.maxStorageMemory ?? this.getMaxMemory();
  }

  init() {
    if (localStorage.getItem('counter')) {
      this.counter = localStorage.counter;
      this.offset = localStorage.counter;
      this.insertPosts();
    } else {
      addScript();
    }

    // Слушатель события скрола, вызвать функцию обработчик
    document.querySelector('.main__content').addEventListener('scroll', this.scrollContent.bind(this));
  }


  /**
   * Возвращает отсортированный массив ключей localStorage без приставки vk
   */
  getSortedKeys() {
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
   * Обработать пришедшие данные VK
   */
  onVkData(res) {
    if(!res.response) throw new Error("Ошибка при загрузке");
    let result = res.response.items;
    let length = result.length;

    for (let i = 0; i <length; i++ ) {
      this.posts[i] = result[i].text;
    }
    this.insertPosts();
  }

  /**
   * Отследить скролл и подгрузить посты. Запросить новый пакет постов VK, если имеющиеся в posts уже загружены на страницу.
   */
  scrollContent() {

    let elem = document.querySelector('.main__content');
    let scrollBottom = elem.scrollHeight - elem.scrollTop - elem.clientHeight;
  
    if (scrollBottom <= 5000) {

      if (Object.keys(this.posts).length > this.tempCounter + 1) {
        this.insertPosts();
      }

      if (this.tempCounter >= 100 || !this.tempCounter){
        console.log('Новый запрос');
        this.tempCounter = 0;
        this.offset = this.counter;
        addScript();
      }
    }
  }

  /**
   * Добавление постов на страницу
   */
  insertPosts() {
    let postsMarkup = '';

// При первом входе
    if (this.offset == 0) {
      console.log('Первичный вход')
      for (let i = 0; i < 5; i++) {

        postsMarkup += this.getPostMarkup(this.tempCounter);
        localStorage['vk' + this.counter] = this.posts[this.tempCounter];
        localStorage.counter = this.counter;
        this.counter++;
        this.tempCounter++;
      }
      this.isLocalStorageRendered = true;
    }

    if (localStorage.length != 0 && !this.isLocalStorageRendered ) {
      console.log('Рендер постов из localStorage');

      let lng = localStorage.counter;

      for (let i = 0; i < lng; i++) {
        if (localStorage['vk' + i]) {
          postsMarkup += this.getPostMarkupStorage('vk' + i);
        }
      }
      this.isLocalStorageRendered = true;

    } else if (localStorage.length != 0 && this.isLocalStorageRendered && this.offset != 0 && Object.keys(this.posts).length) {
      console.log('Рендер новых постов при offset != 0 и отображенном localStorage')

      for (let i = 0; i < 5; i++) {
        postsMarkup += this.getPostMarkup(this.tempCounter);

        try {
          localStorage['vk' + this.counter] = this.posts[this.tempCounter];
          localStorage.counter = this.counter;
        } catch (er) {
          console.log(er);

          let keys = this.getSortedKeys();

          for (let i = 0; i < 10; i++) {
            localStorage.removeItem(`vk${keys[i]}`);
          }
        }

        this.counter++;
        this.tempCounter++;
      }
    }

    console.log(`Объем занятой памяти - ${this.getStorageValue()} KB / максимальный размер хранилища - ${this.maxStorageMemory} KB`);

    this.scrollContainer.insertAdjacentHTML('beforebegin', postsMarkup);
  }

  /**
   * Разметка одного поста из объекта posts
   * @param {number | string} idx
   * @returns {string} html-разметка одного поста
   */
  getPostMarkup(idx) {
    return `<div class="post">${this.posts[idx]}</div>`;
  }

  /**
   * Разметка одного поста из localStorage
   * @param {string} key
   * @returns {string} html-разметка одного поста
   */
  getPostMarkupStorage(key) {
    return `<div class="post">${localStorage[key]}</div>`;
  }

  /**
   * Подсчет максимальной памяти
   * @returns {number}
   */
  getMaxMemory() {
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

    total = this.getStorageValue();

    console.log("Максимальный размер localStorage = " + total +" KB");

    localStorage.clear();

    return total;
  }

  /**
   * Подсчет объема занятой памяти в localStorage
   * @returns {number}
   */
  getStorageValue() {
    let total = 0;

    for(let x in localStorage) {
      if (!localStorage.hasOwnProperty(x)) {
        continue;
      }

      let str = localStorage.getItem(x) + x;
      total += new Blob([str]).size;
    }
    return (total/1024).toFixed(2);
  }


}

const posts = new Posts();
posts.init();

/**
 * Загрузить данные VK
 */
function addScript() {

  let elem = document.createElement("script");

  elem.src = `https://api.vk.com/method/wall.get?access_token=${TOKEN}&owner_id=-33276697&fields=bdate&offset=${posts.offset}&count=100&v=5.131&callback=onVkData`;
  document.querySelector('body').insertAdjacentElement('beforeend', elem);
}

const onVkData = (res) => {
  posts.onVkData(res);
}

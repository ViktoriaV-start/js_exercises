// Необходимо реализовать простое поле ввода адреса с функцией геокодинга:
// пользователь вводит данные в поле с помощью одного из геоинформационных сервисов (Яндекс.Карты, ДаДата, GraphHopper),
// подбирается адрес. Найденные данные должны отображаться в выпадающем списке,
// из которого можно выбрать подходящее значение.
// Реализовать дебоунсинг и защиту от троттлинга с помощью замыканий.

// ПЕРВЫЙ ВАРИАНТ - Использую API Яндекс.Карты - SuggestView
// https://yandex.ru/dev/jsapi-v2-1/doc/ru/v2-1/dg/concepts/geocoding/suggest

class Answer {
  constructor(message) {
    this.message = message;
  }
}

// Здесь будут сохраняться результаты запросов,
// Можно организовать хранение в localStorage
let results = {};

ymaps.ready(init);

function init() {
  let suggestView1 = new ymaps.SuggestView('suggest');

  document.querySelector('.form').addEventListener('submit', (e) => {
    e.preventDefault();
    geocode();
  })
}

function geocode() {

  let value = document.querySelector('.input').value;

  ymaps.geocode(value).then(function (res) {
    let obj = res.geoObjects.get(0),
        error,
        hint;

    if (obj) {
      switch (obj.properties.get('metaDataProperty.GeocoderMetaData.precision')) {
        case 'exact':
        case 'near':
        case 'number':
        case 'range':
        case 'street':
          break;
        case 'other':
        default:
          error = 'Неточный адрес, требуется уточнение';
          hint = 'Уточните адрес';
        }
    } else {
        error = 'Адрес не найден';
        hint = 'Уточните адрес';
    }

    // Если геокодер возвращает пустой массив или неточный результат, то показываем ошибку.
    if (error) {
        showError(error);
        showMessage(hint, value);
    } else {
      showResult(obj, value);
    }
    }, function (e) {
      console.log(e)
  })
}

function showMessage(message, value) {
  document.getElementById('messageHeader').textContent = 'Данные получены: ' + value;
  document.getElementById('message').textContent = message;
}

function showError(message) {
  document.getElementById('notice').textContent = message;
  document.getElementById('notice').style.display = 'block';
  document.getElementById('suggest').classList.add('input_error');
}

function showResult(obj, value) {
  // Удаляем сообщение об ошибке, если найденный адрес совпадает с поисковым запросом.
  document.getElementById('suggest').classList.remove('input_error');
  document.getElementById('notice').style.display = 'none';

  let address = null;

  // если запрос на адрес уже вводился - результат берется из объекта results,
  // если запрос является новым - результат сохраняется в объект results
  if (!results[value]) {
    console.log('Новый запрос')
    address = [obj.getCountry(), obj.getAddressLine()].join(', ');
    results[value] = new Answer(address);
  }

  // Выводим сообщение
  showMessage(results[value].message, '');
}


// ------------------------- ВТОРОЙ ВАРИАНТ - без использования SuggestView

// Для защиты от троттлинга
let resultsObj = {};


// Дебаунсинг
function debounce(func, ms) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, arguments), ms);
  };
}

// Защита от троттлинга
function throttle(func, ms) {

  let isThrottled = false,
      savedArgs,
      savedThis;

  function wrapper() {

    if (isThrottled) {
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    func.apply(this, arguments);

    isThrottled = true;

    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}


document.querySelector('.input1').addEventListener('input', throttle(getSuggest, 500));


function getSuggest(ev) {

  console.log(ev.target.value)
  
    let addr = ev.target.value;
    if (addr.length == 0) {

      document.querySelector('.variants').classList.add('invisible');
      document.querySelector('.variants').innerHTML = '';
      
    } else {

      document.querySelector('.variants').classList.remove('invisible');

        let addr = ev.target.value;
        if (resultsObj[addr]) {
          showVariants(addr);
        } else {
          ymaps.ready(search(addr));
        }

  }
}


function search(addr) {
  console.log('Новый запрос');
    return function() {

    // Поиск
         ymaps.geocode(addr, {
        results: 5
    }).then(function (res) {
            // Выбираем 5 результатов геокодирования и сохраним для конкретного ключа в resultsObj.

            for (let i = 0; i < 5; i++) {
              let obj = res.geoObjects.get(i);

              if (obj) {

                if (!resultsObj[addr]) {
                  resultsObj[addr] = [obj.getCountry() + ', ' + obj.properties.get('name')  + ', ' + obj.getLocalities().join(', ')];
                } else {
                  resultsObj[addr] = [...resultsObj[addr], obj.getCountry() + ', ' + obj.properties.get('name')  + ', ' + obj.getLocalities().join(', ')]
                }
              }
            }
            showVariants(addr);
        });
      }
}

function showVariants(addr) {
  let suggestContainer = document.querySelector('.variants');
  suggestContainer.innerHTML = '';
  for (let item of resultsObj[addr]) {
    suggestContainer.insertAdjacentHTML('beforeend', `<div class='variant'>${item}</div>`)
  }
}

document.querySelector('.main').addEventListener('click', (e) => {

  if (e.target.classList.contains('variant')) {
    document.querySelector('.input1').value = e.target.textContent;
    debounce(showMessage1, 250)();
  }

  if (e.target.classList.contains('btn1')) {
    debounce(showMessage1, 250)();
  }

});

function showMessage1() {
  document.querySelector('.variants').classList.add('invisible');
  document.getElementById('messageHeader1').textContent = 'Данные получены: ';
  document.getElementById('message1').textContent = document.querySelector('.input1').value;
}

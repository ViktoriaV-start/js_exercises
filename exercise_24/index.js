// Страница с таблицей с данными:
// загружать из источника;
// ТРЕБОВАНИЯ:
// - данные должны загружаться при загрузке страницы;
// - реализовать сортировку по убыванию/возрастанию для всех колонок
// - пагинация - 50 элементов на странице


const url = 'http://www.filltext.com/?rows=1000&fname=%7BfirstName%7D&lname=%7BlastName%7D&tel=%7Bphone%7Cformat%7D&address=%7BstreetAddress%7D&city=%7Bcity%7D&state=%7BusState%7Cabbr%7D&zip=%7Bzip%7D&pretty=true';

let tableContainer = document.querySelector('.table__body');
let mainContainer = document.querySelector('.main');
let errorContainer = document.querySelector('.error');
let headerContainer = document.querySelector('.header');

let rawData = null;
let clientsArr = [];
let totalPages = null;
const onePage = 50;
let currentPage = 1;
let asc = true;
let sortingColumn = null;

createTable();
init();

/**
 * Класс для создания экземпляров - клиент
 */
class Client {
  constructor(item) {
    this.name = item.fname ?? '';
    this.surname = item.lname;
    this.address = item.address ?? '';
    this.phone = item.tel ?? '';
    this.city = item.city ?? '';
    this.state = item.state ?? '';
    this.zip = item.zip ?? '';
  }
}

/**
 * Получить данные из удаленного усточника
 * @param {string} url
 * @return {Promise object[]}
 */
async function getData(url) {
  try{
    const response = await fetch(url);
    if(!response.ok) {
      console.log('Ошибка при загрузке');
    }

    return await response.json();

  } catch (er) {
    console.warn(er);
    errorContainer.classList.remove('hidden');
  }
}

/**
 * Запросить данные, обработать результат, запустить рендер таблицы и пагинации
 */
async function createTable() {

  rawData = await getData(url);

  let dataLength = rawData.length;

  for (let i = 0; i < dataLength; i++) {
    let item = rawData[i];
    clientsArr.push(new Client(item));
    totalPages = Math.ceil(clientsArr.length/onePage);
  }

  renderTable();
  renderPagination();

}

/**
 * Рендер пагинации
 */
function renderPagination() {
  for (let i = 1; i <= totalPages; i++) {
    document.querySelector('.pagination__rbtn').insertAdjacentHTML('beforebegin', markUpPagination(i));
  }
}

/**
 * Разметка для пагинации
 * @param {number} page 
 * @returns {string}
 */
function markUpPagination(page) {
  return `
    <button type="button"
            class="pagination__page ${page == currentPage ? 'pagination__active' : ''}"
            data-id=${page}
    >
    ${page}
    </button>
  `;
}

/**
 * Запуск слушателей события клика на кнопках пагинации и сортировки
 */
function init() {
  mainContainer.addEventListener('click', (e) => {

    if (e.target.classList.contains('pagination__page')) {
      mainContainer.querySelector(`.pagination__page[data-id="${currentPage}"]`).classList.remove('pagination__active');
      currentPage = +e.target.getAttribute('data-id');
      e.target.classList.add('pagination__active');
      renderTable();
    }

    if (e.target.classList.contains('table__btn')) {
      let column = e.target.getAttribute('data-name');

      sortTable(column);
      renderTable();
    }

    if (e.target.classList.contains('pagination__lbtn')) {
      if (currentPage != 1) {
        mainContainer.querySelector(`.pagination__page[data-id="${currentPage}"]`).classList.remove('pagination__active');
        currentPage -= 1;
        mainContainer.querySelector(`.pagination__page[data-id="${currentPage}"]`).classList.add('pagination__active');
        renderTable();
      }
    }

    if (e.target.classList.contains('pagination__rbtn')) {
      if (currentPage != totalPages) {
        mainContainer.querySelector(`.pagination__page[data-id="${currentPage}"]`).classList.remove('pagination__active');
        currentPage += 1;
        mainContainer.querySelector(`.pagination__page[data-id="${currentPage}"]`).classList.add('pagination__active');
        renderTable();
      }
    }

  })
}

/**
 * Рендер таблицы
 */
function renderTable() {
  tableContainer.innerHTML = '';
  let start = (currentPage - 1) * onePage;
  let end = currentPage * onePage;

  for (let i = start; i < end; i++) {
    tableContainer.insertAdjacentHTML('beforeend', markUpTable(clientsArr[i]));
  }

  //{ block: 'start', behavior: 'smooth' } - если требуется плавная прокрутка
  headerContainer.scrollIntoView();

}

/**
 * Пользовательская функция для сортировки 2-х элементов по возрастанию 
 */
const customSortAsc = (a, b) => a > b ? 1 : -1;
/**
 * Пользовательская функция для сортировки 2-х элементов по убыванию 
 */
const customSortDesc = (a, b) => a < b ? 1 : -1;

/**
 * Сортировка по столбцу - сортируется весь массив данных
 * @param {string} column 
 */
function sortTable(column) {
  let customFunc = null;

  if (sortingColumn && column === sortingColumn) {
    asc = !asc;
  } else {
    asc = true;
    sortingColumn = column;
  }

  if (asc) {
    customFunc = customSortAsc;
  } else {
    customFunc = customSortDesc;
  }


  clientsArr.sort((a, b) => {

    if (column == 'surname') {
      if (a.surname == b.surname) {
        return customFunc(a.name, b.name);
      } else {
        return customFunc(a.surname, b.surname);
      }
    }
  
    if (column == 'name') {
      if (a.name == b.name) {
        return customFunc(a.surname, b.surname);
      } else {
        return customFunc(a.name, b.name);
      }
    }

    if (column == 'address') {
      let el = a.address.split(' ');

      let next = b.address.split(' ');

      if ((el[1] + el[2]) == (next[1] + next[2])) return customFunc(el[0], next[0]);
      return customFunc(el[1] + el[2], next[1] + next[2]);
    }

    if (column == 'state') {
      if (a.state == b.state) {
        return customFunc(a.city, b.city);
      } else {
        return customFunc(a.state, b.state);
      }
    }

    if (column == 'city') {
      if (a.city == b.city) {
        return customFunc(a.state, b.state);
      } else if(a.city == b.city && a.state == b.state) {
        return customFunc(a.surname, b.surname);
      } else {
        return customFunc(a.city, b.city);
      }
    }

    return customFunc(a[column], b[column])
  });

}

/**
 * Разметка одной строки таблицы (данные одного клиента)
 * @param {Client object} item 
 * @returns {string}
 */
function markUpTable(item) {
  return `
                  <tr class="table__tr">
                      <td class="table__data table__client">${item.surname}</td>
                      <td class="table__data">${item.name}</td>
                      <td class="table__data table__sp">${item.phone}</td>
                      <td class="table__data">${item.state}</td>
                      <td class="table__data">${item.city}</td>
                      <td class="table__data">${item.address}</td>
                      <td class="table__data">${item.zip}</td>
                  </tr>
  `;
}

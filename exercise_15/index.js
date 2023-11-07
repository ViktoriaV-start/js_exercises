// Задача на асинхронность: напишите асинхронную функцию,
//которая использует ключевое слово await для ожидания выполнения других асинхронных операций,
// и возвращает результат выполнения.

'use strict';

const WIKI_URL =  "https://ru.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&formatversion=2&search=";
const WIKI_LIMIT = "&limit=10";

  async function getData(search, route = WIKI_URL) {
    const urlString = route + search + WIKI_LIMIT;

    try {
      const response = await fetch(urlString);
      if(!response.ok) {
        throw new Error("Error");
     }
     return await response.json();
    } catch (er) {
      console.log(er);
    }
  }

  getData('кошка').then((data) => console.log(data[1]))
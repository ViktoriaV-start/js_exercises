// Задача на работу с объектами: создайте объект, представляющий собой книгу.
// Объект должен иметь свойства, такие как: название книги, автор и год издания.
// Напишите методы для получения и изменения значений свойств книги.

'use strict';

class Book {

  messageError = 'Некорректное значение';

  constructor(title, author, year, pages) {
    this._title = title;
    this._author = author;
    this._year = year;
    this._pages = pages;
  }

  getInfo() {
    return {
      title: this._title,
      author: this._author,
      year: this._year,
      pages: this._pages
    }
  }

  getTitle() {
    return this._title;
  }

  getAuthor() {
    return this._author;
  }

  getYear() {
    return this._year;
  }

  getPages() {
    return this._pages;
  }

  setTitle(value) {
    if (value && (typeof value === 'string')) {
      this._title = value;
    } else {
      console.warn("'Название': " + this.messageError);
    }
  }

  setAuthor(value) {
    if (value && (typeof value === 'string')) {
      this._author = value;
    } else {
      console.warn("'Автор': " + this.messageError);
    }
  }

  setYear(value) {
    if (+value && (typeof +value === 'number')) {
      this._year = +value;
    } else {
      console.warn("'Год издания': " + this.messageError);
    }
  }

  setPages(value) {
    if (+value && (typeof +value === 'number')) {
      this._pages = +value;
    } else {
      console.warn("'Количество страниц': " + this.messageError);
    }
  }
}

const book = new Book('Чапаев и', 'Виктор Пелевин', 2015, 480);

console.log(book);
console.log(book.getInfo());

book.setTitle('Чапаев и пустота');
book.setAuthor('Виктор Олегович Пелевин');
book.setYear('2017');
book.setPages('385');

console.log(book.getInfo());

console.log(book.getTitle());
console.log(book.getAuthor());
console.log(book.getYear());
console.log(book.getPages());

book.setPages([]);
book.setYear();
book.setTitle([1,2,3]);
book.setAuthor(123);

console.log(book.getInfo());

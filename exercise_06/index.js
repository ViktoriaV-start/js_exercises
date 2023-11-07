// Задача о сортировке объектов: у вас есть массив объектов вида { name: 'John', age: 25 }.
// Напишите код, который сортирует этот массив по возрастанию 	возраста,
// а при равных возрастах сортирует по алфавиту по полю name.

'use strict';

let clients = [
  { name: 'John', age: 25 },
  { name: 'Alex', age: 35 },
  { name: 'Lily', age: 41 },
  { name: 'Greg', age: 25 },
  { name: 'Helena', age: 63 },
  { name: 'Annie', age: 25 },
  { name: 'Tao', age: 39 },
];

const customSort = (a, b) => a > b ? 1 : -1;

clients.sort((a, b) => {
  if (a.age === b.age) return customSort(a.name, b.name);

  return customSort(a.age, b.age);
});

console.log(clients);

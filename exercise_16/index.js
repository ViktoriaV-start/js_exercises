// Задача на модули и использование внешних библиотек:
// напишите модуль, который экспортирует функцию для работы с датами.
// Внутри модуля используйте внешнюю библиотеку Moment.js для удобной работы с датами.


// ЗАПУСК В БРАУЗЕРЕ ЧЕРЕЗ LIVE SERVER

import { HelperData } from './HelperData.js';

document.querySelector('.current-date').textContent = HelperData.getCurrentData();
document.querySelector('.current-day').textContent = HelperData.getCurrentDay();


// Проверить, что дата соответствует формату 'DD.MM.YYYY'
console.log(HelperData.isValid('5555'));           //false
console.log(HelperData.isValid('15.12.2023'));   // true
console.log(HelperData.isValid('15.32.2023'));   // fase

console.log(HelperData.restDays([2024, 2, 8]));
console.log(HelperData.pastDays([2023, 8, 1]));

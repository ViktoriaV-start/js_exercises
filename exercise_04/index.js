// Определить правильное окончание: 1 арбуз, 3 арбуза, 155 арбузов
// На вход ф-ция принимает (число, [И.П., Р.П.ед., Р.П.мн.])

'use script';

/**
 * Функция, изменяющая окончание слов в зависимости от падежа
 * @param {number} num
 * @param {string []} words
 * @return {string}
 */
function getTitle(num, words) {
  switch (num % 10) {

    case 1: 
      if (Math.floor((num % 100)/10) !== 1) return num + ' ' + words[0];
      return num + ' ' + words[2];

    case 2:
    case 3:
    case 4:
      if (Math.floor((num % 100)/10) !== 1) {
        return  num + ' ' + words[1];
      } else {
      return  num + ' ' + words[2];
      }

    default:
      return num + ' ' + words[2];
  }
 }

console.log(getTitle(131, ['орех', 'ореха', 'орехов']))
console.log(getTitle(11, ['орех', 'ореха', 'орехов']))
console.log(getTitle(3, ['орех', 'ореха', 'орехов']))
console.log(getTitle(5, ['морковка', 'морковки', 'морковок']))
console.log(getTitle(24, ['морковка', 'морковки', 'морковок']))
console.log(getTitle(12, ['ягода', 'ягоды', 'ягод']))
console.log(getTitle(15, ['ягода', 'ягоды', 'ягод']))
console.log(getTitle(10, ['ягода', 'ягоды', 'ягод']))
console.log(getTitle(145, ['ягода', 'ягоды', 'ягод']))
console.log(getTitle(62, ['конь', 'коня', 'коней']))
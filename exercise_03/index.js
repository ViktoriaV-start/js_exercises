// Аналог библиотеки Math:
// 1) Вычисление N-го числа в ряду Фибоначчи
// 2) Вычисление всех чисел в ряду Фибоначчи
// 3) Вычисление N-го простого числа
// 4) Вычисление всех простыx чисел до N

'use strict';

import colors from 'colors';

class MathX  {

  static initialFibRow = [0, 1];

/**
 * Вернуть текст сообщения
 * @param {number} n
 * @return {string}
 */
  static errorMessage(n) {
    return `Переданное значение ${colors.red(n)} - ${colors.red(typeof n)} не является положительным целым числом больше нуля`;
  }

/**
 * Проверка значение на целое положительное значение
 * @param {number} n
 * @return {boolean}
 */
  static checkValue(value) {
    if ((value ^ 0) !== value || value <= 0) return false;
    return true
  }

/**
 * Вычисление N-го числа в ряду Фибоначчи
 * @param {number} n
 * @return {number | string}
 */
  static fibN(n = serialNumber) {
    
    if (!this.checkValue(n)) return this.errorMessage(n);
    if (n < 3) return this.initialFibRow[n-1];

    let fibPrev = this.initialFibRow[1];
    let fibPrePrev = this.initialFibRow[0];
    let fibCurrent = fibPrev + fibPrePrev;

    for (let i = 3; i < n; i++) {
      fibPrePrev = fibPrev;
      fibPrev = fibCurrent;
      fibCurrent = fibPrev + fibPrePrev;
    }

    return fibCurrent;
  }

  /**
 * Вычисление всех чисел в ряду Фибоначчи до числа N
 * @param {number} n
 * @return {number [] | string}
 */
  static fibRow(n = number) {

    if (!this.checkValue(n)) return this.errorMessage(n);
    if (n == 1) return this.initialFibRow.slice(0, n);

        const fibArr = this.initialFibRow.slice();

        for (let i = 2; i < n; i++) {
            let current = fibArr[i - 1] + fibArr[i - 2];
            if (current > n) {
                break;
            } else {
              fibArr.push(current);
            }
        }

        return fibArr;
  }

  /**
 * Вычисление N-го простого числа
 * @param {number} n
 * @return {number | string}
 */
  static getPrime(n = serialNumber) {

    if (!this.checkValue(n)) return this.errorMessage(n);


    if (n == 1 || n == 2) return n + 1;

    let isPrime = true;

    let currentValue = null;
    let count = 2;


    for (let i = 5; i < Number.MAX_VALUE; i += 2) {
        isPrime = true;
        for (let j = 3; j <= Math.sqrt(i); j += 2) {
            if (i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
          count++;
          currentValue = i;
          if(count == n) break;
        }
    }
    return currentValue;
  }

  /**
 * Вычисление всех простых чисел до N
 * @param {number} n
 * @return {number [] | string}
 */
  static primes(n = number) {

    if (!this.checkValue(n)) return this.errorMessage(n);
    if ( n == 1) return [];
    const primes = [2];

    let isPrime = true;

    for (let i = 3; i <= n; i += 2) {
        isPrime = true;
        for (let j = 3; j <= Math.sqrt(i); j += 2) {
            if (i % j == 0) {
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
          primes.push(i);
        }
    }
    return primes;
  }
}

let serialNumber = 5;
console.log(colors.blue.bold(`${serialNumber} номер в ряду Фибоначчи равен `) + colors.blue((MathX.fibN())));

let number = 22;
console.log(colors.blue.bold(`Ряд Фибоначчи до числа ${number}:   `) + colors.blue(MathX.fibRow()))

serialNumber = 27;
console.log(colors.blue.bold(`${serialNumber}-e простое число:   `) + colors.blue(MathX.getPrime()));

number = 105;
console.log(colors.blue.bold(`Простыe числа до ${number}:   `) + colors.blue(MathX.primes()));

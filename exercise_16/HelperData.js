// ДЛЯ NODE - import moment from "moment";
// WEBPACK - см. настройки  https://momentjs.com/docs/#/use-it/

import moment from "../node_modules/moment/dist/moment.js";


export class HelperData {

  /**
   * ПОЛУЧИТЬ ТЕКУЩУЮ ДАТУ
   * @returns {string}
   */
  static getCurrentData() {
    
    return moment().format('DD.MM.YYYY, HH:mm');
  }

    /**
   * ПОЛУЧИТЬ ТЕКУЩУЮ ДЕНЬ
   * @returns {string}
   */
  static getCurrentDay() {
    return moment().format('dddd');
  }

      /**
   * ПОЛУЧИТЬ ТЕКУЩУЮ ДЕНЬ
   * @param {string} date 
   * @returns {boolean}
   */
  static isValid(date) {
    return moment(date, 'DD.MM.YYYY').isValid();
  }

  /**
   * ПОЛУЧИТЬ КОЛИЧЕСТВО ДНЕЙ, ОСТАВШИХСЯ ДО УКАЗАННОЙ ДАТЫ
   * @param {array} date 
   * @returns {number}
   */
  static restDays(date) {
    var date = moment(date);
    var now = moment();
    return date.diff(now, 'days')
  }

  /**
   * ПОЛУЧИТЬ КОЛИЧЕСТВО ДНЕЙ, ПРОШЕДШИХ С УКАЗАННОЙ ДАТЫ
   * @param {array} date 
   * @returns {number}
   */
  static pastDays(date) {
    var date = moment(date);
    var now = moment();
    return now.diff(date, 'days')
  }

}

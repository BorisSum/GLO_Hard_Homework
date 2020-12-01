'use strict';
// -------------------------- Задание 9, дополнительное -------------

const daysOfWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
   'октября', 'ноября', 'декабря'];

const rowVal1 = [1, 21, 31, 41, 51]; // минута, секунда, час
const rowVal2 = [2, 3, 4, 22, 23, 24, 32, 33, 34, 42, 43, 44, 52, 53, 54]; // минуты, секунды, часа
// остальное: минут, секунд, часов

const units1 = ['минута', 'секунда', 'час'];
const units2 = ['минуты', 'секунды', 'часа'];
const units3 = ['минут', 'секунд', 'часов'];

// минуты - unit = 0; секуднды - unit = 1; часы - unit = 2;
const toHumanFormat = (val, unit) => {
   if (rowVal1.indexOf(val) !== -1) {
      return units1[unit];
   } else if (rowVal2.indexOf(val) !== -1) {
      return units2[unit];
   } else {
      return units3[unit];
   }
};

const zeroFill = val => {
   if (val < 10) {
      return '0' + val;
   } else {
      return val;
   }
};

const stringDate = () => {
   const curDate = new Date();
   const curDay = curDate.getDay();
   const curNum = curDate.getDate();
   const curMonth = curDate.getMonth();
   const curYear = curDate.getFullYear();

   let curHour = curDate.getHours();
   curHour += ' ' + toHumanFormat(curHour, 2) + ' ';

   let curMinute = curDate.getMinutes();
   curMinute += ' ' + toHumanFormat(curMinute, 0) + ' ';

   let curSec = curDate.getSeconds();
   curSec += ' ' + toHumanFormat(curSec, 1);

   return 'Сегодня ' + daysOfWeek[curDay] + ', ' + curNum + ' ' + month[curMonth] + ' ' + curYear + ' года, ' +
      curHour + curMinute + curSec;
};

const numericDate = () => {
   const curDate = new Date();
   const curDay = curDate.getDate();
   const curMonth = curDate.getMonth();
   const curYear = curDate.getFullYear();
   const curHour = curDate.getHours();
   const curMinute = curDate.getMinutes();
   const curSec = curDate.getSeconds();

   return zeroFill(curDay) + '.' + zeroFill(curMonth) + '.' + curYear + ' - ' + zeroFill(curHour) +
      ':' + zeroFill(curMinute) + ':' + zeroFill(curSec);
};


const stringDateElem = document.createElement('h2');
const numericDateElem = document.createElement('h2');

document.body.appendChild(stringDateElem);
document.body.appendChild(numericDateElem);


const interval1 = setInterval(() => {
   stringDateElem.textContent = stringDate();
   numericDateElem.textContent = numericDate();
}, 1000);


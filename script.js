'use strict';
// -------------------------- Задание 7, дополнительное -------------

const week = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье'];

for (let day of week) {
   const dayOutput = document.createElement('div');
   document.body.appendChild(dayOutput);
   dayOutput.textContent = day;
   dayOutput.classList.remove('current');
   dayOutput.classList.remove('weekend');
   dayOutput.classList.add('week-day');
   if (day === 'Суббота' || day === 'Воскресенье') {
      dayOutput.classList.add('weekend');
   }
}

// Получение текущего дня недели 
const currentDate = new Date();
let currentDay = currentDate.getDay();

// Приведение к Российскому представлению недели (первый день Понедельник)
currentDay--;
if (currentDay < 0) { currentDay = 6; }

document.querySelector(`.week-day:nth-of-type(${currentDay + 1})`).classList.add('current');

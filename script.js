'use strict';
// -------------------------- Задание 4, дополнительное -------------

function stringModifier(data) {
   if (typeof data !== 'string') {
      alert('Аргумент не является строкой!!!!');
      return -1;
   }
   data = data.trim();
   if (data.length > 30) {
      data = data.split('').splice(0, 30,).join('') + '...';
   }
   return data;
}

const str = '  Запушить свой проект в репозиторий для усложненных заданий на GitHub   ';
console.log(str);
console.log(stringModifier(str));


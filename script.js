'use strict';


// ------------ 1. ------------------------------------
let lang = 'ru';
const daysRu = ['Понедельник', 'Вторнник', 'Среда'];
const daysEn = ['Monday', 'Tuesday', 'Wednesday'];

// ------------- 1a ------------------------------------
if (lang === 'ru') { console.log(daysRu); }
else if (lang === 'en') { console.log(daysEn); }
else { console.log('Недопустимое значение lang.'); }

// -------------- 1b -----------------------------------
lang = 'en';
switch (lang) {
   case 'ru':
      console.log(daysRu);
      break;
   case 'en':
      console.log(daysEn);
      break;
   default:
      console.log('Недопустимое значение lang.');
}

// ----------------- 1c ---------------------------------
const days = new Map([
   ['ru', ['Понедельник', 'Вторнник', 'Среда']],
   ['en', ['Monday', 'Tuesday', 'Wednesday']],
]);

console.log('------ MAP -----------');
lang = 'ru';
console.log(days.get(lang));

lang = 'en';
console.log(days.get(lang));


// ---------------------------- 2 -------------------------------------------
let namePerson = 'Артем';
let role;

console.log(namePerson === 'Артем' ? 'директор' : namePerson === 'Максим' ? 'Преподаватель' : 'студент'); 

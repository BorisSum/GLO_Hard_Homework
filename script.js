document.addEventListener('DOMContentLoaded', () => {
   'use strict';

   const inputElem = document.querySelector('.input-text');
   const outputElem = document.querySelector('.output');

   let timeout = null;

   const showText = () => {
      outputElem.innerHTML = inputElem.value;
   };

   inputElem.addEventListener('input', event => {
      clearTimeout(timeout);
      timeout = setTimeout(showText, 500); // 300 мало, приходится быстро печатать, чтобы эффект увидеть
   });
});
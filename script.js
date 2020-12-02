'use strict';

const inputElem = document.querySelector('input');
const buttonAddElem = document.querySelector('button');
const liItems = document.getElementsByTagName('li');

buttonAddElem.addEventListener('click', () => {
   if (inputElem.value) {
      liItems[liItems.length - 1].insertAdjacentHTML('afterend', '<li>' + inputElem.value + '</li>');
      inputElem.value = '';
   }
});
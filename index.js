'use strict';

const fillBox = document.querySelector('.main-block');
const button = document.querySelector('.randomize-btn');

const zeroFill = val => {
   if (val.length === 1) {
      return '0' + val;
   } else {
      return val;
   }
};

const rnd = () => zeroFill(Math.floor(Math.random() * 256).toString(16));

const getRandomColor = () => `#${rnd()}${rnd()}${rnd()}`;

document.addEventListener('DOMContentLoaded', () => {
   fillBox.style.backgroundColor = '#FFFFFF';
   fillBox.textContent = '#FFFFFF';
});

button.addEventListener('click', event => {
   event.preventDefault();
   const rndColor = getRandomColor();
   fillBox.style.backgroundColor = rndColor;
   fillBox.textContent = rndColor;
});

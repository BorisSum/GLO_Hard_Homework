'use strict';

const DomElement = function (selector, { height, width, bg, fontSize }) {
   this.selector = selector;

   styles: {
      this.height = height;
      this.width = width;
      this.bg = bg;
      this.fontSize = fontSize;
   }
};

DomElement.prototype.createElement = function () {
   let domElem;
   if (this.selector[0] === '.') {
      const className = this.selector.slice(1);
      domElem = document.createElement('div');
      domElem.classList.add(className);
      domElem.textContent = 'Это блок DIV';
   } else if (this.selector[0] === '#') {
      const parID = this.selector.slice(1);
      domElem = document.createElement('p');
      domElem.setAttribute('id', parID);
      domElem.textContent = 'Это параграф. Lorem ipsum dolor, sit amet consectetur adipisicing.';
   }
   document.body.append(domElem);
   domElem.style.cssText = `height:${this.height}; width:${this.width}; background-color:${this.bg};
      font-size:${this.fontSize}`;
};

const newElem = new DomElement('.main', { height: '100px', width: '100px', bg: '#9563a5', fontSize: '16px' });

document.addEventListener('DOMContentLoaded', function () {
   newElem.createElement();
   const divElem = document.querySelector(newElem.selector);
   divElem.style.position = 'absolute';
   divElem.style.left = '0px';
   divElem.style.top = '0px';


   document.addEventListener('keydown', function (event) {
      let left, top;
      left = divElem.style.left.split('px')[0];
      top = divElem.style.top.split('px')[0];

      if (event.key === 'ArrowRight') {
         divElem.style.left = +left + 10 + 'px';
      }
      if (event.key === 'ArrowLeft') {
         if (+left === 0) { divElem.style.left = '0px'; }
         else { divElem.style.left = +left - 10 + 'px'; }
      }
      if (event.key === 'ArrowDown') {
         divElem.style.top = +top + 10 + 'px';
      }
      if (event.key === 'ArrowUp') {
         if (+top === 0) { divElem.style.top = '0px'; }
         else { divElem.style.top = +top - 10 + 'px'; }
      }
   });
});
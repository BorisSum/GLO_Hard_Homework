document.addEventListener('DOMContentLoaded', () => {
   'use strict';

   let coordX = 0,
      coordY = 0,
      requestID;

   const btnPause = document.querySelector('.pause');
   const btnReset = document.querySelector('.reset');

   const createElement = () => {
      const elem = document.createElement('div');
      elem.style.cssText =
         `position:relative; left:0; top:0; background-color:blue; width:100px; height:100px; margin-top:50px`;
      document.body.append(elem);
      return elem;
   };

   const element = createElement();

   const animation = () => {
      requestID = requestAnimationFrame(animation);
      coordX++;

      if (coordX < 600) {
         element.style.left = coordX + 'px';
      } else {
         cancelAnimationFrame(requestID);
      }
   };

   let animationFlag = true;

   btnPause.addEventListener('click', event => {
      event.preventDefault();
      if (!animationFlag) {
         cancelAnimationFrame(requestID);
         animationFlag = true;
      } else {
         animation();
         animationFlag = false;
      }
   });

   btnReset.addEventListener('click', event => {
      event.preventDefault();
      cancelAnimationFrame(requestID);
      coordX = 0;
      element.style.left = coordX + 'px';
      animationFlag = true;
   });

});

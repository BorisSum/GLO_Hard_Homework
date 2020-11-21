'use strict';

// ------------ 1. ------------------------------------
const num = 266219;

// ------------ 2. ------------------------------------
const DigitsOfNum = num.toString().split(''); // array of strings (chars)
//let ProductOfDigits = +DigitsOfNum[0];
let ProductOfDigits = 1;

// for (let i = 1; i < DigitsOfNum.length; i++) {
//    ProductOfDigits *= +DigitsOfNum[i];
// }
//console.log(ProductOfDigits);

DigitsOfNum.forEach(item => { ProductOfDigits *= +item; });
console.log('Произведение всех цифр числа: ', ProductOfDigits);

// ------------ 3. ------------------------------------
ProductOfDigits **= 3;

// ------------ 4. ------------------------------------

const result = document.createElement('h1');
document.body.appendChild(result);
result.textContent = ProductOfDigits.toString().slice(0, 2);

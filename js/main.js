'use strict';

const month = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября',
   'октября', 'ноября', 'декабря'];

const zeroFill = val => {
   if (val < 10) {
      return '0' + val;
   } else {
      return val;
   }
};

// Пользователь ------------------------------------------
const user = {
   firstName: '',
   lastName: '',
   login: '',
   password: '',
   regDate: '',
};

let userList = [];

const userNameElem = document.querySelector('.js-signin-name');
const btnSignUp = document.querySelector('.js-button-signup');
const loginForm = document.querySelector('.js-user-signin-form');
const userLoginElem = document.querySelector('.js-signin-login'); // Поле Логин
const userPasswordElem = document.querySelector('.js-signin-password'); // Поле Пароль
const btnSignIn = document.querySelector('.js-button-signin');
const btnOpenList = document.querySelector('.js-openlist');
const userListElem = document.querySelector('.js-user-list');
const userListHeader = document.querySelector('.js-list-header');
const userNameOutput = document.querySelector('.js-user-name'); // Имя пользователя в прветствии
const userForm = document.querySelector('.user-form');
const btnLogout = document.querySelector('.js-logout');

let signUpFlag = false;
let loggedFlag = false;

const addUserNameInput = () => {
   loginForm.insertBefore(userNameElem, userLoginElem);
};

const delUserNameInput = () => {
   userNameElem.remove();
};

const changeButtonsText = () => {
   if (signUpFlag) {
      btnSignIn.textContent = 'Авторизоваться';
      btnSignUp.textContent = 'Зарегистрироваться';
   } else {
      btnSignIn.textContent = 'Зарегистрироваться';
      btnSignUp.textContent = 'Вернуться к авторизации';
   }
};

const toggleSignInMode = () => {
   if (signUpFlag) {
      delUserNameInput();
      changeButtonsText();
      signUpFlag = false;
   } else {
      addUserNameInput();
      changeButtonsText();
      signUpFlag = true;
   }
};

const clearInputs = () => {
   userNameElem.value = '';
   userLoginElem.value = '';
   userPasswordElem.value = '';
};

const clearUser = () => {
   user.firstName = '';
   user.lastName = '';
   user.login = '';
   user.password = '';
   user.regDate = '';
};

const render = () => {

   userListElem.textContent = '';

   userList.forEach((item, index) => {
      const userInfoElem = document.createElement('div');
      userInfoElem.classList.add('user-list-item');
      userInfoElem.innerHTML = `<div>${item.firstName} ${item.lastName}, ${item.regDate}</div>` +
         `<div class='del-btn'></div>`;
      userListElem.append(userInfoElem);

      const userRemove = userInfoElem.querySelector('.del-btn');
      userRemove.addEventListener('click', () => {
         userList.splice(index, 1);
         render();
      });
   });
};

const getUserName = () => {
   const userFIO = userNameElem.value.split(' ');
   if (userFIO.length !== 2) {
      alert('Необходимо ввести Имя и Фамилию через пробел!');
      clearInputs();
      return -1;
   }

   user.firstName = userFIO[0].toLowerCase()[0].toUpperCase() + userFIO[0].slice(1);
   user.lastName = userFIO[1].toLowerCase()[0].toUpperCase() + userFIO[1].slice(1);
};

const getUserLogin = () => {
   if (userLoginElem.value === '') {
      alert('Введите свой логин!!!');
      return -1;
   }
   user.login = userLoginElem.value;
};

const getUserPassword = () => {
   if (userPasswordElem.value === '') {
      alert('Введите свой пароль!!!');
      return -1;
   }
   user.password = userPasswordElem.value;
};

const findUser = () => {
   let findIndex = -1;
   userList.forEach((item, index) => {
      if (item.login === user.login) {
         if (item.password === user.password) {
            findIndex = index;
            return;
         }
      }
   });
   return findIndex;
};

const userExist = () => {
   let result = false;
   userList.forEach(item => {
      if (item.login === user.login) {
         result = true;
         return;
      }
   });
   return result;
};

const setCurrentUser = userIndex => {
   user.firstName = userList[userIndex].firstName;
   user.lastName = userList[userIndex].lastName;
   user.login = userList[userIndex].login;
   user.password = userList[userIndex].password;
   user.regDate = userList[userIndex].regDate;
};

const showUserName = () => {
   userNameOutput.textContent = user.firstName;
};

const setRegistrationDate = () => {
   const currDate = new Date();
   user.regDate = currDate.getDate() + ' ' + month[currDate.getMonth()] + ' ' + currDate.getFullYear() +
      ' г., ' + zeroFill(currDate.getHours()) + ':' + zeroFill(currDate.getMinutes()) +
      ':' + zeroFill(currDate.getSeconds());
};


const registerUser = () => {
   setRegistrationDate();
   userList.push({
      firstName: user.firstName, lastName: user.lastName, login: user.login,
      password: user.password, regDate: user.regDate
   });
   // очистить поля текущего пользователя
   clearUser();
};

const setAuthorised = () => {
   loggedFlag = true;
   // скрыть форму авторизации
   userForm.classList.toggle('closed');
   // показать кнопку LogOut
   btnLogout.classList.toggle('closed');
};

const logout = () => {
   loggedFlag = false;
   // показать форму авторизации
   userForm.classList.toggle('closed');
   // скрыть список пользователей
   btnOpenList.classList.remove('ul-opened');
   userListElem.classList.add('closed');
   // убрать кнопку LogOut
   btnLogout.classList.add('closed');
   // очистить поля текущего пользователя
   clearUser();
   // Изменить приветствие
   userNameOutput.textContent = 'Аноним';
};


// --------------- Регистрация ---------------------------
const userSignUp = () => {
   if (getUserName() === -1) {
      return;
   }

   if (getUserLogin() === -1) {
      return;
   }

   if (userExist()) {
      alert('Пользователь с таким логином уже зарегистрирован, придумайте другой логин!');
      clearInputs();
      return;
   }

   if (getUserPassword() === -1) {
      return;
   }

   registerUser();

   clearInputs();
   toggleSignInMode();
};
// --------------- Логин ---------------------------------

const userLogin = () => {
   if (getUserLogin() === -1) {
      return;
   }

   if (getUserPassword() === -1) {
      return;
   }

   const currentUserIndex = findUser();

   if (currentUserIndex === -1) {
      alert('Пользователь не зарегестрирован в базе!');
      clearInputs();
      return;
   }

   setCurrentUser(currentUserIndex);
   clearInputs();
   showUserName();
   setAuthorised();
};

// Инициализация -----------------------------------------
delUserNameInput();

btnSignUp.addEventListener('click', event => {
   event.preventDefault();
   clearInputs();
   toggleSignInMode();
});

userListHeader.addEventListener('click', () => {
   if (!loggedFlag) {
      alert('Необходимо авторизоваться, чтобы посмотреть список пользователей!');
      return;
   }
   btnOpenList.classList.toggle('ul-opened');
   userListElem.classList.toggle('closed');
   render();
});

btnSignIn.addEventListener('click', event => {
   event.preventDefault();
   if (signUpFlag) { // Регистрация
      userSignUp();
   } else { // Авторизация
      userLogin();
   }
});

btnLogout.addEventListener('click', event => {
   event.preventDefault();
   logout();
});

window.addEventListener('beforeunload', event => {
   event.preventDefault();
   event.returnValue = '';

   localStorage.clear();
   localStorage.setItem('userData', JSON.stringify(userList));
});

document.addEventListener('DOMContentLoaded', () => {
   userList = JSON.parse(localStorage.getItem('userData')) || [];
   render();
});
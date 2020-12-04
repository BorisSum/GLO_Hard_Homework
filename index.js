'use strict';

const todoControl = document.querySelector('.todo-control');
const headrInput = document.querySelector('.header-input');
const headerButton = document.querySelector('.header-button');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');


let todoData = [];

const render = function () {
   todoList.textContent = '';
   todoCompleted.textContent = '';

   todoData.forEach((item, index) => {
      const li = document.createElement('li');
      li.classList.add('todo-item');

      li.innerHTML = `<span class="text-todo">${item.value}</span>` +
         `<div class="todo-buttons">` +
         `<button class="todo-remove"></button>` +
         `<button class="todo-complete"></button>` +
         `</div>`;

      if (item.completed) {
         todoCompleted.append(li);
      } else {
         todoList.append(li);
      }

      const todoCompletedElem = li.querySelector('.todo-complete');
      todoCompletedElem.addEventListener('click', () => {
         item.completed = !item.completed;
         render();
      });

      const todoRemove = li.querySelector('.todo-remove');
      todoRemove.addEventListener('click', event => {
         // удалим дело из массива
         todoData.splice(index, 1);
         // удалим дело со страницы
         render();
      });

   });

};

todoControl.addEventListener('submit', event => {
   event.preventDefault();

   if (headrInput.value === '') {
      return;
   }

   const newTodo = {
      value: headrInput.value,
      completed: false,
   };

   todoData.push(newTodo);
   headrInput.value = '';
   render();
});


render();

window.addEventListener('beforeunload', event => {
   localStorage.clear();
   localStorage.setItem('todos', JSON.stringify(todoData));
});

document.addEventListener('DOMContentLoaded', () => {
   todoData = JSON.parse(localStorage.getItem('todos'));
   render();
});
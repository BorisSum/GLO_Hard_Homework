'use strict';

class Todo {
   constructor(form, input, todoList, todoCompleted, todoContainer) {
      this.form = document.querySelector(form);
      this.input = document.querySelector(input);
      this.todoList = document.querySelector(todoList);
      this.todoCompleted = document.querySelector(todoCompleted);
      this.todoContainer = document.querySelector(todoContainer);

      this.todoData = new Map(JSON.parse(localStorage.getItem('todoList')));
   }

   addToStorage() {
      localStorage.setItem('todoList', JSON.stringify([...this.todoData]));
   }

   generateKey() {
      return `f${(+new Date()).toString(16)}`;
   }

   createElem(todoItem) {
      const li = document.createElement('li');
      let editButton = '';
      if (!todoItem.completed) {
         editButton = `<button class="todo-edit"></button>`;
      }
      const completed = todoItem.completed;
      li.classList.add('todo-item');
      li.key = todoItem.key;
      li.insertAdjacentHTML('beforeend', `
            <span class="text-todo">${todoItem.value}</span>
            <div class="todo-buttons">
               ${editButton}
					<button class="todo-remove"></button>
					<button class="todo-complete"></button>
				</div>
      `);
      if (todoItem.completed) {
         this.todoCompleted.append(li);
      } else {
         this.todoList.append(li);
      }

   }

   render() {
      this.todoList.textContent = '';
      this.todoCompleted.textContent = '';
      this.todoData.forEach(this.createElem, this);
      this.addToStorage();
   }

   addTodo(event) {

      event.preventDefault();
      if (this.input.value.trim()) {
         const newTodo = {
            value: this.input.value,
            completed: false,
            key: this.generateKey(),
         };
         this.todoData.set(newTodo.key, newTodo);
         this.input.value = '';
         this.render();
      } else {
         alert('Пустое "дело" добавить нельзя!');
      }
   }

   deleteItem(elem) {
      let reqID = null;
      let counter = 100;
      const startAnimation = () => {
         reqID = requestAnimationFrame(startAnimation);
         counter--;
         if (counter < 0) {
            counter = 100;
            cancelAnimationFrame(reqID);
            this.todoData.delete(elem.key);
            this.render();
         } else {
            elem.style.opacity = counter / 100;
         }
      };
      startAnimation();
   }

   completedItem(elem) {
      const currentTodo = this.todoData.get(elem.key);
      currentTodo.completed = !currentTodo.completed;

      let reqID = null;
      let counter = 100;

      const startAnimation = () => {
         reqID = requestAnimationFrame(startAnimation);
         counter--;
         if (counter < 0) {
            counter = 100;
            cancelAnimationFrame(reqID);
            this.todoData.set(elem.key, currentTodo);
            this.render();
         } else {
            elem.style.opacity = counter / 100;
         }
      };
      startAnimation();
   }

   editTodo(elem, key) {
      elem.addEventListener('blur', event => {
         event.preventDefault();
         const currentTodo = this.todoData.get(key);
         currentTodo.value = elem.textContent;
         this.todoData.set(key, currentTodo);
         elem.contentEditable = false;
         this.render();
      });
   }

   handler() {
      // Определить на какую из кнопок кликнул пользователь (корзинка или галочка)

      this.todoContainer.addEventListener('click', event => {
         let target = event.target;
         if (target.matches('.todo-complete')) {
            this.completedItem(target.closest('.todo-item'));
         } else if (target.matches('.todo-remove')) {
            this.deleteItem(target.closest('.todo-item'));
         } else if (target.matches('.todo-edit')) {
            const todoText = target.closest('.todo-item').querySelector('.text-todo');
            todoText.contentEditable = true;
            this.editTodo(todoText, target.closest('.todo-item').key);
         }
      });
   }

   init() {
      this.form.addEventListener('submit', this.addTodo.bind(this));
      this.handler();
      this.render();

   }
}

const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');

todo.init();

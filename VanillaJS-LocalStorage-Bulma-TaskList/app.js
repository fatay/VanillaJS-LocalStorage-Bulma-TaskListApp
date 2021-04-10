//Define UI Variables
const form = document.querySelector("#task-form");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector(".clear-tasks");
const taskInput = document.querySelector("#taskInput");
const addBtn = document.querySelector(".add-task");
const delBtn = document.querySelector(".del");

//Load all event listeners
loadEventListeners();
function loadEventListeners() {
   //Load older tasks from local storage
   document.addEventListener('DOMContentLoaded',getTasks);

   //Add task event
   addBtn.addEventListener('click', addTask);
   clearBtn.addEventListener('click', removeAll);
   document.body.addEventListener('click', delTask);
    // EVENT DELEGATION
}

//Add task
function addTask(e) {
   if(taskInput.value === '') {
      alert('Add task');
   } else {

      //Create task item 
      //--generally ul/li but i want to use -tr
      const taskItem = document.createElement('tr');
      taskItem.className = 'taskItem';
      //Create td item
      const taskContent = document.createElement('td');
      taskContent.className = 'has-background-link-light taskContent';
      //Create pin icon item
      const taskIcon = document.createElement('i');
      taskIcon.className = 'fas fa-thumbtack has-text-black icn';
      //Create text span item
      const taskText = document.createElement('span');
      taskText.className = 'has-text-black textVal';
      taskText.appendChild(document.createTextNode(taskInput.value));
      //Create delete item
      const taskDeleteBtn = document.createElement('a');
      taskDeleteBtn.className = 'del icon has-text-black';
      const taskDeleteIcon = document.createElement('i');
      taskDeleteIcon.className = 'fas fa-trash';
      taskDeleteBtn.appendChild(taskDeleteIcon);

      taskContent.appendChild(taskIcon);
      taskContent.appendChild(taskText);
      taskContent.appendChild(taskDeleteBtn);
      taskItem.appendChild(taskContent);
      taskList.appendChild(taskItem);

      //Store in local storage
      storeInLocalStorage(taskInput.value);


   }
   //Clear input
   taskInput.value = '';
   e.preventDefault();
}

function delTask(e) { 
   //HANDLING   
   if(e.target.className == 'fas fa-trash' || e.target.className == 'del icon has-text-black') {
      //Remove task from document object model(DOM)
      e.target.parentElement.parentElement.remove();
      
      //Remove task from local storage
      delTaskFromLocalStorage(e.target.parentElement.parentElement);
   }

   e.preventDefault();
}

function removeAll(e) {
   while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild);
  } //if taskList has a taskItem; delete them to list.
   window.localStorage.removeItem('tasks');
   e.preventDefault();
}

function storeInLocalStorage(task) { 
   let tasks;
   if(localStorage.getItem('tasks') === null){
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }
   
   tasks.push(task);
   localStorage.setItem('tasks', JSON.stringify(tasks));

}

function getTasks() {

   tasks = JSON.parse(localStorage.getItem('tasks'));
 
   if(tasks !== null){
      tasks.forEach(function(task) {
         if(task !== "") {
            //Create task item 
            //--generally ul/li but i want to use -tr
            const taskItem = document.createElement('tr');
            taskItem.className = 'taskItem';
            //Create td item
            const taskContent = document.createElement('td');
            taskContent.className = 'has-background-link-light taskContent';
            //Create pin icon item
            const taskIcon = document.createElement('i');
            taskIcon.className = 'fas fa-thumbtack has-text-black icn';
            //Create text span item
            const taskText = document.createElement('span');
            taskText.className = 'has-text-black textVal';
            taskText.appendChild(document.createTextNode(task));
            //Create delete item
            const taskDeleteBtn = document.createElement('a');
            taskDeleteBtn.className = 'del icon has-text-black';
            const taskDeleteIcon = document.createElement('i');
            taskDeleteIcon.className = 'fas fa-trash';
            taskDeleteBtn.appendChild(taskDeleteIcon);
   
            taskContent.appendChild(taskIcon);
            taskContent.appendChild(taskText);
            taskContent.appendChild(taskDeleteBtn);
            taskItem.appendChild(taskContent);
            taskList.appendChild(taskItem);
   
            //Clear input
            taskInput.value = '';
         }
      });
   }
}

function delTaskFromLocalStorage(taskItem) {
   let tasks; debugger;
   if(localStorage.getItem('tasks') === null) {
      tasks = [];
   } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
   }

   let content = taskItem.children[1].textContent;
   tasks.forEach(function(task, index) {
      if(content === task) {
         tasks.splice(index,1);
      }
   });

   console.log(taskItem);

  
   localStorage.setItem('tasks', JSON.stringify(tasks));
}
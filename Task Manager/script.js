//  Selecting elements
const newListInput = document.getElementById('new-list-input');
const addListBtn = document.getElementById('add-list-btn');
const listsDisplay = document.getElementById('lists-list');
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const listsContainer = document.getElementById('lists-container');
const sortAlphaBtn = document.getElementById('sort-alpha-btn');
const sortDateBtn = document.getElementById('sort-date-btn');

let lists = []; // array to store lists and  their details

// func to add a new list
function addList() {
    const listName = newListInput.value.trim();

    // handle empty list name
    if (listName === '') {
        alert('Please enter a list name');
        return;
    }


// create a new list object with name and creation date
const newList = {
    name: listName,
    tasks: [],
    createdAt: new Date()
};

// add the new list to the lists array 
lists.push(newList);

// update the list display
displayLists(lists);

// clear the input field 
newListInput.value = '';
}

// func display the lists on the page
function displayLists(listsArray) {
    listsDisplay.innerHTML = ''; // clear the current display
    
    // loop through the lists array and display each list
    listsArray.forEach( list => {
        const listItem = document.createElement('li');
        listItem.textContent = list.name;
        listItem.addEventListener('click' , () => selectList(list.name)); // select a list on click 
        listsDisplay.appendChild(listItem);
    });
}

// func to sort lists alphabetically 
function sortAlphabetically() {
    lists.sort((a,b) => a.name.localeCompare(b.name));
    displayLists(lists);
}

// func to sort lists by date 
function sortByDate() {
    lists.sort((a,b) => a.createdAt - b.createdAt);
    displayLists(lists);
}

// func to select a list and enable item input 
function selectList(listName) {
    taskInput.disables = false; // enable task input when a list is selected 
    addTaskBtn.disabled = false;

    // find the list by name 
    const selectedList = lists.find(list => list.name === listName);

    displayTasks(selectedList);
}

//  display tasks for the selected list
function displayTasks(list) {
    const listSection = document.getElementById(list.name);
    
    // if the list section (list) does not exist, create it
    if (!listSection) {
      const newSection = document.createElement('div');
      newSection.id = list.name;
      newSection.classList.add('list-section');
      newSection.innerHTML = `<h3>${list.name}</h3><ul></ul>`;
      listsContainer.appendChild(newSection);
    }
  
    // Clear and update the task display
    const taskList = document.getElementById(list.name).querySelector('ul');
    taskList.innerHTML = '';
    list.tasks.forEach(task => {
      const taskItem = document.createElement('li');
      taskItem.textContent = task;
      taskList.appendChild(taskItem);
    });
  }
  
  // func to add a task to the selected list
  function addTask() {
    const task = taskInput.value.trim();
    const selectedListName = document.querySelector('.list-section h3').textContent;
    const selectedList = lists.find(list => list.name === selectedListName);
  
    if (!task) {
      alert('Please enter a task');
      return;
    }
  
    // Add task to the selected list
    selectedList.tasks.push(task);
  
    // Update the task display for the selected list
    displayTasks(selectedList);
  
    // Clear the input field
    taskInput.value = '';
  }
  
  // Event listeners
  addListBtn.addEventListener('click', addList);
  addTaskBtn.addEventListener('click', addTask);
  sortAlphaBtn.addEventListener('click', sortAlphabetically);
  sortDateBtn.addEventListener('click', sortByDate);
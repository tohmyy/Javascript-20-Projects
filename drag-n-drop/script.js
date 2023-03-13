const addBtns = document.querySelectorAll('.add-btn:not(.solid)');
const saveItemBtns = document.querySelectorAll('.solid');
const addItemContainers = document.querySelectorAll('.add-container');
const addItems = document.querySelectorAll('.add-item');
// Item Lists
const itemLists = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

// Items
let updatedOnLoad = false;


// Initialize Arrays
let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

// Drag Functionality
let draggedItem;
let dragging = false;
let currentColumn;



// Get Arrays from localStorage if available, set default values if not
function getSavedColumns() {
  if (localStorage.getItem('backlogItems')) {
    backlogListArray = JSON.parse(localStorage.backlogItems);
    progressListArray = JSON.parse(localStorage.progressItems);
    completeListArray = JSON.parse(localStorage.completeItems);
    onHoldListArray = JSON.parse(localStorage.onHoldItems);
  } else {
    backlogListArray = ['Release the course', 'Sit back and relax'];
    progressListArray = ['Work on projects', 'Listen to music'];
    completeListArray = ['Being cool', 'Getting stuff done'];
    onHoldListArray = ['Being uncool'];
  }
}


let arrayNames = ['backlog', 'progress', 'complete', 'onHold']
// Set localStorage Arrays
function updateSavedColumns() {
  listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
  // arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
  for (i in listArrays){
    localStorage.setItem(`${arrayNames[i]}Items`, JSON.stringify(listArrays[i]))
  }
  // localStorage.setItem('backlogItems', JSON.stringify(backlogListArray));
  // localStorage.setItem('progressItems', JSON.stringify(progressListArray));
  // localStorage.setItem('completeItems', JSON.stringify(completeListArray));
  // localStorage.setItem('onHoldItems', JSON.stringify(onHoldListArray));
}

// Filter Arrays- Remove Emplty Items
function filterArray(array){

  const filteredArray = array.filter(item=>item!==null)
  return filteredArray
}

// Create DOM Elements for each list item
function createItemEl(columnEl, column, item, index) {
  // console.log('columnEl:', columnEl);
  // console.log('column:', column);
  // console.log('item:', item);
  // console.log('index:', index);
  // List Item
  const listEl = document.createElement('li');
  listEl.classList.add('drag-item')
  listEl.textContent= item
  listEl.draggable=true
  listEl.setAttribute('ondragstart', 'drag(event)')
  listEl.contentEditable = true
  listEl.id = index;
  listEl.setAttribute('onfocusout', `updateItem(${index}, ${column})`)
// Append
columnEl.appendChild(listEl)
}



// Update Columns in DOM - Reset HTML, Filter Array, Update localStorage
function updateDOM() {
  // Check localStorage once
  if(!updatedOnLoad){
    getSavedColumns()
  }
  // Backlog Column
  backlogList.textContent='';
  backlogListArray.forEach((backlogItem, index)=>{
    createItemEl(backlogList, 0, backlogItem, index);
  })
  backlogListArray = filterArray(backlogListArray)
  // Progress Column
  progressList.textContent='';
  progressListArray.forEach((progressItem, index)=>{
    createItemEl(progressList, 1, progressItem, index);
  })
  progressListArray = filterArray(progressListArray)
  // Complete Column
  completeList.textContent='';
  completeListArray.forEach((completeItem, index)=>{
    createItemEl(completeList, 2, completeItem, index);
  })
  completeListArray = filterArray(completeListArray)
  // onHold Column
  onHoldList.textContent='';
  onHoldListArray.forEach((onHoldItem, index)=>{
    createItemEl(onHoldList, 3, onHoldItem, index);
  })
  onHoldListArray = filterArray(onHoldListArray)


  // Run getSavedColumns only once, Update Local Storage
  updatedOnLoad=true
  updateSavedColumns()

}

// Update item - Delete If Necessary or Update in Array
function updateItem(id, column){
  const selectedArray = listArrays[column]
  const selectedColumnEl = itemLists[column].children
  
  if(!dragging){
    if(!selectedColumnEl[id].textContent){
      delete selectedArray[id]
    }
    else{
      selectedArray[id] = selectedColumnEl[id].textContent
    }
  }

  updateDOM()
}

// 
function addTocolumn(column){
  const itemText = addItems[column].textContent
  const selectedArray = listArrays[column];
  selectedArray.push(itemText)
  addItems[column].textContent = ''
  updateDOM()
}

// Show Add Item Input Box
function showInputBox(column){
  addBtns[column].style.visibility = 'hidden'
  saveItemBtns[column].style.display = 'flex'
  addItemContainers[column].style.display = 'flex'
}

// HideItem Input Box
function hideInputBox(column){
  addBtns[column].style.visibility = 'visible'
  saveItemBtns[column].style.display = 'none'
  addItemContainers[column].style.display = 'none'

  addTocolumn(column)

}



// Allow arrays to reflect Drag  Drop
function rebuildArrays(){
  // console.log(backlogList.children)
  // console.log(progressList.children)

  backlogListArray = []
  for(let i = 0; i<backlogList.children.length; i++){
    backlogListArray.push(backlogList.children[i].textContent)
  }
  progressListArray = []
  for(let i = 0; i<progressList.children.length; i++){
    progressListArray.push(progressList.children[i].textContent)
  }
  completeListArray = []
  for(let i = 0; i<completeList.children.length; i++){
    completeListArray.push(completeList.children[i].textContent)
  }
  onHoldListArray = []
  for(let i = 0; i<onHoldList.children.length; i++){
    onHoldListArray.push(onHoldList.children[i].textContent)
  }
  updateDOM()

}

// When Item Starts Dragging
function drag(e){
  draggedItem = e.target
  dragging = true;
  // console.log("draggedItem:", draggedItem)
}

// Column to allow for Item to Drop
function allowDrop(e){
  e.preventDefault()
}

// 
function dragEnter(column){
  itemLists[column].classList.add('over')
  currentColumn = column;
  // console.log(itemLists[column].parentElement.parentElement.style.backgroundColor='red')
}

function dragLeave(column){
  itemLists[column].classList.remove('over')
}

// Dropping Item in Column
function drop(e){

  e.preventDefault();
  itemLists.forEach((column)=>{
    column.classList.remove('over');
  })

// Add Item to Column
const parent = itemLists[currentColumn];
parent.appendChild(draggedItem)

// Dragging Complete
dragging = false;

rebuildArrays()


}

// On load
updateDOM()



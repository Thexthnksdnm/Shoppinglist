const itemform = document.getElementById('item-form')
const iteminput = document.getElementById('item-input')
const itemlist = document.getElementById('item-list')
const clearBtn = document.getElementById('clear');
const itemFilter = document.getElementById('filter')
const formBtn = itemform.querySelector('button');
let isEditmode = false;





function displayitems() {
    const itemFromstorage = getItemsFromStorage();
    itemFromstorage.forEach(item => additemToDom(item));
    checkUi();
}

function OnAddItemSubmit (e) {
    e.preventDefault();
    const newItem = iteminput.value;
    //validate input 
    if (newItem === '') {
        alert('Please add an item');
        return;
    }
    // check for edit mode 
    if (isEditmode) {
        const itemToEdit = itemlist.querySelector('.edit-mode');
        removeItemFromStorage(itemToEdit.textContent);
        itemToEdit.classList.remove('edit-mode');
        itemToEdit.remove();
        isEditmode = false;
        
    } else {
        if ( checkItemExists (newItem)) {
            alert('That item alraedy exists!');
            return;
        }
    }
     //create item Dom element
    additemToDom(newItem);
    
    //add items to local storage 
    addItemToStorage(newItem);
    checkUi();
    iteminput.value = '';
}
function additemToDom(item) {
      // create list item
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(item));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);

   
    //add item li
    itemlist.appendChild(li);

   
    
}



function createButton(classes) {
    const button = document.createElement('button');
    button.className = classes;
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon);
    return button;
   
}
function createIcon(classes) {
    const icon = document.createElement('i');
    icon.className = classes;
    return icon;
}
function addItemToStorage(item) { 
    const itemFromstorage = getItemsFromStorage();

    // add new item to array
    itemFromstorage.push(item);
    
    //convert to json string and set to local storage 
    localStorage.setItem('items',JSON.stringify(itemFromstorage));
 };

function getItemsFromStorage() {
     let itemFromstorage;
    if (localStorage.getItem('items') === null) {
        itemFromstorage = [];
        
    }
    else {
        itemFromstorage = JSON.parse(localStorage.getItem('items'));

    }
    return itemFromstorage
     
}

function onClickItem(e) {
    if (e.target.parentElement.classList.contains('remove-item')) {
        removeItem(e.target.parentElement.parentElement);
    } else {
      
         setItemToEdit(e.target);
     }
    
     
}
function checkItemExists(item) {
    const itemFromstorage = getItemsFromStorage();
    return (itemFromstorage.includes(item));
}

function setItemToEdit(item) {
    isEditmode = true;
    itemlist.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'));
    item.classList.add('edit-mode');
    formBtn.innerHTML = '<i class = "fa-solid fa-pen"></i> Update item';
    formBtn.style.backgroundColor = '#228822';
    iteminput.value = item.textContent;
}

function removeItem(item) {
    if (confirm('Are you sure')) {
       // remove item from Dom
        item.remove();
        // remove item from storage 
        removeItemFromStorage(item.textContent)
        // checkUi();
    }
    checkUi();
    
}

function removeItemFromStorage(item) {
    let itemFromstorage = getItemsFromStorage();
    
    //filter out item to be removed 
    itemFromstorage = itemFromstorage.filter((i) => i !== item);
    // reset to localstorage 
    localStorage.setItem('items', JSON.stringify(itemFromstorage));
}

function clearItem() {
    while (itemlist.firstChild) {
        itemlist.removeChild(itemlist.firstChild);
        

   
    }
    // clear fromm local storage 
    localStorage.removeItem('items')

 checkUi();
}
function filterItem(e) {
    const items = itemlist.querySelectorAll('li');
    const text = e.target.value.toLocaleLowerCase();
    console.log(text);
    items.forEach(item => {
        const itemName = item.firstChild.textContent.toLocaleLowerCase();
        if (itemName.indexOf(text) != -1) {
            item.style.display = 'flex';
        } else {
            item.style.display = 'none';
        }
    });
}

function checkUi() {
    iteminput.value = '';
    const items = itemlist.querySelectorAll('li');
    console.log(items);
    if (items.length === 0) {
        clearBtn.style.display = 'none';
        itemFilter.style.display = 'none';
        
    } else {
         clearBtn.style.display = 'block';
        itemFilter.style.display = 'block';
    }
    formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add item';
    formBtn.style.backgroundColor = '#333'
    isEditmode = false;
    
}
//initialize app
function init() {
    //event listners 
itemform.addEventListener('submit', OnAddItemSubmit);
itemlist.addEventListener('click', onClickItem);
clearBtn.addEventListener('click', clearItem);
itemFilter.addEventListener('input', filterItem);
document.addEventListener('DOMContentLoaded', displayitems);


checkUi();
}

init();

// localStorage.setItem('name', 'Brad');
// localStorage.removeItem('name');
// localStorage.clear();



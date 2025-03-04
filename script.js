const itemform = document.getElementById('item-form')
const iteminput = document.getElementById('item-input')
const itemlist = document.getElementById('item-list')

function additem(e) {
    e.preventDefault();
    const newItem = iteminput.value;
    //validate input 
    if (newItem === '') {
        alert('Please add an item');
        return;
    }
    // create list item 
    const li = document.createElement('li');
    li.appendChild(document.createTextNode(newItem));
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
  
    itemlist.appendChild(li);
    iteminput.value = '';
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

//event listners 
itemform.addEventListener('submit', additem);
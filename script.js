const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');

let items;

loadItems();

eventListeners();


function eventListeners(){
    form.addEventListener('submit',addItem)

    taskList.addEventListener('click',deleteItem)

    btnDeleteAll.addEventListener('click',deleteAll)
}

function loadItems(){
    items = getItemsFromLS();

    items.forEach(function (item){
        createItem(item);
    })
}

function getItemsFromLS(){
    if(localStorage.getItem('items')=== null){
        items = [];
    }
    else {
        items = JSON.parse(localStorage.getItem('items'));

    }
    return items;
}

function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}


function deleteItemFromLS(text){
    items = getItemsFromLS();

    items.forEach(function(item,index){
        if(item === text){
            items.splice(index,1)
        }
    })
    localStorage.setItem('items',JSON.stringify(items));
}



function createItem(text){

    const li = document.createElement('li');
    
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));
    
    

    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href','#');
    a.innerHTML='<i class="fas fa-times"></i>';
    
    li.appendChild(a);

    taskList.appendChild(li);

}


function addItem(event){

    if(input.value === ''){
        alert('Add new item please.')
    }

    createItem(input.value);

    setItemToLS(input.value);

    input.value = ''; 

    event.preventDefault();
}



function deleteItem(event){

    if(event.target.className === 'fas fa-times') {

        if(confirm('Are you sure to delete this item?')){

        event.target.parentElement.parentElement.remove();

        deleteItemFromLS(event.target.parentElement.parentElement.textContent)
    }
}

    event.preventDefault();

}


function deleteAll(event){
    if(confirm('Are you sure to delete all items? '))
    
    taskList.innerHTML = '';
    
    localStorage.clear();

    event.preventDefault();
}


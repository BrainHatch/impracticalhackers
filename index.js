document.querySelector('form').addEventListener('submit', handleSubmitForm);
document.querySelector('ul').addEventListener('click', handleCheckOrDelete);
// document.getElementById('clearAll').addEventListener('click', handleClear);

function handleSubmitForm(e) {
    e.preventDefault();
    let input = document.querySelector('input');
    if(input.value != '') {
        addTask(input.value);
    }
    input.value = '';
}

function addTask(taskVal) {
    let ul = document.querySelector('ul');
    let li = document.createElement('li');

    li.innerHTML = `
        <span class="task-item">${taskVal}</span>
        <button name="checkButton" id="checkBtn"> <i class="fas fa-check-square"></i> </button>
        <button name="deleteButton" id="deleteBtn"> <i class="fas fa-trash"></i> </button>
    `
    li.classList.add('task-list-item');
    ul.appendChild(li);
}


function handleCheckOrDelete(e) {
    if(e.target.name == 'checkButton' ) {
        checkTask(e);
    } 
    
    if(e.target.name == 'deleteButton') {
        deleteTask(e);
    }
}


function checkTask(e) {
    let item = e.target.parentNode;
    if(item.style.textDecoration == 'line-through'  ) {
        item.style.textDecoration = 'none';
    } else {
        item.style.textDecoration = 'line-through';
    }   

}

function deleteTask(e){
    let item = e.target.parentNode;
    item.addEventListener('transitionend', function() {
        item.remove();
    })
    item.classList.add('task-list-item-fall');
}
 
function clearAll() {
    document.querySelector('ul').innerHTML = '';
}
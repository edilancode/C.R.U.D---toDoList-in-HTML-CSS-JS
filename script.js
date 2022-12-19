
// Get data from localStorage.
const getBank = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
// Set data to localStorage.
const setBank = (db) => localStorage.setItem('todoList', JSON.stringify(db));

// Dynamicly create HTML elements function.
  const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo_item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-index=${index}>
        <div>${task}</div>
        <input type="button" value="X" data-index=${index}>`
    document.getElementById('todoList').appendChild(item);
  }

const clearTasks = () => {
    const todoList = document.getElementById('todoList')
    while (todoList.firstChild) {
        todoList.removeChild(todoList.lastChild);
    }
}

const screenUpdate = () => {
    clearTasks();
    const db = getBank();
    db.forEach ((item, index) => createItem(item.task, item.status, index));
}

// Insert task on list and database.
const insertItem = (event) => {
    const key = event.key;
    const text = event.target.value;
    if (key === 'Enter') {
        const db = getBank();
        db.push({'task': text, 'status': ''});
        setBank(db);
        screenUpdate();
        event.target.value = '';
    }
}

// Remove task from database.
const removeItem = (index) => {
    const db = getBank();
    db.splice (index, 1);
    setBank(db);
    screenUpdate();
}

const updateItem = (index) => {
    const db = getBank();
    db[index].status = db[index].status === '' ? 'checked' : '';
    setBank(db);
    screenUpdate();
}
const clickItem = (event) => {
    const element = event.target;
    if (element.type === 'button') {
        const index = element.dataset.index;
        removeItem(index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateItem(index);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);


screenUpdate();




  
const fs = require('fs');

const TASKS_JSON = 'tasks.json';

function loadTasks() {
    if (!fs.existsSync(TASKS_JSON)) {
        return [];
    }
    try {
        const data = fs.readFileSync(TASKS_JSON);
        return JSON.parse(data);
    } catch (err) {
        console.error(`Unable to load tasks: ${err.message}`);
        return [];
    }
}

function saveTasks(tasks) {
    try {
        fs.writeFileSync(TASKS_JSON, JSON.stringify(tasks, null, 2));
    } catch (err) {
        console.error(`Unable to load tasks: ${err.message}`);
    }

}

function getNextId(tasks) {
    return tasks.length === 0 ? 1 : Math.max(...tasks.map(el => el.id)) + 1;
}

function findTaskbyID(tasks, id) {
    return tasks.find(task => task.id === parseInt(id));
}

function addTask(title) {
    const tasks = loadTasks();
    const id = getNextId(tasks);
    tasks.push({ id, title, status: 'todo' });
    saveTasks(tasks);
    console.log(`Added task: ${title}`);
}

function markStatus(id, stat) {
    const tasks = loadTasks();
    const task = findTaskbyID(tasks, id);
    if (!task) {
        return console.log(`Task #${id} not found.`);
    }
    task.status = stat;
    saveTasks(tasks);
    console.log(`Task #${id} marked as ${stat}`);
}

function updatetasks(id, data) {
    const tasks = loadTasks();
    const task = findTaskbyID(tasks, id);
    if (!task) {
        return console.log(`Task #${id} not found.`);
    }
    task.title = data;
    saveTasks(tasks);
    console.log(`Task #${id} updated successfully`);
}

function deleteTask(id) {
    const tasks = loadTasks();
    const idx = tasks.findIndex(el => el.id === parseInt(id));

    if (idx === -1) {
        console.log('Task not found');
        return;
    }

    tasks.splice(idx, 1);
    saveTasks(tasks);
    console.log(`Task #${id} deleted successfully`);
}

function listTasks(status = null) {
    const tasks = loadTasks();
    if (tasks.length === 0) console.log('No tasks found');

    const filtered = status ? tasks.filter(task => task.status === status) : tasks
    if (filtered.length === 0) {
        return console.log(`No tasks with status "${status}".`);
    }
    filtered.forEach(task => {
        console.log(`${task.id}. [${task.status}] ${task.title}`);
    });
}

// CL arguments
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
    case 'add':
        const title = args.slice(1).join(' ');
        if (!title) console.log('Please provide a task title.');
        else addTask(title);
        break;
    case 'update':
        const updatedId = args[1];
        const newTitle = args.slice(2).join(' ');
        if (!updatedId || !newTitle) {
            console.log('Element not found');
        } else {
            updatetasks(updatedId, newTitle);
        }
        break;
    case 'delete':
        const delId = args[1];
        if (!delId) console.log('ID not found')
        else deleteTask(delId);
        break;
    case 'start':
        if (!args[1]) console.log('ID not found')
        else markStatus(args[1], 'in-progress');
        break;
    case 'done':
        if (!args[1]) console.log('ID not found')
        else markStatus(args[1], 'done');
        break;
    case 'list':
        listTasks();
        break;
    case 'list-done':
        listTasks('done');
        break;
    case 'list-todo':
        listTasks('todo');
        break;
    case 'list-in-progress':
        listTasks('in-progress');
        break;
    default:
        console.log(`
Task Tracker CLI
Commands:
  add <task title>             Add a new task
  update <num> <new title>     Update a task title
  delete <num>                 Delete a task
  start <num>                  Mark a task as in-progress
  done <num>                   Mark a task as done
  list                         List all tasks
  list-done                    List tasks that are done
  list-todo                    List tasks that are not done (todo)
  list-in-progress             List tasks in progress
  `);
}

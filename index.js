const express = require('express');
const { resolve } = require('path');
let cors = require('cors');

const app = express();
const port = 3010;
app.use(cors());

let tasks = [
  { taskId: 1, text: 'Fix bug #101', priority: 2 },
  { taskId: 2, text: 'Implement feature #202', priority: 1 },
  { taskId: 3, text: 'Write documentation', priority: 3 },
];

function appendtasks(taskId, text, priority, tasks) {
  taskCopytasks.slice();
  let newTask = {};
  (newTask.taskId = taskId),
    (newTask.text = text),
    (newTask.priority = priority);
  //console.log(newTask);
  taskCopy.push(newTask);
  return taskCopy;
}
app.get('/tasks/add', (req, res) => {
  taskId = req.query.taskId;
  text = req.query.text;
  priority = req.query.priority;

  let finalTaskList = appendtasks(taskId, text, priority, tasks);
  res.json({ tasks: finalTaskList });
});

app.get('/tasks', (req, res) => {
  res.json({ tasks: tasks });
});

function sortedTaskPriority(task1, task2) {
  return task1.priority - task2.priority;
}

app.get('/tasks/sort-by-priority', (req, res) => {
  tasksCopy = tasks.slice();
  tasksCopy.sort(sortedTaskPriority);
  res.json({ tasks: tasksCopy });
});

function updatPiority(tasks, taskId, priority) {
  let taskCopy = tasks.slice();
  for (i = 0; i < taskCopy.length; i++) {
    if (taskCopy.taskId === taskId) {
      taskCopy[i].priority = priority;
    }
  }
  return taskCopy;
}
app.get('/tasks/edit-priority', (req, res) => {
  taskId = parseInt(req.query.taskId);
  priority = parseInt(req.query.priority);

  let updatedList = updatPiority(tasks, taskId, priority);
  res.json({ tasks: updatedList });
});

function updateText(tasks, taskId, text) {
  let taskCopy = tasks.slice();
  for (i = 0; i < taskCopy.length; i++) {
    if (taskCopy.taskId === taskId) {
      taskCopy[i].text = text;
    }
  }
  return taskCopy;
}
app.get('/tasks/edit-text', (req, res) => {
  taskId = parseInt(req.query.taskId);
  text = req.query.text;

  let updatedList = updateText(tasks, taskId, text);
  res.json({ tasks: updatedList });
});

function deleteTask(task, taskId) {
  return taskId != task.taskId;
}
app.get('/tasks/delete', (req, res) => {
  taskId = parseInt(req.query.taskId);
  let finalList = tasks.filter((task) => deleteTask(task, taskId));

  res.json({ tasks: finalList });
});

function priorityTask(task, priority) {
  return priority === task.priority;
}
app.get('/tasks/filter-by-priority', (req, res) => {
  priority = parseInt(req.query.priority);
  let finalList = tasks.filter((task) => priorityTask(task, priority));

  res.json({ task: finalList });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

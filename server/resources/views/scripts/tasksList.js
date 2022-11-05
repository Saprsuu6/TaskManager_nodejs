import MyTask from "../models/task.js";
import timeTask from "../models/timeTask.js";
import {
  addAllTasks,
  addAllTimeTasks,
  addPreparedTask,
  addTasks,
  clearPrepared,
  removeList,
} from "./tasksList.fetches.js";

const criterion = document.getElementById("criterion");
const submitBtn = document.getElementById("submitBtn");
const taskListDay = document.getElementById("taskListDay");
const taskListWeek = document.getElementById("taskListWeek");
const taskListMonth = document.getElementById("taskListMonth");

const taskList = document.getElementById("taskList");

export let fillTimeList = (task, index) => {
  const newTimeTask = new timeTask(task.criterion, task.tasks);
  newTimeTask.isActive = task.isActive;
  newTimeTask.index = index;

  newTimeTask.setCreatingDate(task.creatingDate);

  var element = newTimeTask.returnTasksTag();
  console.log(element.getAttribute("isActive"));

  if (!newTimeTask.isActive) {
    element.style.backgroundColor = "pink";
  }

  element.id = index;

  switch (newTimeTask.criterion.toLowerCase()) {
    case "to day":
      taskListDay.append(element);
      break;
    case "to week":
      taskListWeek.append(element);
      break;
    case "to month":
      taskListMonth.append(element);
      break;
  }
  setButtonsEvents(element);
};

export let fillTaskList = (task, index) => {
  const view_task = new MyTask(
    task.name,
    task.terms,
    task.describe,
    task.tags,
    task.priority
  );

  view_task.setCreatingDate(task.creatingDate);

  var element = view_task.returnTaskTegForProject();
  element.id = index;
  taskList.append(element);

  var buttons = element.getElementsByTagName("button");
  buttons[0].addEventListener("click", addPreparedTask);
};

export let changeTaskIcon = (flag, index) => {
  const currentLi = taskList.childNodes[index];
  let buttons = currentLi.getElementsByTagName("button");

  if (flag) {
    buttons[0].className = "btn btn-outline-primary";
    buttons[0].innerText = "✅";
  } else {
    buttons[0].className = "btn btn-outline-danger";
    buttons[0].innerText = "❌";
  }
};

export let removeTimeList = (index, criterion) => {
  var removed;

  switch (criterion.toLowerCase()) {
    case "to day":
      removed = taskListDay.childNodes[index];
      taskListDay.removeChild(removed);
      break;
    case "to week":
      removed = taskListWeek.childNodes[index];
      taskListWeek.removeChild(removed);
      break;
    case "to month":
      removed = taskListMonth.childNodes[index];
      taskListMonth.removeChild(removed);
      break;
  }

  rewriteIndexes();
};

export let resetTasksButtons = () => {
  let tasks = taskList.childNodes;

  tasks.forEach((element) => {
    let buttons = element.getElementsByTagName("button");
    buttons[0].className = "btn btn-outline-primary";
    buttons[0].innerText = "✅";
  });
};

export let addTasksToList = (criterion, tasks) => {
  const newTimeTask = new timeTask(criterion, tasks);

  var first = taskListDay.childNodes[0];
  var element = newTimeTask.returnTasksTag();

  switch (criterion.toLowerCase()) {
    case "to day":
      if (taskListDay.childElementCount === 0) {
        taskListDay.appendChild(element);
      }

      taskListDay.appendChild(element, first);
      break;
    case "to week":
      if (taskListWeek.childElementCount === 0) {
        taskListWeek.appendChild(element);
      }

      taskListWeek.appendChild(element, first);
      break;
    case "to month":
      if (taskListMonth.childElementCount === 0) {
        taskListMonth.appendChild(element);
      }

      taskListMonth.appendChild(element, first);
      break;
  }
  setButtonsEvents(element);
  rewriteIndexes();
};

let setButtonsEvents = (element) => {
  var buttons = element.getElementsByTagName("button");

  buttons[0].addEventListener("click", removeList);
};

export let rewriteIndexes = () => {
  for (var i = 0; i < taskListDay.childElementCount; i++) {
    taskListDay.childNodes[i].id = i;
    rewriteSubIndexes(taskListDay, i);
  }

  for (var i = 0; i < taskListWeek.childElementCount; i++) {
    taskListWeek.childNodes[i].id = i;
    rewriteSubIndexes(taskListWeek, i);
  }

  for (var i = 0; i < taskListMonth.childElementCount; i++) {
    taskListMonth.childNodes[i].id = i;
    rewriteSubIndexes(taskListMonth, i);
  }
};

let rewriteSubIndexes = (taskList, index) => {
  const list = taskList.childNodes[index].querySelector("ul").childNodes;
  for (let j = 0; j < list.length; j++) {
    list[j].id = j;
  }
};

document.addEventListener("DOMContentLoaded", async (event) => {
  clearPrepared();
  addAllTasks();
  addAllTimeTasks();
});

submitBtn.addEventListener("click", (event) => {
  addTasks(event, criterion.options[criterion.selectedIndex].value);
});

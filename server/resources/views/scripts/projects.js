import MyTask from "../models/task.js";
import {
  addProject,
  addAllTasks,
  addAllProjects,
  addPreparedTask,
} from "./project.fetches.js";

export const projectId = document.getElementById("id");
export const projectName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const editBtn = document.getElementById("editBtn");

const taskList = document.getElementById("taskList");

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

document.addEventListener("DOMContentLoaded", async (event) => {
  addAllTasks(event);
  addAllProjects(event);
});

submitBtn.addEventListener("click", addProject);

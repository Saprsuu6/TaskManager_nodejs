import MyProject from "../models/project.js";
import MyTask from "../models/task.js";
import {
  addProject,
  addAllTasks,
  addAllProjects,
  addPreparedTask,
  removeTask,
  clearPrepared,
} from "./project.fetches.js";

export const projectId = document.getElementById("id");
export const projectName = document.getElementById("name");
const submitBtn = document.getElementById("submitBtn");
const editBtn = document.getElementById("editBtn");

const taskList = document.getElementById("taskList");
const projectList = document.getElementById("projectList");

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

export let clearFields = () => {
  projectName.value = "";
};

export let resetTasksButtons = () => {
  let tasks = taskList.childNodes;

  tasks.forEach((element) => {
    let buttons = element.getElementsByTagName("button");
    buttons[0].className = "btn btn-outline-primary";
    buttons[0].innerText = "✅";
  });
};

export let addProjectToList = (project) => {
  const view_project = new MyProject(project.name, project.tasks);

  var first = projectList.childNodes[0];
  var element = view_project.returnProjectTag();
  projectList.insertBefore(element, first);

  setButtonsEvents(element);
  rewriteIndexes();
};

let setButtonsEvents = (element) => {
  var buttons = element.getElementsByTagName("button");

  buttons[0].addEventListener("click", removeTask);
};

export let removeTaskFromList = (index) => {
  var removed = projectList.childNodes[index];
  projectList.removeChild(removed);

  rewriteIndexes();
};

export let fillProjectList = (project, index) => {
  const view_project = new MyProject(project.name, project.tasks);

  view_project.setCreatingDate(project.creatingDate);

  var element = view_project.returnProjectTag();
  element.id = index;
  projectList.append(element);

  setButtonsEvents(element);
};

export let rewriteIndexes = () => {
  for (var i = 0; i < projectList.childElementCount; i++) {
    projectList.childNodes[i].id = i;
  }
};

document.addEventListener("DOMContentLoaded", async (event) => {
  clearPrepared();
  addAllTasks(event);
  addAllProjects(event);
});

submitBtn.addEventListener("click", addProject);

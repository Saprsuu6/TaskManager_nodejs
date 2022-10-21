import MyTask from "../models/task.js";
import {
  addTask,
  getCurrentTask,
  getSurchedCurrentTask,
  loadList,
  removeTask,
  updateTask,
} from "./tasks.fetches.js";

export const taskId = document.getElementById("id");
export const taskName = document.getElementById("name");
const radioDatetime = document.getElementById("radioDatetime");
export const radioDate = document.getElementById("radioDate");
export const taskTermsDatetime = document.getElementById("datetime");
export const taskTermsDate = document.getElementById("date");
export const taskDescribe = document.getElementById("describe");
export const taskTags = document.getElementById("tags");
const radioHight = document.getElementById("radioHight");
const radioNormal = document.getElementById("radioNormal");
const radioLow = document.getElementById("radioLow");
const submitBtn = document.getElementById("submitBtn");
const editBtn = document.getElementById("editBtn");
const searchCriterion = document.getElementById("search");
const fieldForSearch = document.getElementById("fieldForSearch");

const taskList = document.getElementById("taskList");
var criterion = null;

searchCriterion.addEventListener("change", (event) => {
  fieldForSearch.placeholder = "Enter task " + event.target.value;
  criterion = event.target.value;
  if (fieldForSearch.value !== "") {
    fieldForSearch.value = "";
  }
});

fieldForSearch.addEventListener("input", (event) => {
  if (event.target.value === "") {
    clearList();
    loadList();
  } else {
    getSurchedCurrentTask(event.target.value, criterion);
  }
});

radioDatetime.addEventListener("change", (event) => {
  if (taskTermsDate.value != "") {
    taskTermsDate.value = "";
  }

  inverceDateTime(true);
});

radioDate.addEventListener("change", (event) => {
  if (taskTermsDatetime.value != "") {
    taskTermsDatetime.value = "";
  }

  inverceDateTime(false);
});

taskTags.addEventListener("click", (event) => {
  if (taskTags.value === "") taskTags.value = "#";
});

taskTags.addEventListener("input", (event) => {
  let correctDigit;

  if (event.data != null) {
    correctDigit = event.data.match(/^[a-z|A-Z|а-я|А-Я|0-9|#]$/);
  }

  if (correctDigit === null) {
    let string = taskTags.value.replace(event.data, "");
    taskTags.value = string.toLowerCase().trim();
  } else {
    taskTags.value = taskTags.value.toLowerCase().trim();
  }
});

export let getPriority = () => {
  if (radioHight.checked) return "hight";
  else if (radioNormal.checked) return "middle";
  else if (radioLow.checked) return "low";
};

export let clearFields = () => {
  if (taskName.value != "") {
    taskName.value = "";
    taskTermsDate.value = "";
    taskTermsDatetime.value = "";
    taskDescribe.value = "";
    taskTags.value = "";
    radioHight.checked = true;
    radioDate.checked = true;
    taskTermsDate.disabled = false;
    taskTermsDatetime.disabled = true;
  }
};

let inverceDateTime = (flag) => {
  if (flag) {
    radioDatetime.checked = true;
    taskTermsDatetime.disabled = false;
    taskTermsDate.disabled = true;
  } else {
    radioDate.checked = true;
    taskTermsDatetime.disabled = true;
    taskTermsDate.disabled = false;
  }
};

export let rewriteIndexes = () => {
  for (var i = 0; i < taskList.childElementCount; i++) {
    taskList.childNodes[i].id = i;
  }
};

let setButtonsEvents = (element) => {
  var buttons = element.getElementsByTagName("button");

  buttons[0].addEventListener("click", async (event) => {
    if (fieldForSearch.value !== "") {
      fieldForSearch.value = "";
    }
    clearList();
    loadList();
    clearFields();
    await getCurrentTask(
      event.target.parentNode.parentNode.parentNode.parentNode.parentNode
    );
  });
  buttons[1].addEventListener("click", (event) => {
    if (fieldForSearch.value !== "") {
      fieldForSearch.value = "";
    }
    clearList();
    loadList();
    removeTask(event);
  });
};

export let clearList = () => {
  if (taskList.childNodes.length > 0) {
    taskList.innerHTML = "";
  }
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

  var element = view_task.returnTaskTeg();
  element.id = index;
  taskList.append(element);

  setButtonsEvents(element);
};

export let addTaskToList = (task) => {
  const view_task = new MyTask(
    task.name,
    task.terms,
    task.describe,
    task.tags,
    task.priority
  );

  var first = taskList.childNodes[0];
  var element = view_task.returnTaskTeg();
  taskList.insertBefore(element, first);

  setButtonsEvents(element);
  rewriteIndexes();
};

export let removeTaskFromList = (index) => {
  var removed = taskList.childNodes[index];
  taskList.removeChild(removed);

  rewriteIndexes();
};

export let prepareToEditTask = (group) => {
  let task = group.task;
  let index = group.index;

  taskId.value = index;
  taskName.value = task.name;
  task.terms.includes("T")
    ? (inverceDateTime(true), (taskTermsDatetime.value = task.terms))
    : (inverceDateTime(false), (taskTermsDate.value = task.terms));
  taskDescribe.value = task.describe === "---" ? "" : task.describe;
  if (task.tags === "---") {
    taskTags.value = "";
  } else {
    let tags = task.tags.toString();
    tags = tags.replace(",", "#");
    taskTags.value = "#" + tags;
  }
  switch (task.priority) {
    case "hight":
      radioHight.checked = true;
      break;
    case "middle":
      radioNormal.checked = true;
      break;
    case "low":
      radioLow.checked = true;
      break;
  }

  submitBtn.disabled = true;
  editBtn.disabled = false;
};

export let editTask = (response) => {
  const index = response.index;
  const task = response.task;

  var currentLi = taskList.childNodes[index];

  const newTask = new MyTask(
    task.name,
    task.terms,
    task.describe,
    task.tags,
    task.priority
  );

  var element = newTask.returnTaskTeg();
  element.id = currentLi.id;
  taskList.replaceChild(element, currentLi);

  setButtonsEvents(element);

  submitBtn.disabled = false;
  editBtn.disabled = true;
};

document.addEventListener("DOMContentLoaded", () => {
  loadList();
  fieldForSearch.placeholder = "Enter task " + searchCriterion.value;
  criterion = searchCriterion.value;
});
submitBtn.addEventListener("click", (event) => {
  if (fieldForSearch.value !== "") {
    fieldForSearch.value = "";
  }
  clearList();
  loadList();
  addTask(event);
});
editBtn.addEventListener("click", (event) => {
  if (fieldForSearch.value !== "") {
    fieldForSearch.value = "";
  }
  clearList();
  loadList();
  updateTask(event);
});

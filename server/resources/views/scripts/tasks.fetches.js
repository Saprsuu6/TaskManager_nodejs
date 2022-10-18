import {
  addTaskToList,
  clearFields,
  editTask,
  fillTaskList,
  getPriority,
  prepareToEditTask,
  radioDate,
  removeTaskFromList,
  taskDescribe,
  taskId,
  taskName,
  taskTags,
  taskTermsDate,
  taskTermsDatetime,
} from "./tasks.js";

export async function loadList(event) {
  const response = fetch("/allTasks", {
    method: "POST",
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        fillTaskList(data[i], i);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function addTask(event) {
  if (taskName.value === "") alert("You have to set task name");
  else if (taskTermsDatetime.value === "" && taskTermsDate.value === "")
    alert("You have to set task terms");
  else {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        data: getTaskJSON(),
      }),
    })
      .then(async (res) => {
        return await res.json();
      })
      .then(async (data) => {
        clearFields();
        addTaskToList(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function removeTask(event) {
  var currentLi =
    event.target.parentNode.parentNode.parentNode.parentNode.parentNode;

  const response = fetch("/", {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      index: currentLi.id,
    }),
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      clearFields();
      removeTaskFromList(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function updateTask(event) {
  var index = taskId.value;

  const response = fetch("/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      index: index,
      data: getTaskJSON(),
    }),
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      clearFields();
      editTask(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function getCurrentTask(currentLi) {
  const response = fetch("/currentTask", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      index: currentLi.id,
    }),
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      prepareToEditTask(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

let getTaskJSON = () => {
  return {
    name: taskName.value.trim(),
    terms: radioDate.checked ? taskTermsDate.value : taskTermsDatetime.value,
    describe: taskDescribe.value.trim(),
    tags:
      taskTags.value === "" || taskTags.value === "#"
        ? undefined
        : taskTags.value.trim(),
    priority: getPriority(),
  };
};

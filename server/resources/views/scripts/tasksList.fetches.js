import {
  addTasksToList,
  changeTaskIcon,
  fillTaskList,
  fillTimeList,
  removeTimeList,
  resetTasksButtons,
} from "./tasksList.js";

export async function clearPrepared() {
  const response = fetch("/crearPrepared", {
    method: "GET",
  });
}

export async function addAllTimeTasks() {
  const response = fetch("/allTimeTasks", {
    method: "POST",
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        fillTimeList(data[i], i);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function addAllTasks() {
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

export async function addPreparedTask(event) {
  const currentLi = event.target.parentNode.parentNode.parentNode;

  const response = fetch("/preparedTask", {
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
      changeTaskIcon(data.flag, data.index);
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function addTasks(event, criterion) {
  const response = await fetch("/tasksList", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      criterion: criterion,
    }),
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      if (data.exception) {
        let exception = data.exception;
        alert(exception);
      } else {
        addTasksToList(data.criterion, data.tasks);
        resetTasksButtons();
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

export async function removeList(event) {
  if (confirm("Would you like to remove this list?")) {
    var currentLi =
      event.target.parentNode.parentNode.parentNode.parentNode.parentNode;

    const response = fetch("/tasksList", {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        index: currentLi.id,
        criterion: currentLi.getAttribute("criterion"),
      }),
    })
      .then(async (res) => {
        return await res.json();
      })
      .then((data) => {
        removeTimeList(data.index, data.criterion);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

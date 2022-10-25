import { changeTaskIcon, fillTaskList } from "./tasksList.js";

export async function clearPrepared() {
  const response = fetch("/crearPrepared", {
    method: "GET",
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

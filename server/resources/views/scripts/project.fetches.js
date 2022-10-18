import { changeTaskIcon, fillTaskList, projectName } from "./projects.js";

export async function addAllTasks() {
  const response = fetch("/projects/allTasks", {
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

export async function addAllProjects() {
  // console.log("asdasd");
}

export async function addPreparedTask(event) {
  const currentLi = event.target.parentNode.parentNode.parentNode;

  const response = fetch("/projects/preparedTask", {
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

export async function addProject(event) {
  if (projectName.value === "") alert("You have to set project name");
  else {
    const response = await fetch("/projects", {
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
      .then((data) => {
        console.log(data);
        console.log(data.tasks);
        // to do
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

let getTaskJSON = () => {
  return {
    name: projectName.value.trim(),
  };
};

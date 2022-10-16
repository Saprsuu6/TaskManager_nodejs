import { changeTaskIcon, fillTaskList, projectName } from "./projects.js";

export async function addAllTasks() {
  const response = fetch("/projects/allTasks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  }).then(async (res) => {
    const response = await res.json();

    for (let i = 0; i < response.length; i++) {
      fillTaskList(response[i], i);
    }
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
  }).then(async (res) => {
    const response = await res.json();

    changeTaskIcon(response.flag, response.index);
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
        const response = await res.json();
        console.log(response);
        // to do
      })
      .catch((exception) => {
        console.log(exception);
      });
  }
}

let getTaskJSON = () => {
  return {
    name: projectName.value.trim(),
  };
};

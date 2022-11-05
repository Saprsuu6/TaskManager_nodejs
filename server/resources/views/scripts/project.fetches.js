import {
  addProjectToList,
  changeTaskIcon,
  clearFields,
  fillProjectList,
  fillTaskList,
  projectName,
  removeTaskFromList,
  resetTasksButtons,
} from "./projects.js";

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

export async function addAllProjects() {
  const response = fetch("/allProjects", {
    method: "POST",
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      for (let i = 0; i < data.length; i++) {
        fillProjectList(data[i], i);
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
        data: getProjectsJSON(),
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
          addProjectToList(data);
          clearFields();
          resetTasksButtons();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export async function removeTask(event) {
  if (confirm("Would you like to remove this project?")) {
    var currentLi =
      event.target.parentNode.parentNode.parentNode.parentNode.parentNode;

    const response = fetch("/projects", {
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
}

let getProjectsJSON = () => {
  return {
    name: projectName.value.trim(),
  };
};

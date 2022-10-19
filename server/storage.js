import fetch from "node-fetch";

export var tasks = [];
export var projects = [];
export var preparedTasks = [];

let fillTasks = async () => {
  await fetch("http://localhost:3000/tasks", {
    method: "GET",
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      tasks = data;
    })
    .catch(console.log);
};

let fillProjects = async () => {
  await fetch("http://localhost:3000/projects", {
    method: "GET",
  })
    .then(async (res) => {
      return await res.json();
    })
    .then((data) => {
      projects = data;
    })
    .catch(console.log);
};

let fillTasksDB = () => {
  console.log("asdasd");
  fetch("http://localhost:3000/tasks", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  })
    .then(async (res) => {
      console.log(await res.json());
    })
    .catch(console.log);
};

let fillProjectsDB = () => {
  fetch("http://localhost:3000/projects", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks),
  }).catch(console.log);
};

export async function fillStorage() {
  await fillTasks();
  await fillProjects();
}

export async function fillDB() {
  fillTasksDB(); // метод PUSH tasks (array)
  //fillProjectsDB(); // метод PUSH projects (array)
}

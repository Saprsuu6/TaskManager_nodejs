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
      console.log(data);
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
      console.log(data);
    })
    .catch(console.log);
};

let fillTasksDB = () => {
  console.log("asdasd");
  fetch("http://localhost:3000/tasks", {
    // фетч запрос на сервер к tasks (должен быть определён руками)
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tasks), // отправка массива в виде json формата
  })
    .then(async (res) => {
      console.log(await res.json()); // получение ответа и прсинг (просто чтобы знать что возвращается)
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

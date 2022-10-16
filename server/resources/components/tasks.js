import { tasks } from "../../storage.js";
import MyTask from "../views/models/task.js";

export function addTask(req, res, next) {
  const data = req.body.data;
  let tags = data.tags;

  if (tags != undefined) {
    tags = tags.split("#");
    tags.splice(0, 1);
  }

  const task = new MyTask(
    data.name,
    data.terms,
    data.describe,
    tags,
    data.priority
  );

  tasks.splice(0, 0, task);
  res.send(JSON.stringify(task));

  next();
}

export function removeTask(req, res, next) {
  const index = req.body.index;
  tasks.splice(index, 1);
  res.send(JSON.stringify(index));

  next();
}

export function updateTask(req, res, next) {
  const data = req.body.data;
  const index = req.body.index;
  let tags = data.tags;

  if (tags != undefined) {
    tags = tags.split("#");
    tags.splice(0, 1);
  }

  const task = new MyTask(
    data.name,
    data.terms,
    data.describe,
    tags,
    data.priority
  );

  tasks[index] = task;
  res.send(
    JSON.stringify({
      index,
      task,
    })
  );

  next();
}

export function getCurrentTask(req, res, next) {
  const index = req.body.index;
  res.send(
    JSON.stringify({
      task: tasks[index],
      index: index,
    })
  );

  next();
}

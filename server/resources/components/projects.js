import { preparedTasks, tasks } from "../../storage.js";
import MyProject from "../views/models/project.js";

export function addPreparedTask(req, res, next) {
  const current_task = tasks[req.body.index];

  const index = preparedTasks.findIndex((task) => {
    return task.getCreatingDate() === current_task.getCreatingDate();
  });

  if (index !== -1) {
    preparedTasks.splice(index, 1);
    res.send(
      JSON.stringify({
        flag: true,
        index: req.body.index,
      })
    );
  } else {
    preparedTasks.push(current_task);
    res.send(
      JSON.stringify({
        flag: false,
        index: req.body.index,
      })
    );
  }

  next();
}

export function addProject(req, res, next) {
  const data = req.body.data;
  const project = null;

  try {
    project = new MyProject(data.name);
    // send response
  } catch (exception) {
    throw exception;
  }

  //res.end();
  next();
}

import { preparedTasks, projects, tasks } from "../../storage.js";
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
  let project = null;
  let tasksToProject = undefined;

  if (preparedTasks.length > 0) {
    tasksToProject = preparedTasks;
  }

  try {
    project = new MyProject(data.name, tasksToProject);
    projects.splice(0, 0, project);
    console.log(projects);
    res.send(JSON.stringify(project));
  } catch (exception) {
    throw exception;
    //res.status(500);
    //res.end();
  }

  next();
}

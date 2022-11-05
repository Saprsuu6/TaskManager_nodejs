import { preparedTasks, timeTasks } from "../../storage.js";
import timeTask from "../views/models/timeTask.js";

var newTimeTask = null;

export function removeTimeList(req, res, next) {
  const index = req.body.index;
  timeTasks.splice(index, 1);

  refreshIndexes();

  res.send(
    JSON.stringify({
      index: index,
      criterion: req.body.criterion,
    })
  );

  next();
}

export function addTimeTask(req, res, next) {
  const criterion = req.body.criterion;
  let tasksToList = undefined;

  if (preparedTasks.length > 0) {
    tasksToList = [];

    preparedTasks.forEach((element) => {
      tasksToList.push(element);
    });
  }

  try {
    newTimeTask = new timeTask(criterion, tasksToList);
    preparedTasks.length = 0;

    timeTasks.splice(0, 0, newTimeTask);

    refreshIndexes();

    newTimeTask.startTimer(timeTasks).then((value) => {
      newTimeTask.isActive = false;
    });

    res.send(JSON.stringify(newTimeTask));
  } catch (exception) {
    res.send(JSON.stringify({ exception: exception.toString() }));
  }

  next();
}

let refreshIndexes = () => {
  for (let i = 0; i < timeTasks.length; i++) {
    timeTasks[i].index = i;
    for (let j = 0; j < timeTasks[i].tasks.length; j++) {
      timeTasks[i].tasks[j].index = j;
    }
  }
};

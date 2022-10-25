import express from "express";
import path from "path";
import {
  addPreparedTask,
  addProject,
  removeProject,
} from "./resources/components/projects.js";
import {
  addTask,
  getCurrentTask,
  getSearchedTask,
  removeTask,
  updateTask,
} from "./resources/components/tasks.js";
import { tasks, projects, preparedTasks } from "./storage.js";

const __dirname = path.resolve();
const router = express.Router();
const urlencodedParser = express.urlencoded({ extended: false });

router
  .route("/")
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, "resources/views", "tasks.html"));
  })
  .post(addTask, (req, res) => {})
  .delete(removeTask, (req, res) => {})
  .put(updateTask, (req, res) => {});

router.route("/currentTask").post(getCurrentTask, (req, res) => {});

router.route("/allTasks").post((req, res) => {
  res.send(JSON.stringify(tasks));
});

router.route("/searchedTask").post(getSearchedTask, (req, res) => {});

router
  .route("/projects")
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, "resources/views", "projects.html"));
    //res.render("projects");
  })
  .post(addProject, (req, res) => {})
  .delete(removeProject, (req, res) => {});

router.route("/projects/allProjects").post((req, res) => {
  res.send(JSON.stringify(projects));
});

router.route("/preparedTask").post(addPreparedTask, (req, res) => {});

router.route("/tasksList").get((req, res) => {
  res.sendFile(path.resolve(__dirname, "resources/views", "tasksList.html"));
});

router.route("/crearPrepared").get((req, res) => {
  if (preparedTasks.length > 0) preparedTasks.length = 0;
});

export default router;

import express from "express";
import path from "path";
import {
  addPreparedTask,
  addProject,
} from "./resources/components/projects.js";
import {
  addTask,
  getCurrentTask,
  removeTask,
  updateTask,
} from "./resources/components/tasks.js";
import { tasks, projects } from "./storage.js";

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

router
  .route("/projects")
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, "resources/views", "projects.html"));
  })
  .post(addProject, (req, res) => {});

router.route("/projects/allTasks").post((req, res) => {
  res.send(JSON.stringify(tasks));
});

router.route("/projects/preparedTask").post(addPreparedTask, (req, res) => {});

export default router;

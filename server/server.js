import express from "express";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes.js";
import fetch from "node-fetch";

///////////////////////////////////////////////
export async function addAllTasks() {
  await fetch("http://localhost:3000/posts")
    .then(async (res) => {
      const response = await res.json();
      console.log(response);
    })
    .catch(console.log);
}

addAllTasks();
///////////////////////////////////////////////

const PORT = 8080;
const app = express();
const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "resources/views")));
app.use(router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

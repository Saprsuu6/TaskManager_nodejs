import express from "express";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes.js";

const PORT = 3000;
const app = express();
const __dirname = path.resolve();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "resources/views")));
app.use(router);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

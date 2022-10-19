import express from "express";
import path from "path";
import bodyParser from "body-parser";
import router from "./routes.js";
import { fillDB, fillStorage } from "./storage.js";

class Server {
  constructor() {
    this.PORT = 8080;
    this.app = express();
    this.__dirname = path.resolve();
  }

  deconstructor() {}

  run() {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(
      express.static(path.resolve(this.__dirname, "resources/views"))
    );
    this.app.use(router);

    const server = this.app.listen(this.PORT, async () => {
      console.log(`http://localhost:${this.PORT}`);
    });
  }
}

const server = new Server();
//await fillDB();
//await fillStorage();
server.run();

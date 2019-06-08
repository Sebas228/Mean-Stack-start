import express from "express";
import compression from "compression";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";

//Configs
import { keys } from "./config/keys";

// Database
import "./config/database";

// load Routes
import userRoutes from "./routes/UserRoutes";
import Auth from "./auth/Auth";

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set("port", keys.Port);

    // Middlewares
    this.app.use(morgan("dev"));
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(compression());
    this.app.use(helmet());
    this.app.use("*", cors());
  }

  routes() {
    this.app.use("/api/users", userRoutes);
    this.app.use("/api/auth", Auth.login);
  }

  start() {
    this.app.listen(this.app.get("port"), () => {
      console.log("Server on port: ", this.app.get("port"));
    });
  }
}

const App = new Server();
App.start();

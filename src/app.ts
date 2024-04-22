import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

import HomeRouter from "./routes/home";
import UserRouter from "./routes/user";
import EmployeeRouter from "./routes/employee";
import AuthRouter from "./routes/authentication";

import dotenv from "dotenv";
import dbService from "./service/db";

const jwt = require("jsonwebtoken");
import { createServer } from "http";
const corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200,
};
const app = express();
const httpServer = createServer(app);
dotenv.config();
app.use(cors(corsOptions));

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Headers", "POST, GET");
  next();
});

app.use(bodyParser.json());

app.use("/", HomeRouter);
app.use("/api/auth", AuthRouter);
app.use("/api/user", UserRouter);
app.use("/api/employee", EmployeeRouter);
const port = process.env.PORT || 3000;

const init = async () => {
  try {
    await dbService.connect();
    httpServer.listen(port as number, () => {
      console.log(`App listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
    console.log("Error while starting server");
  }
};

/**
 * Staring the app
 */
init();

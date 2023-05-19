/** @format */

import express from "express";
import dotenv from "dotenv";
import logger from "./logger";
import DataBase from "./database/database";

dotenv.config();

const app = express();

const PORT: number = +process.env.PORT;

logger.error("error");
logger.info("info");

const start = async () => {
  try {
    await DataBase.sync();
    await DataBase.authenticate();
    app.listen(PORT, () => logger.info("Server work " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

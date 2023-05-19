/** @format */

import express from "express";
import dotenv from "dotenv";
import logger from "./logger";

dotenv.config();

const app = express();

const PORT: number = +process.env.PORT;

logger.error("error");
logger.info("info");

const start = async () => {
  try {
    app.listen(PORT, () => logger.info("Server work " + PORT));
  } catch (e) {
    console.log(e);
  }
};

start();

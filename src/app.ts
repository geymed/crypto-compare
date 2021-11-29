import * as bodyParser from "body-parser";
import express from "express";
import { handler as coinCompareHandler } from "./handlers/coin-compare";

const router = (): express.Router => {
  const router = express.Router();
  router.get("/coin-compare", coinCompareHandler);
  return router;
};

export const app = (): express.Application => {
  const expressApp = express();
  // support application/json type post data
  expressApp.use(bodyParser.json());
  // responde with indented JSON string
  expressApp.set("json spaces", 2);
  expressApp.use("/", router());
  return expressApp;
};

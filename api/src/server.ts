import express, { json } from "express";
import db from "./config/database.config";
import todoRouter from "./todo/routes";

const app = express();

app.use(json());

app.use("/api/v1", todoRouter);

db.sync().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});

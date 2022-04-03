import express, { Request, Response } from "express";
import db from "./config/database.config";

const app = express();

app.get("/", (req: Request, res: Response) => {
  return res.send("hello");
});

db.sync().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});

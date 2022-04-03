import express, { Request, Response, json } from "express";
import db from "./config/database.config";

const app = express();

app.use(json());

app.post("/create", (req: Request, res: Response) => {
  console.log(req.body);
  return res.send("");
});

db.sync().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});

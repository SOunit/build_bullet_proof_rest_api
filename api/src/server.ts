import express, { Request, Response, json } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "./config/database.config";
import { TodoInstance } from "./model";
import TodoValidator from "./validator";
import Middleware from "./middleware";

const app = express();

app.use(json());

app.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, message: "success on create todo!" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "fail to create", route: "/create" });
    }
  }
);

app.get("/read", async (req: Request, res: Response) => {
  try {
    const records = await TodoInstance.findAll({ where: {} });
    res.json(records);
  } catch (err) {
    return res.status(500).json({ message: "fail to read", route: "/read" });
  }
});

db.sync().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});

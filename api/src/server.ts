import express, { Request, Response, json } from "express";
import { v4 as uuidv4 } from "uuid";
import db from "./config/database.config";
import { TodoInstance } from "./model";
import TodoValidator from "./validator";
import Middleware from "./middleware";
import middleware from "./middleware";

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

app.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;

      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      res.json(records);
    } catch (err) {
      return res.status(500).json({ message: "fail to read", route: "/read" });
    }
  }
);

app.get(
  "/read/:id",
  TodoValidator.checkIdParam(),
  middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });
      return res.json(record);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "fail to read", route: "/read/:id" });
    }
  }
);

app.put(
  "/update/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ message: "Can not find existing record" });
      }

      const updatedRecord = await record.update({
        completed: !record.getDataValue("completed"),
      });

      return res.json(updatedRecord);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "fail to update", route: "/update/:id" });
    }
  }
);

db.sync().then(() => {
  const port = 5000;
  app.listen(port, () => {
    console.log(`Listening on ${port}`);
  });
});

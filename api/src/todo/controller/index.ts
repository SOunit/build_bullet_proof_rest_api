import { Request, Response } from "express";
import { v4 as uuidv4 } from "uuid";
import { TodoInstance } from "../model";

class TodoController {
  async create(req: Request, res: Response) {
    const id = uuidv4();
    try {
      const record = await TodoInstance.create({ ...req.body, id });
      return res.json({ record, message: "success on create todo!" });
    } catch (err) {
      // react receives only 200 status, so put status in object
      return res.json({
        message: "fail to create",
        route: "/create",
        status: 500,
      });
    }
  }

  async readPagination(req: Request, res: Response) {
    try {
      const limit = req.query?.limit as number | undefined;
      const offset = req.query?.offset as number | undefined;

      const records = await TodoInstance.findAll({ where: {}, limit, offset });
      res.json(records);
    } catch (err) {
      return res.status(500).json({ message: "fail to read", route: "/read" });
    }
  }

  async readById(req: Request, res: Response) {
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

  async update(req: Request, res: Response) {
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

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const record = await TodoInstance.findOne({ where: { id } });

      if (!record) {
        return res.json({ message: "Can not find existing record" });
      }

      const deletedRecord = await record.destroy();

      return res.json(deletedRecord);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "fail to delete", route: "/delete/:id" });
    }
  }
}

export default new TodoController();

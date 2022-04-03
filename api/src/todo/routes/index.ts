import express from "express";
import TodoValidator from "../validator";
import TodoController from "../controller";
import Middleware from "../../middleware";

const router = express.Router();

router.post(
  "/create",
  TodoValidator.checkCreateTodo(),
  Middleware.handleValidationError,
  TodoController.create
);

router.get(
  "/read",
  TodoValidator.checkReadTodo(),
  Middleware.handleValidationError,
  TodoController.readPagination
);

router.get(
  "/read/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  TodoController.readById
);

router.put(
  "/update/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  TodoController.update
);

router.delete(
  "/delete/:id",
  TodoValidator.checkIdParam(),
  Middleware.handleValidationError,
  TodoController.delete
);

export default router;

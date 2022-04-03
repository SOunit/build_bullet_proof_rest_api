import { body } from "express-validator";

class TodoValidator {
  checkCreateTodo() {
    return [
      body("id")
        .optional()
        .isUUID(4)
        .withMessage("The value should be uuid v4"),
      body("title")
        .notEmpty()
        .withMessage("The title value should not be empty"),
      body("completed")
        .optional()
        .isBoolean()
        .withMessage("The value should be boolean")
        .isIn([0, false])
        .withMessage("The value should be 0 or false"),
    ];
  }
}

export default new TodoValidator();

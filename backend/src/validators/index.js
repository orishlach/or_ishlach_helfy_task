import { body } from "express-validator";
import { AvailableTaskPriorities } from "../utils/constants.js";

const taskValidator = () => {
  return [
    body("title")
      .trim()
      .notEmpty()
      .withMessage("Title is required")
      .isLength({ min: 3, max: 100 })
      .withMessage("Title must be between 3 and 100 characters"),

    body("description")
      .optional()
      .isString()
      .isLength({ min: 3, max: 500 })
      .withMessage("Description must be between 3 and 500 characters"),

    body("priority")
      .optional()
      .isIn(AvailableTaskPriorities)
      .withMessage(
        `Priority must be one of: ${AvailableTaskPriorities.join(", ")}`,
      ),
  ];
};

export { taskValidator };

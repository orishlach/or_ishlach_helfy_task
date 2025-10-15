import { body } from "express-validator";
import { AvailableTaskPriorities } from "../utils/constants.js";

const taskValidator = () => {
  return [
    body("priority")
      .optional()
      .isIn(AvailableTaskPriorities)
      .withMessage(
        `Priority must be one of: ${AvailableTaskPriorities.join(", ")}`,
      ),
  ];
};

export { taskValidator };

import express from "express";
import {
  getAllEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employeeController.js";

import validateBody from "../middlewares/validateBody.js";
import { createEmployeeSchema, updateEmployeeSchema } from "../validations/employeeValidation.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", validateBody(createEmployeeSchema), createEmployee);
router.get("/:id", getEmployee);
router.put("/:id", validateBody(updateEmployeeSchema), updateEmployee);
router.delete("/:id", deleteEmployee);

export default router;

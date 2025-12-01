import Joi from "joi";

export const createEmployeeSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  position: Joi.string().allow("").optional(),
  phone: Joi.string().allow("").optional(),
  salary: Joi.number().min(0).optional()
});

export const updateEmployeeSchema = Joi.object({
  name: Joi.string().min(2).optional(),
  email: Joi.string().email().optional(),
  position: Joi.string().allow("").optional(),
  phone: Joi.string().allow("").optional(),
  salary: Joi.number().min(0).optional()
}).min(1); // require at least one field to update

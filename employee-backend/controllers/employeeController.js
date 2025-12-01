import createError from "http-errors";
import Employee from "../models/Employee.js";

/* GET /api/employees */
export const getAllEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 }).lean();
    res.json({ success: true, data: employees });
  } catch (err) {
    next(err);
  }
};

/* GET /api/employees/:id */
export const getEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findById(id).lean();
    if (!emp) return next(createError(404, "Employee not found"));
    res.json({ success: true, data: emp });
  } catch (err) {
    next(err);
  }
};

/* POST /api/employees */
export const createEmployee = async (req, res, next) => {
  try {
    const payload = req.body;
    console.log("Payload received:", payload); // <-- Add this

    const existing = await Employee.findOne({ email: payload.email });
    if (existing) return next(createError(409, "Email already in use"));

    const newEmp = await Employee.create(payload);
    res.status(201).json({ success: true, data: newEmp });
  } catch (err) {
    console.error("Create Employee Error:", err); // <-- Add this
    next(err);
  }
};

/* PUT /api/employees/:id */
export const updateEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const payload = req.body;

    // If email present in payload, ensure uniqueness
    if (payload.email) {
      const other = await Employee.findOne({ email: payload.email, _id: { $ne: id } });
      if (other) return next(createError(409, "Email already in use by another employee"));
    }

    const updated = await Employee.findByIdAndUpdate(id, payload, { new: true, runValidators: true }).lean();
    if (!updated) return next(createError(404, "Employee not found"));
    res.json({ success: true, data: updated });
  } catch (err) {
    next(err);
  }
};

/* DELETE /api/employees/:id */
export const deleteEmployee = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.findByIdAndDelete(id).lean();
    if (!deleted) return next(createError(404, "Employee not found"));
    res.json({ success: true, data: deleted });
  } catch (err) {
    next(err);
  }
};

import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Employee name required"],
    trim: true,
    minlength: 2
  },
  email: {
    type: String,
    required: [true, "Email required"],
    unique: true,
    trim: true,
    lowercase: true
  },
  position: {
    type: String,
    trim: true,
    default: ""
  },
  phone: {
    type: String,
    trim: true,
    default: ""
  },
  salary: {
    type: Number,
    default: 0,
    min: 0
  }
}, {
  timestamps: true
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;

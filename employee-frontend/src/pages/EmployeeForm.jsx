import { useState, useEffect } from "react";
import { createEmployee, getEmployee, updateEmployee } from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EmployeeForm() {
  const { id } = useParams();
  const isEdit = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    position: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // inline validation errors

  // Load employee data if editing
  useEffect(() => {
    if (isEdit) {
      (async () => {
        try {
          const data = await getEmployee(id);
          setForm({ ...data, salary: data.salary ?? 0 });
        } catch (err) {
          alert("Failed to load employee");
        }
      })();
    }
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // reset errors

    try {
      if (isEdit) {
        await updateEmployee(id, form);
        alert("Employee updated successfully");
      } else {
        await createEmployee(form);
        alert("Employee created successfully");
      }
      navigate("/");
    } catch (err) {
      const data = err.response?.data;
      if (data?.details) {
        // Backend validation errors (Joi)
        const fieldErrors = {};
        data.details.forEach((d) => {
          const field = d.path[0];
          fieldErrors[field] = d.message;
        });
        setErrors(fieldErrors);
      } else {
        alert(data?.message || "Operation failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-semibold mb-4">
        {isEdit ? "Edit" : "Add"} Employee
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow-sm">
        {/* Name */}
        <label className="block mb-2">
          <span className="text-sm">Name</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className={`mt-1 block w-full border rounded p-2 ${
              errors.name ? "border-red-500" : ""
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </label>

        {/* Email */}
        <label className="block mb-2">
          <span className="text-sm">Email</span>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            type="email"
            className={`mt-1 block w-full border rounded p-2 ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </label>

        {/* Phone */}
        <label className="block mb-2">
          <span className="text-sm">Phone</span>
          <input
            name="phone"
            value={form.phone}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded p-2 ${
              errors.phone ? "border-red-500" : ""
            }`}
          />
          {errors.phone && (
            <p className="text-red-500 text-sm">{errors.phone}</p>
          )}
        </label>

        {/* Position */}
        <label className="block mb-2">
          <span className="text-sm">Position</span>
          <input
            name="position"
            value={form.position}
            onChange={handleChange}
            className={`mt-1 block w-full border rounded p-2 ${
              errors.position ? "border-red-500" : ""
            }`}
          />
          {errors.position && (
            <p className="text-red-500 text-sm">{errors.position}</p>
          )}
        </label>

        {/* Salary */}
        <label className="block mb-4">
          <span className="text-sm">Salary</span>
          <input
            name="salary"
            value={form.salary}
            onChange={handleChange}
            type="number"
            className={`mt-1 block w-full border rounded p-2 ${
              errors.salary ? "border-red-500" : ""
            }`}
          />
          {errors.salary && (
            <p className="text-red-500 text-sm">{errors.salary}</p>
          )}
        </label>

        <div className="flex gap-2">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {isEdit ? "Update" : "Create"}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="px-4 py-2 border rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

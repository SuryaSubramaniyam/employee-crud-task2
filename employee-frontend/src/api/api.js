// src/api/api.js
import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:8888/api",
  headers: { "Content-Type": "application/json" },
});

// Helper to safely extract .data.data when backend uses { success, data }
const extract = (res) => {
  if (!res) return null;
  // If axios response
  if (res.data !== undefined) {
    // prefer res.data.data when present
    if (res.data.data !== undefined) return res.data.data;
    return res.data;
  }
  // fallback: raw value
  return res;
};

export const getEmployees = async () => {
  const res = await API.get("/employees");
  console.log("API GET /employees response:", res);
  return extract(res);
};

export const getEmployee = async (id) => {
  const res = await API.get(`/employees/${id}`);
  console.log(`API GET /employees/${id} response:`, res);
  return extract(res);
};

export const createEmployee = async (payload) => {
  const res = await API.post("/employees", payload);
  console.log("API POST /employees response:", res);
  return extract(res);
};

export const updateEmployee = async (id, payload) => {
  const res = await API.put(`/employees/${id}`, payload);
  console.log(`API PUT /employees/${id} response:`, res);
  return extract(res);
};

export const deleteEmployee = async (id) => {
  const res = await API.delete(`/employees/${id}`);
  console.log(`API DELETE /employees/${id} response:`, res);
  return extract(res);
};

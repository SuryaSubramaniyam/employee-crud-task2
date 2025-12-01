// src/pages/EmployeeList.jsx
import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { getEmployees, deleteEmployee } from "../api/api";

export default function EmployeeList() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [debugMessage, setDebugMessage] = useState("");
  const location = useLocation();

  const fetchEmployees = useCallback(async () => {
    setLoading(true);
    setDebugMessage("");
    try {
      const data = await getEmployees();
      console.log("fetchEmployees -> data:", data);
      if (!Array.isArray(data)) {
        setDebugMessage("Warning: data is not an array (see console).");
        setEmployees([]);
      } else {
        // ensure each item has _id and id
        const normalized = data.map((d) => ({ ...d, id: d.id || d._id }));
        setEmployees(normalized);
      }
    } catch (err) {
      console.error("Failed to fetch employees (UI):", err?.response ?? err);
      const msg = err?.response?.data?.message || "Failed to fetch employees";
      setDebugMessage(msg);
      setEmployees([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // initial load
  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  // listen to navigation refresh state (navigate('/', { state: { refresh: true } }))
  useEffect(() => {
    if (location.state?.refresh) {
      fetchEmployees();
      // clear history state
      try {
        window.history.replaceState({}, document.title);
      } catch (e) {}
    }
  }, [location.state, fetchEmployees]);

  // listen for global event to update immediately
  useEffect(() => {
    const handler = (e) => {
      console.log("employees:updated event:", e?.detail);
      // if event contains created item, add it to top (prevent duplicates)
      const item = e?.detail;
      if (item && (item._id || item.id)) {
        setEmployees((prev) => {
          const id = item._id || item.id;
          if (prev.some((p) => (p._id || p.id) === id)) return prev;
          return [{ ...item, id }, ...prev];
        });
      } else {
        // otherwise refetch
        fetchEmployees();
      }
    };
    window.addEventListener("employees:updated", handler);
    return () => window.removeEventListener("employees:updated", handler);
  }, [fetchEmployees]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this employee?")) return;
    try {
      setDeletingId(id);
      await deleteEmployee(id);
      setEmployees((prev) => prev.filter((e) => (e._id || e.id) !== id));
      alert("Employee deleted");
    } catch (err) {
      console.error("delete failed:", err?.response ?? err);
      alert(err?.response?.data?.message || "Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="text-center mt-12">
        <div className="mb-2 text-gray-600">Loading employees...</div>
        <div className="inline-block animate-spin border-4 border-gray-200 border-t-gray-600 rounded-full w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-semibold">Employees</h1>
        <Link to="/add" className="bg-blue-600 text-white px-4 py-2 rounded">
          Add Employee
        </Link>
      </div>

      {debugMessage && (
        <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 text-sm text-yellow-800">
          {debugMessage}
        </div>
      )}

      {employees.length === 0 ? (
        <div className="bg-white p-6 rounded shadow text-center text-gray-600">
          No employees found.
        </div>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {employees.map((emp) => {
            const id = emp._id || emp.id;
            return (
              <div
                key={id}
                className="border rounded p-4 shadow-sm bg-white flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg font-medium">{emp.name}</h2>
                  <p className="text-sm text-gray-600">{emp.position || "—"}</p>
                  <p className="text-sm">
                    <span className="font-medium">{emp.email}</span>
                    {" · "}
                    <span className="text-gray-600">{emp.phone || "N/A"}</span>
                  </p>
                  <p className="mt-2 font-semibold">₹{emp.salary ?? 0}</p>
                </div>

                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/edit/${id}`}
                    className="text-sm px-3 py-1 border rounded hover:bg-gray-100 flex-1 text-center"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(id)}
                    disabled={deletingId === id}
                    className={`text-sm px-3 py-1 border rounded flex-1 text-center ${
                      deletingId === id
                        ? "text-gray-400 border-gray-300 cursor-not-allowed"
                        : "text-red-600"
                    }`}
                  >
                    {deletingId === id ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

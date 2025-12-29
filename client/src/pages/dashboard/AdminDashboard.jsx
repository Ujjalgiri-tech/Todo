import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import admin from "../../assets/images/admin.jpg";
import thunder from "../../assets/icons/thunder.png";
import setting from "../../assets/icons/setting.png";

export default function AdminDashboard() {
  const [workLogs, setWorkLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= FETCH WORK LOGS ================= */
  useEffect(() => {
    if (token) fetchWorkLogs();
    else setLoading(false);
  }, [token]);

  const fetchWorkLogs = async () => {
    try {
      const res = await axios.get("http://localhost:1337/api/work-logs", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkLogs(res.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= DELETE ================= */
  const handleDelete = async (documentId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await axios.delete(`http://localhost:1337/api/work-logs/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setWorkLogs((prev) =>
        prev.filter((item) => item.documentId !== documentId)
      );
    } catch (err) {
      alert("Delete failed");
      console.error("Delete error:", err.response?.data || err);
    }
  };

  /* ================= HELPERS ================= */
  const extractText = (blocks = []) =>
    blocks.map((b) => b.children?.map((c) => c.text).join("") || "").join(" ");

  const filteredLogs = workLogs.filter((d) => {
    const text = `${d.name || ""} ${extractText(
      d.assigned_tasks
    )}`.toLowerCase();
    return (
      text.includes(search.toLowerCase()) &&
      (!statusFilter || d.work_status === statusFilter)
    );
  });

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-linear-to-r from-orange-400 to-blue-400">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="w-64 bg-linear-to-b from-green-300 via-green-400 to-green-500 px-6 py-5 flex flex-col justify-between"
      >
        <div>
          <div
            className="flex items-center gap-2 mb-8 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img src={thunder} alt="logo" className="w-8 h-8 rounded-md" />
            <span className="text-lg font-bold text-emerald-600 rounded-2xl">
              TeamFlow
            </span>
          </div>
          <nav className="space-y-4 text-gray-600">
            <p className="font-medium text-emerald-600">Dashboard</p>
            <p className="hover:text-blue-500 cursor-pointer">Tasks</p>
            <p
              className="hover:text-blue-500 cursor-pointer"
              onClick={() => navigate("/users")}
            >
              Users
            </p>
            <p className="hover:text-blue-500 cursor-pointer">Reports</p>
          </nav>
        </div>
        <div className="flex items-center gap-2">
          <img src={setting} alt="settings" className="w-7 h-7" />
          <p className="text-gray-500 cursor-pointer">Settings</p>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 flex flex-col p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/assign-task")}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
            >
              + Add User
            </button>
            <img
              src={admin}
              alt="admin"
              className="w-10 h-10 rounded-full object-cover"
            />
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 justify-between mb-4">
          <input
            type="text"
            placeholder="Search by name or task..."
            className="border px-3 py-2 rounded-md w-full sm:w-64 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className="border px-3 py-2 rounded-md text-sm w-full sm:w-auto"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-x-auto flex-1">
          <table className="w-full text-sm table-auto border-collapse">
            <thead className="bg-gray-50 text-gray-600">
              <tr>
                <th className="p-3 border-b text-left">Student ID</th>
                <th className="p-3 border-b text-left">Name</th>
                <th className="p-3 border-b text-left">Assigned Task</th>
                <th className="p-3 border-b text-left">Status</th>
                <th className="p-3 border-b text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center">
                    Loading...
                  </td>
                </tr>
              ) : filteredLogs.length === 0 ? (
                <tr>
                  <td colSpan="5" className="p-6 text-center text-gray-400">
                    No records found
                  </td>
                </tr>
              ) : (
                filteredLogs.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50">
                    <td className="p-3 border-b">{d.student_id || "—"}</td>
                    <td className="p-3 border-b">{d.name || "—"}</td>
                    <td className="p-3 border-b max-w-xs truncate">
                      {extractText(d.assigned_tasks) || "—"}
                    </td>
                    <td className="p-3 border-b">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          d.work_status === "completed"
                            ? "bg-green-100 text-green-700"
                            : d.work_status === "in_progress"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {d.work_status}
                      </span>
                    </td>
                    <td className="p-3 border-b flex gap-2">
                      <button
                        onClick={() => navigate(`/edit-task/${d.documentId}`)}
                        className="border px-2 py-1 rounded text-xs"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(d.documentId)}
                        className="border px-2 py-1 rounded text-xs text-red-500"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <p className="text-center text-xs text-gray-900 mt-6">
          © 2025 TeamFlow. All rights reserved.
        </p>
      </main>
    </div>
  );
}

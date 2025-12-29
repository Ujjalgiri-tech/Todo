import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

export default function AssignModal({ user, token, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    student_id: "",
    assigned_tasks: "",
    remarks: "",
    deadline: "", // optional, just for UI
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  /* ================= FETCH USER DATA ================= */
  useEffect(() => {
    if (!user) return;

    setFormData((prev) => ({
      ...prev,
      student_id: user.student_id || "",
    }));
  }, [user]);

  /* ================= HANDLE INPUT CHANGE ================= */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ================= HANDLE SUBMIT ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const headers = { Authorization: `Bearer ${token}` };

      await axios.post(
        "http://localhost:1337/api/work-logs",
        {
          data: {
            student_id: formData.student_id,
            name: user.username,
            assigned_tasks: [
              {
                type: "paragraph",
                children: [{ type: "text", text: formData.assigned_tasks }],
              },
            ],
            remarks: [
              {
                type: "paragraph",
                children: [{ type: "text", text: formData.remarks }],
              },
            ],
            work_status: "pending",
            check_in: new Date().toISOString(),
            check_out: null,
            publishedAt: new Date().toISOString(),
          },
        },
        { headers }
      );

      // ✅ Refresh parent data (UserDetails.jsx)
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Task assign failed:", err.response?.data || err);
      setError(
        err.response?.data?.error?.message || "Task assignment failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white w-full max-w-lg rounded-xl p-6"
      >
        <h2 className="text-xl font-semibold mb-4">Assign Task</h2>

        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* STUDENT ID */}
          <input
            type="text"
            name="student_id"
            placeholder="Student ID"
            value={formData.student_id}
            onChange={handleChange}
            disabled={!!user.student_id} // cannot change if exists
            className="w-full border p-2 rounded"
          />

          {/* USERNAME (READ ONLY) */}
          <input
            type="text"
            value={user.username}
            disabled
            className="w-full border p-2 rounded bg-gray-100"
          />

          {/* TASK DESCRIPTION */}
          <textarea
            name="assigned_tasks"
            placeholder="Task description"
            value={formData.assigned_tasks}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {/* REMARKS */}
          <textarea
            name="remarks"
            placeholder="Remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows="2"
            className="w-full border p-2 rounded"
          />

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              {loading ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

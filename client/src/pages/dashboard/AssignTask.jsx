import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AssignTask() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    student_id: "",
    name: "",
    assigned_tasks: "",
    remarks: "",
    work_status: "pending",
  });

  const [loading, setLoading] = useState(false);

  // 🔐 Redirect if not logged in
  if (!token) {
    navigate("/login");
    return null;
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axios.post(
        "http://localhost:1337/api/work-logs",
        {
          data: {
            student_id: form.student_id,
            name: form.name,
            check_in: new Date().toISOString(),
            check_out: null,
            assigned_tasks: [
              {
                type: "paragraph",
                children: [{ type: "text", text: form.assigned_tasks }],
              },
            ],
            remarks: [
              {
                type: "paragraph",
                children: [{ type: "text", text: form.remarks }],
              },
            ],
            work_status: form.work_status,
            publishedAt: new Date().toISOString(), // ⭐ required for Strapi
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      
      navigate("/users");
    } catch (err) {
      console.error("Assign failed:", err.response?.data || err);
      alert("Failed to assign task");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white w-full max-w-md rounded-lg p-6 shadow">
        <h2 className="text-xl font-semibold mb-4">
          Assign New Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="student_id"
            placeholder="Student ID (STU003)"
            value={form.student_id}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <input
            name="name"
            placeholder="Student Name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="assigned_tasks"
            placeholder="Task Description"
            value={form.assigned_tasks}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border px-3 py-2 rounded"
          />

          <textarea
            name="remarks"
            placeholder="Remarks"
            value={form.remarks}
            onChange={handleChange}
            rows="2"
            className="w-full border px-3 py-2 rounded"
          />

          <select
            name="work_status"
            value={form.work_status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="pending">Pending</option>
            <option value="in_progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate("/user-details")}
              className="border px-4 py-2 rounded"
            >
              Cancel
            </button>

            <button
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Assigning..." : "Assign Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

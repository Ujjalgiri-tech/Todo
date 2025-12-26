import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

export default function EditTask() {
  const { documentId } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    student_id: "",
    name: "",
    assigned_tasks: "",
    remarks: "",
    work_status: "pending",
    check_in: "",
    check_out: "",
  });

  /* ================= FETCH EXISTING TASK ================= */
  useEffect(() => {
    if (!documentId) return;

    axios
      .get(`http://localhost:1337/api/work-logs/${documentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const d = res.data.data;

        setForm({
          student_id: d.student_id || "",
          name: d.name || "",
          assigned_tasks: d.assigned_tasks?.[0]?.children?.[0]?.text || "",
          remarks: d.remarks?.[0]?.children?.[0]?.text || "",
          work_status: d.work_status || "pending",
          check_in: d.check_in || "",
          check_out: d.check_out || "",
        });
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        alert("Failed to load task");
      });
  }, [documentId, token]);

  /* ================= HANDLE FORM CHANGE ================= */
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  /* ================= HANDLE UPDATE ================= */
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Prepare payload for Strapi
      const payload = {
        name: form.name,
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
     
      };

      // Include check_in / check_out only if valid
      if (form.check_in) payload.check_in = form.check_in;
      if (form.check_out) payload.check_out = form.check_out || undefined;

      // PATCH request to Strapi Document API
      await axios.put(
        `http://localhost:1337/api/work-logs/${documentId}`,
        { data: payload },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Task updated successfully");
      navigate("/dashboard");
    } catch (err) {
      console.error("Update error:", err.response?.data || err);
      alert("Update failed — check console for details");
    }
  };

  /* ================= UI ================= */
  return (
    <form
      onSubmit={handleUpdate}
      className="max-w-xl mx-auto p-6 bg-emerald-300 rounded shadow mt-10"
    >
      <h2 className="text-xl font-semibold mb-4">Edit Task</h2>

      {/* Student ID (read-only) */}
      <input
        value={form.student_id}
        readOnly
        className="w-full border p-2 mb-3 rounded bg-emerald-300 cursor-not-allowed"
        placeholder="Student ID"
      />

      {/* Name */}
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        placeholder="Name"
        required
      />

      {/* Assigned Tasks */}
      <textarea
        name="assigned_tasks"
        value={form.assigned_tasks}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        placeholder="Assigned Task"
        required
      />

      {/* Remarks */}
      <textarea
        name="remarks"
        value={form.remarks}
        onChange={handleChange}
        className="w-full border p-2 mb-3 rounded"
        placeholder="Remarks"
      />

      {/* Work Status */}
      <select
        name="work_status"
        value={form.work_status}
        onChange={handleChange}
        className="w-full border p-2 mb-4 rounded"
      >
        <option value="pending">Pending</option>
        <option value="in_progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>

      {/* Save Button */}
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Changes
      </button>
    </form>
  );
}

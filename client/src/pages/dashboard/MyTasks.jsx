import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import profile1 from "../../assets/images/profile1.jpg";
import thunder from "../../assets/icons/thunder.png";
import { useAuth } from "../../context/AuthContext.jsx";

export default function MyTasks() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTasks = async () => {
    // Must be logged in
    if (!user || !user.id) {
      console.log("User not logged in or no ID");
      setLoading(false);
      return;
    }

    const userId = user.id.toString(); // Strapi user ID → e.g., "9"
    console.log("Fetching tasks for Strapi User ID:", userId);

    setLoading(true);

    try {
      const res = await axios.get("http://localhost:1337/api/work-logs", {
        params: {
          populate: "*",
          "filters[student_id][$eq]": userId, // ← This matches the text field
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const fetchedTasks = res.data.data || [];
      console.log("Tasks found:", fetchedTasks);
      setTasks(fetchedTasks);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, [user]);

  const updateTask = async (id, updatedFields) => {
    try {
      await axios.put(
        `http://localhost:1337/api/work-logs/${id}`,
        { data: updatedFields },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      fetchMyTasks(); // Refresh list
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to save. Try again.");
    }
  };

  // Extract text from Strapi rich text blocks
  const getRichText = (blocks) => {
    if (!blocks || !Array.isArray(blocks)) return "";
    return blocks
      .map((block) => block.children?.map((c) => c.text || "").join("") || "")
      .join("\n")
      .trim();
  };

  const formatDateTime = (iso) => (iso ? iso.slice(0, 16) : "");

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen bg-gray-100"
    >
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <img src={thunder} className="w-8 h-8 rounded-md" alt="logo" />
          <span className="font-semibold text-blue-600 text-lg">TeamFlow</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">Welcome, {user?.username || "User"}</span>
          <img src={profile1} className="w-9 h-9 rounded-full object-cover" alt="profile" />
        </div>
      </header>

      <main className="px-6 py-8">
        <h1 className="text-2xl font-semibold mb-6">My Tasks</h1>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 text-gray-600 uppercase tracking-wider">
                <tr>
                  <th className="text-left px-6 py-3">Assigned Task</th>
                  <th className="text-center px-4 py-3">Check-In</th>
                  <th className="text-center px-4 py-3">Check-Out</th>
                  <th className="text-left px-6 py-3">Remarks</th>
                  <th className="text-center px-4 py-3">Status</th>
                  <th className="text-center px-4 py-3">Saved</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-500">
                      Loading your tasks...
                    </td>
                  </tr>
                ) : tasks.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-12 text-gray-400">
                      No tasks assigned yet. Ask admin to assign tasks with your ID:{" "}
                      <strong>{user?.id}</strong>
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => {
                    const t = task.attributes;

                    return (
                      <tr key={task.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 max-w-md font-medium text-gray-800">
                          {getRichText(t.assigned_tasks) || "—"}
                        </td>

                        <td className="text-center">
                          <input
                            type="datetime-local"
                            defaultValue={formatDateTime(t.check_in)}
                            onBlur={(e) =>
                              updateTask(task.id, { check_in: e.target.value || null })
                            }
                            className="border rounded px-2 py-1 text-xs"
                          />
                        </td>

                        <td className="text-center">
                          <input
                            type="datetime-local"
                            defaultValue={formatDateTime(t.check_out)}
                            onBlur={(e) =>
                              updateTask(task.id, { check_out: e.target.value || null })
                            }
                            className="border rounded px-2 py-1 text-xs"
                          />
                        </td>

                        <td className="px-6 py-4">
                          <textarea
                            rows="3"
                            defaultValue={getRichText(t.remarks)}
                            onBlur={(e) =>
                              updateTask(task.id, {
                                remarks: e.target.value
                                  ? [{ type: "paragraph", children: [{ text: e.target.value }] }]
                                  : null,
                              })
                            }
                            className="w-full border rounded px-2 py-1 text-xs resize-none"
                            placeholder="Add remarks..."
                          />
                        </td>

                        <td className="text-center">
                          <select
                            defaultValue={t.work_status || "pending"}
                            onChange={(e) =>
                              updateTask(task.id, { work_status: e.target.value })
                            }
                            className="border rounded px-3 py-1 text-xs"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>

                        <td className="text-center text-green-600 font-bold text-xl">
                          ✓
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 mt-10">
          © 2025 TeamFlow. All rights reserved.
        </p>
      </main>
    </motion.div>
  );
}
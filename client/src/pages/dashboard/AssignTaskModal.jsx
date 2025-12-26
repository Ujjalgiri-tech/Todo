import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import profile1 from "../../assets/images/profile1.jpg";
import thunder from "../../assets/icons/thunder.png";
import { useAuth } from "../../context/AuthContext.jsx";

export default function MyTask() {
  const { user } = useAuth();
  const token = localStorage.getItem("token");

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMyTasks = async () => {
    if (!user?.student_id) {
      setLoading(false);
      setTasks([]);
      return;
    }

    setLoading(true);

    try {
      const res = await axios.get("http://localhost:1337/api/work-logs", {
        params: {
          populate: "*",
          "filters[student_id][$eq]": user.student_id, // This is the correct filter
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("Fetched tasks:", res.data.data); // Check this in console
      setTasks(res.data.data || []);
    } catch (err) {
      console.error("Task fetch failed:", err.response?.data || err.message);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyTasks();
    } else {
      setLoading(false);
    }
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
      fetchMyTasks();
    } catch (err) {
      console.error("Update failed:", err.response?.data || err.message);
      alert("Failed to update task.");
    }
  };

  const getRichTextValue = (richTextArray) => {
    if (!richTextArray || !Array.isArray(richTextArray)) return "";
    return richTextArray
      .map((block) =>
        block.children?.map((child) => child.text || "").join("")
      )
      .join("\n")
      .trim();
  };

  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    return isoString.slice(0, 16);
  };

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
        <img src={profile1} className="w-9 h-9 rounded-full object-cover" alt="profile" />
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
                      No tasks assigned to you yet.
                    </td>
                  </tr>
                ) : (
                  tasks.map((task) => {
                    const t = task.attributes;

                    return (
                      <tr key={task.id} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 max-w-md font-medium text-gray-800">
                          {getRichTextValue(t.assigned_tasks) || "—"}
                        </td>

                        <td className="px-4 py-3 text-center">
                          <input
                            type="datetime-local"
                            defaultValue={formatDateForInput(t.check_in)}
                            onBlur={(e) =>
                              updateTask(task.id, { check_in: e.target.value || null })
                            }
                            className="border rounded px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>

                        <td className="px-4 py-3 text-center">
                          <input
                            type="datetime-local"
                            defaultValue={formatDateForInput(t.check_out)}
                            onBlur={(e) =>
                              updateTask(task.id, { check_out: e.target.value || null })
                            }
                            className="border rounded px-3 py-1 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </td>

                        <td className="px-6 py-4">
                          <textarea
                            rows="3"
                            defaultValue={getRichTextValue(t.remarks)}
                            onBlur={(e) =>
                              updateTask(task.id, {
                                remarks: e.target.value
                                  ? [
                                      {
                                        type: "paragraph",
                                        children: [{ text: e.target.value }],
                                      },
                                    ]
                                  : null,
                              })
                            }
                            className="w-full border rounded px-3 py-2 text-xs resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Add remarks..."
                          />
                        </td>

                        <td className="px-4 py-3 text-center">
                          <select
                            defaultValue={t.work_status || "pending"}
                            onChange={(e) =>
                              updateTask(task.id, { work_status: e.target.value })
                            }
                            className="border rounded px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            <option value="pending">Pending</option>
                            <option value="in_progress">In Progress</option>
                            <option value="completed">Completed</option>
                          </select>
                        </td>

                        <td className="text-center text-green-600 font-bold text-lg">
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
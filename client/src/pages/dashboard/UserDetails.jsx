import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import AssignTaskModal from "../dashboard/AssignTaskModal";
import ViewDetail from "../dashboard/ViewDetail"; // Import the new modal

import admin from "../../assets/images/admin.jpg";
import thunder from "../../assets/icons/thunder.png";
import setting from "../../assets/icons/setting.png";

export default function UserDetail() {
  const [users, setUsers] = useState([]);
  const [workLogs, setWorkLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedUser, setSelectedUser] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false); // ViewDetail modal state

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= FETCH USERS + TASKS ================= */
  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }
    fetchUsersAndTasks();
  }, [token]);

  const fetchUsersAndTasks = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` };

      const meRes = await axios.get("http://localhost:1337/api/users/me", { headers });
      const adminId = meRes.data.id;

      const [userRes, taskRes] = await Promise.all([
        axios.get("http://localhost:1337/api/users", { headers }),
        axios.get("http://localhost:1337/api/work-logs", { headers }),
      ]);

      const filteredUsers = (userRes.data || []).filter((u) => u.id !== adminId);

      setUsers(filteredUsers);
      setWorkLogs(taskRes.data.data || []);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIVE TASK COUNT ================= */
  const getActiveTaskCount = (username) =>
    workLogs.filter(
      (log) =>
        log.name === username &&
        ["pending", "in_progress", "completed"].includes(log.work_status)
    ).length;

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-linear-to-r from-orange-400  to-blue-400">
      {/* Sidebar */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="w-64 bg-linear-to-b from-green-300 via-green-400 to-green-500 px-6 py-5 flex flex-col justify-between rounded-md"
      >
        <div>
          <div className="flex items-center gap-2 mb-8">
            <img src={thunder} alt="logo" className="w-8 h-8" />
            <span className="text-lg font-bold text-blue-600">TeamFlow</span>
          </div>

          <nav className="space-y-4 text-gray-600">
            <p
              onClick={() => navigate("/dashboard")}
              className="hover:text-blue-500 cursor-pointer"
            >
              Dashboard
            </p>
            <p className="hover:text-blue-500 cursor-pointer">Tasks</p>
            <p className="font-medium text-blue-600">Users</p>
            <p className="hover:text-blue-500 cursor-pointer">Reports</p>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <img src={setting} alt="settings" className="w-7 h-7" />
          <p className="text-gray-500 cursor-pointer">Settings</p>
        </div>
      </motion.aside>

      {/* Main */}
      <main className="flex-1 p-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Users</h1>

          <img
            src={admin}
            alt="admin"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* User Grid */}
        {loading ? (
          <p className="text-center mt-10">Loading users...</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No registered users found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((u) => (
              <div
                key={u.id}
                className="bg-linear-to-b from-gray-100 to-gray-200 rounded-xl shadow-sm p-6 text-center"
              >
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-100 flex items-center justify-center text-2xl font-bold text-blue-600">
                  {u.username?.charAt(0).toUpperCase()}
                </div>

                <h3 className="mt-4 font-semibold text-lg">{u.username}</h3>

                <p className="text-sm text-gray-500 mt-1">
                  {getActiveTaskCount(u.username)} Active Tasks
                </p>

                {/* Assign Task Button */}
                <button
                  onClick={() => {
                    setSelectedUser(u);
                    setShowAssignModal(true);
                  }}
                  className="mt-5 w-full bg-gray-100 hover:bg-blue-600 hover:text-white text-sm py-2 rounded-md transition"
                >
                  Assign Task
                </button>

                {/* View Details Button */}
                <button
                  onClick={() => {
                    setSelectedUser(u);
                    setShowViewModal(true);
                  }}
                  className="mt-2 w-full bg-gray-200 hover:bg-gray-300 text-sm py-2 rounded-md transition"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}

        <p className="text-center text-xs text-gray-400 mt-10">
          © 2025 TeamFlow. All rights reserved.
        </p>

        {/* Assign Task Modal */}
        {showAssignModal && selectedUser && (
          <AssignTaskModal
            user={selectedUser}
            onClose={() => setShowAssignModal(false)}
            onSuccess={fetchUsersAndTasks}
          />
        )}

        {/* View Detail Modal */}
        {showViewModal && selectedUser && (
          <ViewDetail
            user={selectedUser}
            onClose={() => setShowViewModal(false)}
          />
        )}
      </main>
    </div>
  );
}

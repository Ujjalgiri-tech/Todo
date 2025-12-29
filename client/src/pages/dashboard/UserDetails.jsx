import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AssignModal from "../dashboard/AssignModal";

import ViewDetail from "../dashboard/ViewDetail";

import adminImg from "../../assets/images/admin.jpg";
import thunder from "../../assets/icons/thunder.png";
import setting from "../../assets/icons/setting.png";

export default function UserDetails() {
  const [users, setUsers] = useState([]);
  const [workLogs, setWorkLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedUser, setSelectedUser] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    if (!token) {
      setError("Unauthorized: No token found");
      setLoading(false);
      return;
    }
    fetchData();
  }, [token]);

  // 🔥 Refresh data automatically when coming back from AssignTask page
  useEffect(() => {
    const onFocus = () => fetchData();
    window.addEventListener("focus", onFocus);
    return () => window.removeEventListener("focus", onFocus);
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const headers = { Authorization: `Bearer ${token}` };

      // Get logged-in admin
      const meRes = await axios.get("http://localhost:1337/api/users/me", {
        headers,
      });

      // Get all users
      const usersRes = await axios.get("http://localhost:1337/api/users", {
        headers,
      });

      // Get work logs
      let logs = [];
      try {
        const logsRes = await axios.get("http://localhost:1337/api/work-logs", {
          headers,
        });
        logs = logsRes.data?.data || [];
      } catch (e) {
        console.warn("Work logs fetch failed");
      }

      // Remove admin from user list
      const filteredUsers = usersRes.data.filter((u) => u.id !== meRes.data.id);

      setUsers(filteredUsers);
      setWorkLogs(logs);
      setError("");
    } catch (err) {
      console.error("API ERROR:", err);
      setError("Failed to load users");
    } finally {
      setLoading(false);
    }
  };

  /* ================= ACTIVE TASK COUNT ================= */
  const getActiveTaskCount = (username) =>
    workLogs.filter(
      (log) =>
        log?.name === username &&
        ["pending", "in_progress", "completed"].includes(
          log?.work_status?.toLowerCase()
        )
    ).length;

  /* ================= UI ================= */
  return (
    <div className="flex min-h-screen bg-linear-to-r from-orange-400 to-blue-400">
      {/* SIDEBAR */}
      <motion.aside
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="w-64 bg-linear-to-b from-green-300 via-green-400 to-green-500 px-6 py-5 flex flex-col justify-between rounded-md"
      >
        <div>
          <div className="flex items-center gap-2 mb-8 cursor-pointer" 
          onClick={() => navigate("/")}
          >
            <img src={thunder} alt="logo" className="w-8 h-8 rounded-md" />
            <span className="text-lg font-bold text-emerald-600">TeamFlow</span>
          </div>

          <nav className="space-y-4 text-gray-700">
            <p
              onClick={() => navigate("/dashboard")}
              className="cursor-pointer"
            >
              Dashboard
            </p>
            <p className="hover:text-blue-500 cursor-pointer">Tasks</p>
            <p className="hover:text-blue-500 cursor-pointer">Users</p>
            <p className="hover:text-blue-500 cursor-pointer">Reports</p>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <img src={setting} alt="settings" className="w-7 h-7" />
          <p className="text-gray-600">Settings</p>
        </div>
      </motion.aside>

      {/* MAIN */}
      <main className="flex-1 p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-semibold">Users</h1>
          <img src={adminImg} alt="admin" className="w-10 h-10 rounded-full" />
        </div>

        {loading ? (
          <p className="text-center mt-10">Loading users...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-10">{error}</p>
        ) : users.length === 0 ? (
          <p className="text-center text-gray-400 mt-10">
            No registered users found
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {users.map((user) => (
              <div
                key={user.id}
                className="bg-gray-100 rounded-xl p-6 text-center"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-blue-200 flex items-center justify-center text-2xl font-bold">
                  {user.username?.charAt(0).toUpperCase()}
                </div>

                <h3 className="mt-4 font-semibold">{user.username}</h3>

                <p className="text-xs text-gray-500">{user.email}</p>

                <p className="text-sm mt-2">
                  {getActiveTaskCount(user.username)} Active Tasks
                </p>

                {/* ASSIGN TASK */}
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowAssignModal(true);
                  }}
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md"
                >
                  Assign Task
                </button>

                {/* VIEW DETAILS */}
                <button
                  onClick={() => {
                    setSelectedUser(user);
                    setShowViewModal(true);
                  }}
                  className="mt-2 w-full bg-gray-200 py-2 rounded-md"
                >
                  View Details
                </button>
              </div>
            ))}
          </div>
        )}
        {showAssignModal && selectedUser && (
          <AssignModal
            user={selectedUser}
            token={token}
            onClose={() => setShowAssignModal(false)}
            onSuccess={fetchData} 
          />
        )}

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

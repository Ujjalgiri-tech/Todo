import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ViewDetail({ user, onClose }) {
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        setLoading(true);
        const headers = { Authorization: `Bearer ${token}` };

        // 1️⃣ Fetch user info (basic)
        const userRes = await axios.get(
          `http://localhost:1337/api/users/${user.id}`,
          { headers }
        );

        const userData = userRes.data;

        // 2️⃣ Fetch latest work-log for this user
        const logRes = await axios.get(
          `http://localhost:1337/api/work-logs?filters[name][$eq]=${user.username}`,
          { headers }
        );

        const workLog = logRes.data?.data?.[0] || {};

        // 3️⃣ Merge user info + work-log info
        setUserDetail({
          student_id: workLog.student_id || "Not Available", // ✅ fix here
          username: userData.username || user.username,
          assigned_tasks: workLog.assigned_tasks || [],
          remarks: workLog.remarks || [],
          work_status: workLog.work_status || "pending",
          check_in: workLog.check_in || null,
          check_out: workLog.check_out || null,
        });
      } catch (err) {
        console.error("Error fetching user detail:", err);
        setUserDetail(user); // fallback
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetail();
  }, [user, token]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <p className="text-white">Loading user details...</p>
      </div>
    );
  }

  if (!userDetail) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-lg rounded-xl p-6 overflow-auto max-h-[90vh]">
        <h2 className="text-xl font-semibold mb-4">User Details: {userDetail.username}</h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Student ID:</strong> {userDetail.student_id}
          </p>
          <p>
            <strong>Name:</strong> {userDetail.username}
          </p>
          <p>
            <strong>Check In:</strong>{" "}
            {userDetail.check_in ? new Date(userDetail.check_in).toLocaleString() : "Not Available"}
          </p>
          <p>
            <strong>Check Out:</strong>{" "}
            {userDetail.check_out ? new Date(userDetail.check_out).toLocaleString() : "Not Available"}
          </p>
          <p>
            <strong>Work Status:</strong> {userDetail.work_status}
          </p>

          <div>
            <strong>Assigned Tasks:</strong>
            {userDetail.assigned_tasks.length > 0 ? (
              <ul className="list-disc ml-5 mt-1">
                {userDetail.assigned_tasks.map((task, idx) => (
                  <li key={idx}>{task.children.map(c => c.text).join(" ")}</li>
                ))}
              </ul>
            ) : (
              <p className="ml-5 mt-1 text-gray-500">No tasks assigned</p>
            )}
          </div>

          <div>
            <strong>Remarks:</strong>
            {userDetail.remarks.length > 0 ? (
              <ul className="list-disc ml-5 mt-1">
                {userDetail.remarks.map((remark, idx) => (
                  <li key={idx}>{remark.children.map(c => c.text).join(" ")}</li>
                ))}
              </ul>
            ) : (
              <p className="ml-5 mt-1 text-gray-500">No remarks</p>
            )}
          </div>
        </div>

        <div className="flex justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm bg-gray-300 rounded-md hover:bg-gray-400"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

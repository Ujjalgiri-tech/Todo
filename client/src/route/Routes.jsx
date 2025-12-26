import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/auth/Login.jsx";
import Register from "../pages/auth/Register.jsx";
import AdminDashboard from "../pages/dashboard/AdminDashboard.jsx";
import MyTasks from "../pages/dashboard/MyTasks.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import Landing from "../components/landing/landing.jsx";
import AssignTask from "../pages/dashboard/AssignTask.jsx";
import EditTask from "../pages/dashboard/EditTask.jsx";
import UserDetail from "../pages/dashboard/UserDetails.jsx";
import HowItWorks from "../components/common/HowItWorks.jsx";
import Contact from "../components/common/Contact.jsx";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/assign-task" element={<AssignTask/>}/>
        <Route path="/edit-task/:documentId" element={<EditTask />} />
        <Route path="users" element={<UserDetail/>}/>
        <Route path="how-it-works" element={<HowItWorks/>}/>
        <Route path="contact" element={<Contact/>}/>


        {/* Admin dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* User tasks */}
        <Route
          path="/my-tasks"
          element={
            <ProtectedRoute>
              <MyTasks />
            </ProtectedRoute>
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
// Adjust path if needed

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();// Get user and logout function

  const handleLogout = () => {
    logout(); // Clears localStorage, token, and user
    navigate("/"); // Redirect to home (or "/login" if you prefer)
  };

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full fixed top-0 z-50 bg-linear-to-r from-gray-200 to-gray-300 backdrop-blur "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-xl font-bold text-emerald-600 cursor-pointer"
        >
          Team Flow
        </h1>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-8 text-gray-700">
          <a href="#hero" className="hover:text-emerald-600">About Us</a>
          <a href="#features" className="hover:text-emerald-600">Features</a>
          <Link to="/how-it-works" className="hover:text-emerald-600">
            How it Works
          </Link>
          <a href="#pricing" className="hover:text-emerald-600">Pricing</a>
          <Link to="/contact" className="hover:text-emerald-600">Contact</Link>
        </div>

        {/* AUTH BUTTONS - Conditional */}
        <div className="flex gap-3">
          {user ? (
            <>
              {/* Optional: Show username */}
              <span className="hidden sm:flex items-center text-gray-700 text-sm">
                Hi, {user.username || user.email.split("@")[0]}
              </span>

              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-md text-sm hover:bg-red-700 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition"
              >
                Log in
              </Link>

              <Link
                to="/register"
                className="px-4 py-2 bg-emerald-600 text-white rounded-md text-sm hover:bg-emerald-700 transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </motion.nav>
  );
}
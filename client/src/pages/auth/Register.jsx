import { motion } from "framer-motion";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Login from "./Login";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const saveApiData = async (e) => {
    e.preventDefault();

    // ✅ REGEX PATTERNS (ADDED)
    const nameRegex = /^[A-Za-z]+(?:\s[A-Za-z]+)+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

    // ✅ NAME VALIDATION
    if (!nameRegex.test(data.username)) {
      alert("Name must contain only letters and at least two words");
      return;
    }

    // ✅ EMAIL VALIDATION
    if (!emailRegex.test(data.email)) {
      alert("Please enter a valid email address");
      return;
    }

    // ✅ PASSWORD VALIDATION
    if (!passwordRegex.test(data.password)) {
      alert(
        "Password must be at least 6 characters and include one special character"
      );
      return;
    }

    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:1337/api/auth/local/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username,
            email: data.email,
            password: data.password,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        alert(result.error?.message || "Registration failed");
        return;
      }

      const isOk = window.confirm("Account Created Successfully!");
      if (isOk) {
        navigate("/landing");
      }
      console.log(result);
    } catch (error) {
      console.error(error);
      alert("Server error");
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-gray-200 via-gray-300 to-gray-400 flex items-start justify-center px-4 py-8 sm:py-12 lg:py-16">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md bg-emerald-200 rounded-xl shadow-lg border border-gray-200 p-6 sm:p-8"
      >
        <div className="text-center mb-6">
          <h2 className="text-2xl font-semibold text-gray-900">
            Create your account
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Join our community and unlock exclusive features for students.
          </p>
        </div>

        <form onSubmit={saveApiData} className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              name="username"
              value={data.username}
              onChange={handleChange}
              type="text"
              placeholder="John Doe"
              required
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700">Email</label>
            <input
              name="email"
              value={data.email}
              onChange={handleChange}
              type="email"
              placeholder="john.doe@example.com"
              required
              className="w-full border rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={data.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                required
                className="w-full border rounded-md px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-medium text-gray-700">
              Confirm Password
            </label>
            <div className="relative">
              <input
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
                type={showConfirm ? "text" : "password"}
                required
                className="w-full border rounded-md px-3 py-2 pr-10 text-sm focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm}
              </button>
            </div>
          </div>

          <motion.button
            type="submit"
            whileTap={{ scale: 0.97 }}
            className="w-full rounded-full bg-blue-600 py-2.5 text-white font-medium hover:bg-blue-700"
          >
            Create Account
          </motion.button>
        </form>

        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">OR CONTINUE WITH</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        <button className="w-full rounded-full border border-gray-300 py-2 text-sm font-medium hover:bg-gray-100 flex justify-center gap-2">
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            className="w-4 h-4"
            alt="Google"
          />
          Sign up with Google
        </button>

        <p className="text-sm text-center text-gray-500 mt-6">
          Already have an account?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            <Link to="/login">Log in</Link>
          </span>
        </p>
      </motion.div>
    </div>
  );
}

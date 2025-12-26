import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/AuthContext.jsx";
import ParticlesBackground from "../../components/common/Particles.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // LOGIN
      const res = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: formData.email,
        password: formData.password,
      });

      const { jwt } = res.data;

      // GET FULL USER INFO
      const userRes = await axios.get(
        "http://localhost:1337/api/users/me?populate=role",
        {
          headers: { Authorization: `Bearer ${jwt}` },
        }
      );

      const fullUser = userRes.data;

      // SAVE TOKEN + USER
      login(jwt, fullUser);

      // REDIRECT
      if (fullUser.role?.name === "admin") {
        navigate("/dashboard", { replace: true });
      } else {
        navigate("/my-tasks", { replace: true });
      }
    } catch (err) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <div className="min-h-screen flex items-center justify-center bg-linear-to-r from-gray-500 via-gray-700 to-gray-400 px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="w-full max-w-md bg-emerald-400 rounded-xl shadow-lg px-8 py-10"
      >
        <div className="flex flex-col items-center mb-6">
          <div className="w-10 h-10 rounded-lg bg-emerald-900 flex items-center justify-center text-white font-bold">
            ⚡
          </div>
          <span className="mt-2 text-black font-semibold text-lg">
            TeamFlow
          </span>
        </div>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Welcome Back
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              required
              className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm text-gray-600 mb-1">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                value={formData.password}
                onChange={handleChange}
                type={showPassword ? "text" : "password"}
                required
                className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-blue-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2.5 rounded-lg font-medium disabled:opacity-70"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </motion.div>
    </div>
    <ParticlesBackground/>
    </>
  );
}

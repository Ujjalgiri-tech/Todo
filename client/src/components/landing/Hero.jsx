import { motion } from "framer-motion";
import dashboard from "../../assets/images/dasboard.png";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();
  return (
    <section id="hero" className="min-h-screen bg-linear-to-br from-emerald-50 to-white flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">
        
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight">
            Revolutionize <br />
            Your Workflow <br />
            with Our <span className="text-emerald-600">TeamFlow Web</span>
          </h1>

          <p className="mt-6 text-gray-600 max-w-md">
            Streamline team collaboration, manage tasks effortlessly,
            and boost productivity with our intuitive platform.
          </p>

          <div className="mt-8 flex gap-4">
            <button className="px-6 py-3 bg-emerald-500 text-white rounded-lg hover:scale-105 transition"
            onClick={() => navigate("/register")}
            >
              Get Started Free
            </button>
            <button className="px-6 py-3 border rounded-lg hover:bg-gray-100">
              Watch Demo
            </button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          
        >
          <div className="h-64 flex items-center justify-center text-gray-400">
            <img src={dashboard} className="w-120 h-80 rounded-2xl"/>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import signup from "../../assets/images/signup.jpg";



export default function HowItWorks() {
  const navigate = useNavigate();

  return (
    <>
      {/* NAVBAR */}
      <Navbar onLogoClick={() => navigate("/")}/>

      {/* HERO SECTION */}
      <section className="min-h-screen pt-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
              Streamline Your Workflow, Elevate <br />
              Your Team's Potential
            </h1>

            <p className="mt-6 text-gray-600 max-w-lg">
              TeamFlow helps you manage projects, tasks, and team collaboration
              with intuitive tools and stunning visual dashboards.
              Get more done, together.
            </p>

            <button className="mt-8 px-6 py-3 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition">
              Get Started Now
            </button>
          </motion.div>

          {/* Right Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-xl shadow-md p-6 flex items-center justify-center"
          >
            <div className="h-64 w-full bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
              <img src={signup}/>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STEPS SECTION */}
      <section className="min-h-screen py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">

          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-3xl font-bold text-center mb-16"
          >
            How TeamFlow works in 4 simple steps
          </motion.h2>

          {/* Steps Grid */}
          <div className="grid md:grid-cols-2 gap-12 relative">

            {/* Vertical Divider */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-gray-200" />

            {/* STEP 1 */}
            <StepCard
              step="1"
              title="Sign up & create team"
              desc="Easily register your account and invite your colleagues to form a new team workspace."
            />

            {/* STEP 2 */}
            <StepCard
              step="2"
              title="Add & assign tasks"
              desc="Break down projects into manageable tasks and assign them to team members."
            />

            {/* STEP 3 */}
            <StepCard
              step="3"
              title="Track progress with Kanban & My Tasks"
              desc="Visualize your workflow on a Kanban board and monitor progress efficiently."
            />

            {/* STEP 4 */}
            <StepCard
              step="4"
              title="Review & complete"
              desc="Review work, mark tasks complete, and celebrate achievements."
            />

          </div>
        </div>
      </section>

      {/* CTA SECTION */}
      <section className="bg-emerald-500 py-20">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-3xl font-bold">
            Ready to transform your team's productivity?
          </h2>
          <p className="mt-4 text-emerald-100">
            Join thousands of teams already achieving more with TeamFlow.
          </p>

          <button className="mt-8 px-8 py-3 bg-black text-white rounded-lg hover:opacity-90 transition cursor-pointer"
          onClick={() => navigate("/register")}
          >
            Start Your Free Trial
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <Footer/>
    </>
  );
}

/* STEP CARD COMPONENT */
function StepCard({ step, title, desc }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-sm p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <span className="w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center text-sm font-semibold">
          {step}
        </span>
        <span className="text-sm text-emerald-600 font-medium">
          Step {step}
        </span>
      </div>

      <h3 className="font-semibold text-lg text-gray-900">
        {title}
      </h3>

      <div className="mt-4 h-40 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
        Step {step} Image
      </div>

      <p className="mt-4 text-gray-600 text-sm">
        {desc}
      </p>
    </motion.div>
  );
}

import { motion } from "framer-motion";

const features = [
  {
    title: "Responsive Design",
    desc: "Access your projects from any device with optimized performance."
  },
  {
    title: "Team Collaboration",
    desc: "Shared workspaces, real-time updates, and integrated tools."
  },
  {
    title: "Task Assignment & Status",
    desc: "Assign tasks, track progress, and monitor project timelines."
  }
];

export default function Features() {
  return (
    <section id="features" className=" py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold">
          Powerful Features to Boost Productivity
        </h2>
        <p className="text-gray-500 mt-2">
          Unlock your team’s full potential with seamless collaboration.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {features.map((f, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -8 }}
            className="bg-white p-8 rounded-xl shadow hover:shadow-lg transition"
          >
            <h3 className="font-semibold text-lg">{f.title}</h3>
            <p className="text-gray-600 mt-3">{f.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

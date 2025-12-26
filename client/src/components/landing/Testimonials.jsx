import { motion } from "framer-motion";

export default function Testimonials() {
  return (
    <section className=" bg-gray-50 py-20">
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold">What Our Customers Say</h2>
        <p className="text-gray-500 mt-2">
          Hear directly from satisfied users
        </p>
      </div>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6">
        {["John Doe", "Jane Smith"].map((name, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-white p-8 rounded-xl shadow"
          >
            <p className="italic text-gray-600">
              “A game-changer for project management. Highly recommended.”
            </p>
            <h4 className="mt-4 font-semibold">{name}</h4>
            <span className="text-sm text-gray-500">
              Project Manager
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

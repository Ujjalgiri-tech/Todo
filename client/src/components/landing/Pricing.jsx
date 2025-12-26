import { motion } from "framer-motion";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen py-24 bg-white flex items-center"
    >
      <div className="max-w-7xl mx-auto px-6 w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Flexible Plans for Every Team
          </h2>
          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Choose the perfect plan to match your team’s needs and scale as you grow.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {/* Basic Plan */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="border rounded-2xl p-8 shadow-sm hover:shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Basic
            </h3>

            <p className="mt-4 text-4xl font-bold text-gray-900">
              $19
              <span className="text-base font-normal text-gray-500">
                /month
              </span>
            </p>

            <ul className="mt-6 space-y-3 text-gray-600">
              <li>✔ Unlimited projects</li>
              <li>✔ Basic analytics</li>
              <li>✔ Team collaboration (up to 5 users)</li>
              <li>✔ Email support</li>
            </ul>

            <button className="mt-8 w-full py-3 rounded-lg bg-blue-500 text-white font-medium hover:bg-blue-600 transition">
              Start Basic Plan
            </button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.3 }}
            className="rounded-2xl p-8 bg-emerald-50 border border-emerald-300 shadow-md"
          >
            <h3 className="text-xl font-semibold text-gray-800">
              Pro
            </h3>

            <p className="mt-4 text-4xl font-bold text-gray-900">
              $49
              <span className="text-base font-normal text-gray-500">
                /month
              </span>
            </p>

            <ul className="mt-6 space-y-3 text-gray-700">
              <li>✔ All Basic features</li>
              <li>✔ Advanced analytics & reporting</li>
              <li>✔ Unlimited team members</li>
              <li>✔ Priority chat support</li>
              <li>✔ Custom integrations</li>
            </ul>

            <button className="mt-8 w-full py-3 rounded-lg bg-emerald-500 text-white font-medium hover:bg-emerald-600 transition">
              Go Pro
            </button>
          </motion.div>
        </div>

        {/* View All Plans Button */}
        <div className="mt-12 text-center">
          <button className="px-6 py-3 rounded-lg border border-emerald-400 text-emerald-600 hover:bg-emerald-50 transition">
            View All Plans
          </button>
        </div>
      </div>
    </section>
  );
}

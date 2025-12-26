import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  // Regex patterns
  const nameRegex = /^[A-Za-z\s]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    let newErrors = {};

    if (!nameRegex.test(formData.name)) {
      newErrors.name = "Name can only contain letters";
    }

    if (!emailRegex.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      console.log("Form Submitted", formData);
      alert("Message sent successfully!"); // Success alert
      setFormData({ name: "", email: "", subject: "", message: "" }); // Reset form
      setErrors({});
    }
  };

  return (
    <>
      <Navbar />
      <div className="bg-gray-50 py-20 px-4">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <h1 className="text-4xl font-bold text-gray-900">
            Get in Touch with TeamFlow
          </h1>
          <p className="text-gray-600 mt-4">
            We're here to help you achieve seamless collaboration and
            productivity. Reach out to us with any questions or support needs.
          </p>
        </motion.div>

        {/* MAIN CONTENT */}
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* CONTACT FORM */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-xl shadow-lg p-8"
          >
            <h2 className="text-xl font-semibold mb-2">Send us a Message</h2>
            <p className="text-gray-500 mb-6">
              We'd love to hear from you! Please fill out the form below.
            </p>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* NAME */}
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your full name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                )}
              </div>

              {/* EMAIL */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                )}
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  placeholder="What can we help you with?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  placeholder="Your detailed message..."
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-4 py-2 focus:ring-2 focus:ring-green-400 outline-none"
                />
              </div>

              {/* BUTTON */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold shadow-md"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>

          {/* CONTACT DETAILS */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-xl font-semibold mb-4">
                Our Contact Details
              </h2>

              <p className="flex items-center gap-2 text-gray-700 mb-3">
                📧 support@teamflow.com
              </p>

              <p className="text-gray-700 leading-relaxed">
                📍 TeamFlow Headquarters <br />
                123 Collaboration Avenue <br />
                Suite 400 <br />
                Innovation City, CA 90210
              </p>
            </div>

            {/* IMAGE */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <iframe
                title="TeamFlow Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28293.81571718674!2d85.28440217415575!3d27.715235498212574!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb19048e2760fb%3A0x7e52c2907dfec554!2sKathmandu%2C%20Nepal!5e0!3m2!1sen!2snp!4v170XXXYYYYZZZZ"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="eager"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-56 object-cover"
              ></iframe>
              <button className="w-full bg-blue-500 text-white py-3 font-semibold">
                Schedule a Demo
              </button>
            </div>
          </motion.div>
        </div>

        {/* FAQ SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className="max-w-4xl mx-auto mt-24"
        >
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          <div className="bg-white rounded-xl shadow-lg divide-y">
            {[
              {
                q: "How can TeamFlow help my team be more productive?",
                a: "TeamFlow streamlines task management, project tracking, and collaboration through intuitive Kanban boards and customizable workflows.",
              },
              {
                q: "Is TeamFlow suitable for small and large teams?",
                a: "Yes, TeamFlow scales with your team from startups to enterprises.",
              },
              {
                q: "What kind of support does TeamFlow offer?",
                a: "We provide 24/7 email and chat support.",
              },
              {
                q: "Can I integrate TeamFlow with my existing tools?",
                a: "Yes, TeamFlow integrates with popular tools like Slack and Jira.",
              },
              {
                q: "What are TeamFlow's security measures?",
                a: "We use enterprise-grade encryption and secure authentication.",
              },
            ].map((item, index) => (
              <details key={index} className="p-5 cursor-pointer">
                <summary className="font-medium">{item.q}</summary>
                <p className="text-gray-600 mt-2">{item.a}</p>
              </details>
            ))}
          </div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
}

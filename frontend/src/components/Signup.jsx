import React, { useState } from "react";
import { motion } from "framer-motion";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-[#B9CFE5] to-[#E3F2FD]">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="bg-white bg-opacity-70 backdrop-blur-lg p-8 rounded-xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-[#0D47A1] text-center mb-6">
          Create Your Account
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Name Field */}
          <div>
            <label className="block text-[#0D47A1] font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition-all"
            />
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-[#0D47A1] font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition-all"
            />
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-[#0D47A1] font-semibold">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-3 mt-1 border rounded-lg bg-white bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-[#0D47A1] transition-all"
            />
          </div>

          {/* Signup Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full bg-[#0D47A1] text-white font-semibold py-3 rounded-lg shadow-md hover:bg-[#0a3871] transition-all"
          >
            Sign Up
          </motion.button>
        </form>

        {/* Already have an account? */}
        <p className="text-center text-gray-700 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-[#0D47A1] font-semibold hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
import interviewImage from "../assets/vdoCall.jpg";

const Dashboard = () => {
  const navigate = useNavigate(); 
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    jobRole: "",
    techStack: "",
    experience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("User Info:", formData);

    // Redirect to the InterviewPage
    navigate("/interview");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-16 bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB]">
      {!showForm ? (
        <>
          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-[#0D47A1] mb-3 drop-shadow-md transform -translate-y-10">
              Interview WarmUp
            </h1>
            <p className="text-lg text-gray-800 leading-relaxed">
              Before you interview, get warmed up! If interviewing makes you nervous, 
              you're not alone. Like any skill, it requires practice.
            </p>
          </motion.div>

          {/* Main Content Section */}
          <div className="flex items-center justify-between w-full max-w-5xl">
            {/* Left Side: Text */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-1/2"
            >
              <p className="text-lg text-gray-800 leading-relaxed mb-5">
                Interview WarmUp helps you become familiar with key questions, refine 
                your answers, and get more comfortable with the interview process.
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-6 py-3 bg-[#0D47A1] text-white text-lg font-bold rounded-md shadow-lg transition-all duration-300 hover:bg-[#0e2a6d]"
                onClick={() => setShowForm(true)}
              >
                Get Started
              </motion.button>
            </motion.div>

            {/* Right Side: Image */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="w-1/2 flex justify-end"
            >
              <img
                src={interviewImage}
                alt="Interview WarmUp"
                className="w-full max-w-md rounded-lg shadow-lg"
              />
            </motion.div>
          </div>
        </>
      ) : (
        // Form Section
        <motion.form
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          onSubmit={handleSubmit}
          className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg"
        >
          <h2 className="text-2xl font-bold text-[#0D47A1] mb-4 text-center">Tell us about your Interview</h2>

          <label className="block mb-4">
            <span className="text-gray-700">Job role/ job position</span>
            <input
              type="text"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g., Full stack developer"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Job description/ Tech stack(in short)</span>
            <input
              type="text"
              name="techStack"
              value={formData.techStack}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g., React, Angular, NodeJs, MySql etc"
            />
          </label>

          <label className="block mb-4">
            <span className="text-gray-700">Years of experience</span>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="w-full mt-2 p-2 border rounded-md"
              placeholder="e.g., 5"
            />
          </label>

          <div className="flex justify-between mt-6">
            <button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-md"
              onClick={() => setShowForm(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-[#0D47A1] text-white rounded-md hover:bg-[#0e2a6d]"
            >
              Start Interview
            </button>
          </div>
        </motion.form>
      )}
    </div>
  );
};

export default Dashboard;

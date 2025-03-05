import React from "react";
import { motion } from "framer-motion";

const Upgrade = () => {
  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-[#E3F2FD] to-[#BBDEFB] flex flex-col items-center py-16 px-8 text-center">
     <motion.h1 
  initial={{ opacity: 0, y: -20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1 }}
  className="text-4xl font-bold mt-5 text-[#0D47A1] relative"
  style={{
    textShadow: `
      1px 1px 0px rgba(0, 0, 0, 0.2), 
      2px 2px 2px rgba(0, 0, 0, 0.15),
      3px 3px 5px rgba(0, 0, 0, 0.1)
    `
  }}
>
  Unlock Your <span className="text-[#1976D2]">Full Potential</span>
</motion.h1>


      <motion.p 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 1 }}
        className="text-lg max-w-xl mt-6 mb-8 text-[#0D47A1]"
      >
        Upgrade to Pro and get AI-powered insights, unlimited interviews, and expert feedback!
      </motion.p>

      {/* Features Table */}
      <motion.div 
  initial={{ scale: 0.8, opacity: 0 }}
  animate={{ scale: 1, opacity: 1 }}
  transition={{ duration: 0.8 }}
  className="bg-white bg-opacity-90 p-6 rounded-lg w-4/5 max-w-2xl shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
>
  <h2 className="text-xl font-bold mb-4 text-[#0D47A1]">Features</h2>
  <div className="flex justify-between gap-6">
    <div className="w-1/2 p-5 rounded-lg bg-gray-300 bg-opacity-40 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-bold text-[#0D47A1]">Free Plan</h3>
      <ul className="mt-2 space-y-2 text-[#0D47A1]">
        <li>Basic Analysis</li>
        <li>Limited mock interviews</li>
        <li>Limited question banks</li>
        <li>No custom interviews</li>
        <li>Limited analysis of resume</li>
        <li>Less priority support</li>
      </ul>
    </div>
    <div className="w-1/2 p-5 rounded-lg bg-blue-300 bg-opacity-40 shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300">
      <h3 className="text-lg font-bold text-[#0D47A1]">🔥 Pro Plan</h3>
      <ul className="mt-2 space-y-2 text-[#0D47A1]">
        <li>🔥 In-depth Report + Suggestions</li>
        <li>🔥 Unlimited mock interviews</li>
        <li>🔥 500+ AI-generated questions</li>
        <li>🔥 Custom interviews</li>
        <li>🔥 AI-powered CV Review</li>
        <li>🔥 24/7 Support</li>
      </ul>
    </div>
  </div>
</motion.div>

      {/* Offer Section */}
      <motion.h2 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.5, duration: 1 }}
  className="text-2xl font-bold mt-12 text-[#0D47A1] hover:scale-105 hover:text-[#0A3571] transition-all duration-300"
>
  Get 20% off on your <span className="text-[#1976D2] hover:text-[#1058A2] transition-all duration-300">1st Upgrade</span>
</motion.h2>

<div className="bg-white bg-opacity-90 p-6 rounded-lg mt-6 w-3/4 max-w-lg shadow-lg mb-12 
  hover:shadow-2xl hover:scale-105 transition-all duration-300">
  <p className="text-[#0D47A1]">
    • Monthly Plan (₹199/month) <br />
    • Yearly Plan (₹1499/year) <br />
    (Save 35%) <br />
    Include a Secure Payment Badge (Stripe, Razorpay, PayPal, etc.)
  </p>
</div>


      {/* Pricing Buttons */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="flex gap-6 mt-8 mb-12"
      >
        <button className="bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] px-8 py-3 rounded-lg text-lg font-bold text-white shadow-lg hover:scale-105 transition-all">
          ₹199/month
        </button>
        <button className="bg-gradient-to-r from-[#64B5F6] to-[#42A5F5] px-8 py-3 rounded-lg text-lg font-bold text-white shadow-lg hover:scale-105 transition-all">
          ₹1499/year
        </button>
      </motion.div>

      {/* What Our Pro Users Say */}
      <motion.div 
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.7, duration: 1 }}
  className="bg-white bg-opacity-90 p-6 rounded-lg w-4/5 max-w-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
>
  <h2 className="text-2xl font-bold mb-6 text-[#0D47A1]">What Our Pro Users Say</h2>
  <div className="space-y-6">
    <motion.p 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.8, duration: 1 }}
      className="text-[#0D47A1] bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      ⭐⭐⭐⭐⭐ "This platform transformed my interview preparation. The AI-generated feedback is spot on!" - <strong>Aryan K.</strong>
    </motion.p>
    <motion.p 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1, duration: 1 }}
      className="text-[#0D47A1] bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      ⭐⭐⭐⭐⭐ "Unlimited mock interviews made me more confident. Highly recommended!" - <strong>Pooja S.</strong>
    </motion.p>
    <motion.p 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 1.2, duration: 1 }}
      className="text-[#0D47A1] bg-gray-100 p-4 rounded-lg shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-300"
    >
      ⭐⭐⭐⭐⭐ "The CV review and custom interviews are game-changers!" - <strong>Rahul M.</strong>
    </motion.p>
  </div>
</motion.div>

      {/* Terms & Conditions */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="w-full bg-gradient-to-r from-[#BBDEFB] to-[#90CAF9] py-6 mt-12 text-center shadow-md"
      >
        <h2 className="text-lg font-bold text-[#0D47A1]">Terms & Conditions</h2>
        <p className="text-[#0D47A1] mt-2 max-w-2xl mx-auto">
          • The Pro plan subscription is non-refundable and non-transferable. <br />
          • The promotional 20% discount is valid for the first purchase only. <br />
          • AI-generated reports and feedback are suggestions and should not be considered professional advice. <br />
          • Prices are subject to change based on market conditions. <br />
          • By upgrading, you agree to our terms and privacy policy.
        </p>
      </motion.div>
    </div>
  );
};

export default Upgrade;

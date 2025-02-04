import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import image from "../assets/image.webp";
import sarah from "../assets/sarah.png";
import google from "../assets/google.svg";
import amazon from "../assets/amazon.svg";
import adobe from "../assets/adobe.svg";
import goldman from "../assets/goldman.svg";
import Dashboard from "./Dashboard";
import interview from "../assets/interview.png"
import feedback from "../assets/feedback.png"
import ailogo from "../assets/ailogo.png"

import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card";


const Home = () => {
  const images = [google, amazon, adobe, goldman];

  const marqueeRef = useRef(null);

  useEffect(() => {
    const marquee = marqueeRef.current;

    gsap.to(marquee, {
      x: "0%", // Moves half the length for infinite loop effect
      duration: 15, // Adjust for slower speed
      ease: "linear",
      repeat: -1, // Infinite loop
    });
  }, []);

  const faqs = [
    { question: "For what the NextRound is?", answer: "NextRound is an AI-powered platform..." },
    { question: "How does NextRound use AI?", answer: "NextRound leverages AI to provide insights..." },
    { question: "What can I expect out of Insights?", answer: "Insights provide data-driven recommendations..." },
    { question: "Does Google save or have access to the answer?", answer: "No, Google does not have access to your responses..." }
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };


  return (
    <div className="">
      <nav className="bg-slate-500 flex justify-between p-4 items-center">
        <div className="logo">
          <Link to="/" className="text-purple">
            <h1>
              Next<span className="text-white">Round</span>
            </h1>
          </Link>
        </div>
        <div className="nav-links">
          <ul className="flex gap-10 text-lg font-semibold">
            <li className="hover:text-gray-200">
              <NavLink
                to="/"
                style={({ isActive }) =>
                  isActive
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "white", fontWeight: "normal" }
                }
              >
                Home
              </NavLink>
            </li>
            <li className="hover:text-gray-200">
              <NavLink
                to="/Dashboard"
                style={({ isActive }) =>
                  isActive
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "white", fontWeight: "normal" }
                }
              >
                Dashboard
              </NavLink>
            </li>
            <li className="hover:text-gray-200">
              <NavLink
                to="/Aboutus"
                style={({ isActive }) =>
                  isActive
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "white", fontWeight: "normal" }
                }
              >
                AboutUs
              </NavLink>
            </li>
            <li className="hover:text-gray-200">
              <NavLink
                to="/Upgrade"
                style={({ isActive }) =>
                  isActive
                    ? { color: "black", fontWeight: "bold" }
                    : { color: "white", fontWeight: "normal" }
                }
              >
                Upgrade
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="text-lg font-semibold">
          <Link to="/Signup">Signup</Link>
        </div>
      </nav>
      <Outlet></Outlet>
      <main className="home-content">
        <div className="bg-gradient-to-b from-white to-[#B9CFE5] min-h-96 flex items-center justify-center px-6 ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-32 mt-32">
            {/* Left Section */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
                Land Your Dream Job with{" "}
                <span className="text-slate-500">100% Confidence</span>
              </h1>
              <p className="mt-4 text-gray-600 text-lg">
                Every day, 500 candidates level up with us. Join them, crush
                your nerves, and become interview-ready.
              </p>
              <button
                className="mt-6 bg-slate-500 text-white py-3 px-6 rounded-md font-medium shadow-lg hover:bg-black hover:text-white transition"
                onClick={<Dashboard />}
              >
                Start Your Journey &rarr;
              </button>
            </div>

            {/* Right Section */}
            <div className="flex-1">
              <div className="relative">
                <img
                  src={image}
                  alt="Mock Interview Demo"
                  className="rounded-lg shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <div className="marque overflow-hidden bg-[#F3F1E2] py-4">
      <div className="flex gap-6 w-max" ref={marqueeRef}>
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={`Image ${index + 1}`}
              className="h-16 w-[15%] rounded-lg shadow-md object-contain mix-blend-color-burn "
            />
          ))}
          {/* Duplicate images for a seamless effect */}
          {images.map((img, index) => (
            <img
              key={`dup-${index}`}
              src={img}
              alt={`Duplicate Image ${index + 1}`}
              className="h-16 w-[15%] rounded-lg shadow-md object-contain mix-blend-color-burn "
            />
          ))}
        </div>
      </div>
      <div className="working bg-gradient-to-b from-white via-[#B9CFE5] to-white min-h-[790px] mt-32 px-6">
        <div className="header flex flex-col justify-center items-center">
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-800">
                    How It Works ?
          </h1>
          <h4 className="pt-4 text-2xl opacity-80">
          Streamline Your Interview Process – From Start to Success!
          </h4>
        </div>
        <div className="corousel pt-32">
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index} className="flex justify-center">
                <Card className="w-full">
                  <CardContent className="p-0">
                    <img
                      src={img}
                      alt={`Slide ${index + 1}`}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        </div>
      </div>
      <div className="features">
        <div className="min-h-screen bg-gradient-to-b from-white to-[#FFB3B366] p-12">
        {/* Features Section */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-10 text-black drop-shadow-lg">
            Take a Look at Our Features!
          </h2>
          <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="p-8 border border-gray-300 shadow-2xl rounded-2xl text-center bg-white transform transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center mb-6">
                <span className="bg-red-200 p-6 rounded-full">
                  <img src={interview} alt="AI Interview" className="w-16 h-16" />
                </span>
              </div>
              <h3 className="font-bold text-2xl text-gray-800">AI-Powered Mock Interviews</h3>
              <p className="text-gray-600 mt-3 text-lg">
                Experience realistic interviews with AI-driven questions and instant feedback to improve your skills.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 border border-gray-300 shadow-2xl rounded-2xl text-center bg-white transform transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center mb-6">
                <span className="bg-red-200 p-6 rounded-full">
                  <img src={feedback} alt="Performance Analytics" className="w-16 h-16" />
                </span>
              </div>
              <h3 className="font-bold text-2xl text-gray-800">Performance Analytics & Feedback</h3>
              <p className="text-gray-600 mt-3 text-lg">
                Get detailed insights on your strengths and areas for improvement with real-time performance tracking.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 border border-gray-300 shadow-2xl rounded-2xl text-center bg-white transform transition-transform duration-300 hover:scale-105">
              <div className="flex justify-center mb-6">
                <span className="bg-red-200 p-6 rounded-full">
                  <img src={ailogo} alt="Interview Simulations" className="w-16 h-16" />
                </span>
              </div>
              <h3 className="font-bold text-2xl text-gray-800">Realistic Interview Simulations</h3>
              <p className="text-gray-600 mt-3 text-lg">
                Practice with industry-specific questions, video interviews, and time-bound challenges to boost confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Thoughts Section */}
        <div className="text-center mt-20">
          <h2 className="text-4xl font-extrabold mb-10 text-black drop-shadow-lg">Your Thoughts Shape Us</h2>
          <div className="max-w-5xl mx-auto bg-white border border-gray-300 shadow-2xl rounded-2xl p-10 flex items-center">
            <div className="w-28 h-28 flex-shrink-0 mr-6">
              <img src={sarah} alt="User" className="rounded-xl shadow-md" />
            </div>
            <div className="text-left">
              <p className="text-gray-800 text-lg">
                "I was self-employed for 13 years and I'd never really done any interviews. Using Interview Warmup I learned 
                how to answer questions in a much more professional way. It's been a big confidence boost."
              </p>
              <p className="font-bold text-gray-700 mt-4 text-lg">- Sarah Anderson</p>
            </div>
          </div>

          {/* Feedback Input */}
          <div className="mt-12">
            <label className="block text-gray-800 font-semibold text-xl mb-3">Give Your Feedback Here...</label>
            <input
              type="text"
              className="w-full max-w-2xl mx-auto border border-gray-400 rounded-xl p-4 text-lg shadow-md"
              placeholder="Type your feedback..."
            />
          </div>
        </div>
      </div>
      </div>
      <div className="bottom bg-gradient-to-b from-[#FFB3B366] to-[#B9CFE5] min-h-screen flex flex-col justify-between">
      <div className="max-w-5xl mx-auto p-12 mt-32 mb-16">
        <h2 className="text-5xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-gray-400 pb-4 cursor-pointer text-2xl"
              onClick={() => toggleFAQ(index)}
            >
              <div className="flex justify-between items-center py-4 font-semibold">
                <span>{faq.question}</span>
                <FaChevronDown
                  className={`transition-transform text-3xl ${openIndex === index ? "rotate-180" : ""}`}
                />
              </div>
              {openIndex === index && (
                <p className="text-gray-700 mt-4 text-xl">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">About Us</a></li>
              <li><a href="#" className="hover:underline">Careers</a></li>
              <li><a href="#" className="hover:underline">Press</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Help Center</a></li>
              <li><a href="#" className="hover:underline">Contact Us</a></li>
              <li><a href="#" className="hover:underline">FAQs</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:underline">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-2xl"><i className="fab fa-facebook"></i></a>
              <a href="#" className="text-2xl"><i className="fab fa-instagram"></i></a>
              <a href="#" className="text-2xl"><i className="fab fa-twitter"></i></a>
            </div>
          </div>
        </div>
        <div className="text-center mt-8 text-sm text-gray-400">
          <p>© 2024 My Interview Practice, All Rights Reserved.</p>
          <p>1632 1st Avenue #21030, New York, NY 10028</p>
        </div>
      </footer>
    </div>
    </div>
  );
};

export default Home;



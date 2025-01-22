import React from "react";
import { Link, NavLink, Outlet } from "react-router-dom";
import image from "../assets/image.webp";

const Home = () => {
    const images = [
       "../assets/1.svg",
       "../assets/2.svg",
       "../assets/3.svg",
       "../assets/4.svg",
       "../assets/5.svg",
       "../assets/7"
    ]
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
        
        <div className="bg-gradient-to-b from-white to-[#fdf3f1] min-h-screen flex items-center justify-center px-6 ">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 mb-72">
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
              <button className="mt-6 bg-slate-500 text-white py-3 px-6 rounded-md font-medium shadow-lg hover:bg-black hover:text-white transition">
                Get Started &rarr;
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
      <div className="marque">
      {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="h-32 w-auto object-contain"
          />
        ))}
      </div>
    </div>
  );
};

export default Home;

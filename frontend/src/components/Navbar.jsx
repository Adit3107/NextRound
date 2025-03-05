import React from "react";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
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
  );
};

export default Navbar;

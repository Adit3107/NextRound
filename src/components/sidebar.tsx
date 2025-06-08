// sidebar.tsx
import React from "react";
import { LogOut, User, BarChart2, BookOpen } from "lucide-react";
import { useUser } from "@clerk/clerk-react"; // 👈 import Clerk hook

interface SidebarProps {
  setActivePage: (page: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ setActivePage }) => {
  const { user } = useUser(); // 👈 get user from Clerk
  const name = user?.fullName || "Guest";

  return (
    <div className="w-64 min-h-screen bg-gradient-to-b from-[#937dbe] to-slate-300 p-6 text-white shadow-lg">
      <div className="text-2xl font-bold mb-8">Hello, {name}</div>
      <nav className="space-y-4">
        <button
          onClick={() => setActivePage("profile")}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#937dbe] transition-colors w-full text-left"
        >
          <User size={20} />
          <span>Profile</span>
        </button>
        <button
          onClick={() => setActivePage("performance")}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#937dbe] transition-colors w-full text-left"
        >
          <BarChart2 size={20} />
          <span>Performance</span>
        </button>
        <button
          onClick={() => setActivePage("resources")}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#937dbe] transition-colors w-full text-left"
        >
          <BookOpen size={20} />
          <span>Resources</span>
        </button>
        <button
          onClick={() => setActivePage("logout")}
          className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-[#937dbe] transition-colors w-full text-left mt-8"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;

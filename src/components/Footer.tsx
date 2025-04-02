import React from "react";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"; // Lucide icons
import { Link } from "react-router-dom";
import { MainRoutes } from "@/lib/helper";
import Container from "./container";

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  hoverColor: string;
}

const SocialLink: React.FC<SocialLinkProps> = ({ href, icon, hoverColor }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={`hover:${hoverColor}`}>
    {icon}
  </a>
);

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

const FooterLink: React.FC<FooterLinkProps> = ({ to, children }) => (
  <li>
    <Link to={to} className="hover:underline text-gray-300 hover:text-gray-100 text-sm">
      {children}
    </Link>
  </li>
);

export const Footer = () => {
  return (
    <div className="w-full bg-black text-gray-300 py-4 text-sm">
      <Container>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* First Column: Links */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Quick Links</h3>
            <ul className="space-y-1">
              {MainRoutes.map((route) => (
                <FooterLink key={route.href} to={route.href}>
                  {route.label}
                </FooterLink>
              ))}
            </ul>
          </div>

          {/* Second Column: About Us */}
          <div>
            <h3 className="font-semibold mb-2 text-base">About Us</h3>
            <p className="leading-tight">
              AI-powered tools to enhance your interview skills and career growth.
            </p>
          </div>

          {/* Third Column: Services */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Services</h3>
            <ul className="space-y-1">
              <FooterLink to="/services/interview-prep">Interview Prep</FooterLink>
              <FooterLink to="/services/career-coaching">Career Coaching</FooterLink>
              <FooterLink to="/services/resume-building">Resume Building</FooterLink>
            </ul>
          </div>

          {/* Fourth Column: Address and Social Media */}
          <div>
            <h3 className="font-semibold mb-2 text-base">Contact</h3>
            <p className="mb-2 leading-tight">Pict, Pune</p>
            <div className="flex gap-3">
              <SocialLink href="https://facebook.com" icon={<Facebook size={20} />} hoverColor="text-blue-500" />
              <SocialLink href="https://twitter.com" icon={<Twitter size={20} />} hoverColor="text-blue-400" />
              <SocialLink href="https://instagram.com" icon={<Instagram size={20} />} hoverColor="text-pink-500" />
              <SocialLink href="https://linkedin.com" icon={<Linkedin size={20} />} hoverColor="text-blue-700" />
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

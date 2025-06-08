import React from "react";
import { Interview } from "@/types";

interface Resource {
  title: string;
  link: string;
}

interface ResourcesProps {
  interviews: Interview[];
}

const mockResources: Record<string, Resource[]> = {
  "Frontend Developer": [
    { title: "React Official Docs", link: "https://reactjs.org/docs/getting-started.html" },
    { title: "CSS Tricks", link: "https://css-tricks.com/" },
  ],
  "Backend Developer": [
    { title: "Node.js Best Practices", link: "https://github.com/goldbergyoni/nodebestpractices" },
    { title: "Designing RESTful APIs", link: "https://restfulapi.net/" },
  ],
  "Data Scientist": [
    { title: "Intro to ML by Google", link: "https://developers.google.com/machine-learning/crash-course" },
    { title: "Kaggle Courses", link: "https://www.kaggle.com/learn" },
  ],
};

const Resources: React.FC<ResourcesProps> = ({ interviews }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#937dbe] to-slate-200 p-6 sm:p-12">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">Interview Resources</h2>

      <div className="space-y-8 max-w-4xl mx-auto">
        {interviews.map((interview, index) => {
          const resources = mockResources[interview.position] || [];

          return (
            <div
              key={index}
              className="bg-white rounded-3xl shadow-xl p-6 border-l-8 border-[#937dbe]"
            >
              <h3 className="text-2xl font-semibold text-[#937dbe] mb-4">
                {interview.position}
              </h3>
              {resources.length ? (
                <ul className="list-disc pl-6 space-y-2 text-gray-700">
                  {resources.map((resource, idx) => (
                    <li key={idx}>
                      <a
                        href={resource.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#937dbe] hover:underline"
                      >
                        {resource.title}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No resources available yet.</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Resources;

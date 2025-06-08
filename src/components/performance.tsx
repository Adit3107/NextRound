import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Typewriter } from "react-simple-typewriter";
import { Interview, UserAnswer } from "@/types";

interface PerformanceProps {
  interviews: Interview[];
  feedbacks: UserAnswer[];
}

const Performance: React.FC<PerformanceProps> = ({ interviews, feedbacks }) => {
  const chartData = interviews.map((interview) => {
    const relatedFeedback = feedbacks.filter(
      (f) => f.mockIdRef === interview.id
    );
    const avgRating =
      relatedFeedback.reduce((sum, fb) => sum + fb.rating, 0) /
      (relatedFeedback.length || 1);

    return {
      name: interview.position, // Job title
      rating: parseFloat(avgRating.toFixed(1)),
      date: interview.createdAt
  ? new Date(
      typeof interview.createdAt === "object" && "seconds" in interview.createdAt
        ? interview.createdAt.seconds * 1000
        : interview.createdAt
    ).toLocaleDateString()
  : "",
    };
  });

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-r from-[#937dbe] to-slate-200 p-4 sm:p-8">
      <h2 className="pb-8 text-4xl font-medium text-white">
        <Typewriter
          words={["See Your Performance Growth!"]}
          cursor
          cursorStyle="|"
          typeSpeed={100}
          delaySpeed={2000}
        />
      </h2>

      <div className="p-4 sm:p-6 bg-white shadow-2xl rounded-3xl w-full max-w-4xl">
        <h3 className="text-lg sm:text-xl font-bold text-gray-700 mb-4">
          Growth Over Time
        </h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="date" stroke="#6b7280" />
              <YAxis domain={[0, 10]} stroke="#6b7280" />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const { name, rating, date } = payload[0].payload;
                    return (
                      <div className="bg-white p-3 border rounded shadow">
                        <p className="font-semibold text-indigo-600">{name}</p>
                        <p className="text-sm text-gray-700">Rating: {rating}/10</p>
                        <p className="text-xs text-gray-500">{date}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Line
                type="monotone"
                dataKey="rating"
                stroke="#4f46e5"
                strokeWidth={3}
                dot={{ r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Performance;

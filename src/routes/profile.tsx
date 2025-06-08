// Profile.tsx
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/sidebar";
import Performance from "@/components/performance";
// import Resources from "@/components/resources";
import { useAuth } from "@clerk/clerk-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/config/firebase.config";
import { Interview, UserAnswer } from "@/types";
import LoaderPage from "./loader";
import Resources from "@/components/resources";

const Profile = () => {
  const { userId } = useAuth();
  const [activePage, setActivePage] = useState("profile");
  const [interviews, setInterviews] = useState<Interview[]>([]);
  const [feedbacks, setFeedbacks] = useState<UserAnswer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (!userId) return;

        const interviewSnap = await getDocs(
          query(collection(db, "interviews"), where("userId", "==", userId))
        );
        const interviewList = interviewSnap.docs.map((doc) => {
          const data = doc.data();
          return {
            id: doc.id,
            ...data,
            createdAt: data.createdAt,
          };
        }) as Interview[];
        setInterviews(interviewList);

        const feedbackSnap = await getDocs(
          query(collection(db, "userAnswers"), where("userId", "==", userId))
        );
        const feedbackList = feedbackSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as UserAnswer[];
        setFeedbacks(feedbackList);
      } catch (err) {
        console.error("Failed to fetch user data", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  if (isLoading) return <LoaderPage />;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar setActivePage={setActivePage} />

      <div className="flex-1 p-6">
        {activePage === "profile" && (
          <div>
            <h1 className="text-3xl font-bold mb-4 text-[#937dbe]">Welcome</h1>
            <p className="text-lg text-gray-700 mb-6">
              Here's a summary of your interview performance.
            </p>

            {interviews.map((interview) => {
              const relevantFeedback = feedbacks.filter(
                (fb) => fb.mockIdRef === interview.id
              );
              const avgRating = relevantFeedback.length
                ? (
                    relevantFeedback.reduce((acc, f) => acc + f.rating, 0) /
                    relevantFeedback.length
                  ).toFixed(1)
                : "0.0";

              const improvementAreas = Array.from(
                new Set(
                  relevantFeedback.flatMap((fb) => fb.improvementPoints || [])
                )
              );

              return (
                <div
                  key={interview.id}
                  className="mb-6 bg-white p-4 rounded-xl shadow-md"
                >
                  <h2 className="text-xl font-semibold text-[#937dbe] mb-2">
                    {interview.position}
                  </h2>
                  <p className="text-md text-gray-600">
                    Date: {new Date(interview.createdAt.seconds * 1000).toLocaleDateString()}
                  </p>
                  <p className="text-lg font-medium text-purple-700">
                    Average Rating: {avgRating} / 10
                  </p>
                  {improvementAreas.length > 0 && (
                    <div className="mt-2">
                      <p className="font-semibold text-red-500">
                        Areas to Improve:
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-700">
                        {improvementAreas.map((point, index) => (
                          <li key={index}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {activePage === "performance" && (
          <Performance interviews={interviews} feedbacks={feedbacks} />
        )}
        {activePage === "resources" && <Resources interviews={interviews}/>}
        {activePage === "logout" && (
          <div>
            <h1 className="text-2xl font-bold">Logging out...</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

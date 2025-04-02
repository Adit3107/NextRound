import { db } from "@/config/firebase.config";
import LoaderPage from "@/routes/loader";
import { User } from "@/types";
import { useAuth, useUser } from "@clerk/clerk-react";
import { doc, getDoc, serverTimestamp, setDoc, enableNetwork } from "firebase/firestore";
import { useEffect, useState } from "react";

const AuthHandler = () => {
  const { isSignedIn } = useAuth();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const enableFirestoreNetwork = async () => {
      try {
        await enableNetwork(db);
      } catch (error) {
        console.error("Firestore network enable error:", error);
      }
    };

    enableFirestoreNetwork();
  }, []);

  useEffect(() => {
    const storeUserData = async () => {
      if (!isSignedIn || !user) return;  // Ensure user exists

      setLoading(true);
      try {
        const userSnap = await getDoc(doc(db, "users", user.id));

        if (!userSnap.exists()) {
          const userData: User = {
            id: user.id,
            name: user.fullName || user.firstName || "Anonymous",
            email: user.primaryEmailAddress?.emailAddress || "N/A",
            imageUrl: user.imageUrl,
            createdAt: serverTimestamp(),
            updateAt: serverTimestamp(),
          };
          await setDoc(doc(db, "users", user.id), userData);
          console.log("✅ User stored successfully in Firestore");
        }
      } catch (error) {
        console.error("🔥 Firestore Write Error:", error);
      } finally {
        setLoading(false);
      }
    };

    storeUserData();
  }, [isSignedIn, user]);  // Removed pathname & navigate from dependencies

  if (loading) {
    return <LoaderPage />;
  }

  return null;
};

export default AuthHandler;

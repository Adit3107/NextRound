import { getApp, getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDBEKvrlB5eyc-Yu41UIk4tAR6giutg4kc",
  authDomain: "nextround-8f66b.firebaseapp.com",
  projectId: "nextround-8f66b",
  storageBucket: "nextround-8f66b.firebasestorage.app",
  messagingSenderId: "836936789666",
  appId: "1:836936789666:web:4a63ad26578ce2012b31fb"
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);

const db = getFirestore(app);

export {db}
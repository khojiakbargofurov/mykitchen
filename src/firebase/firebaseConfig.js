import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNYoB_k8Es-YZKprgYt2DUo81xrEwV-2k",
  authDomain: "exam-a6eb6.firebaseapp.com",
  projectId: "exam-a6eb6",
  storageBucket: "exam-a6eb6.appspot.com",
  messagingSenderId: "1003340771048",
  appId: "1:1003340771048:web:faab0f3381d9d489e8a35d",
  measurementId: "G-VRK7P8H2C1"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

//db
export const db = getFirestore(app)
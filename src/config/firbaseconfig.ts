// firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBm85fXQ-QUGdtnxC2FIS287GvslbTSB3g",
  authDomain: "hack24-6a641.firebaseapp.com",
  projectId: "hack24-6a641",
  storageBucket: "hack24-6a641.appspot.com",
  messagingSenderId: "636008994473",
  appId: "1:636008994473:web:0b8773c31e55ee1496fbb8",
  measurementId: "G-J231ZX78DF",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();

const signUpWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed up:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing up:", error.message);
    throw error;
  }
};

const signInWithEmailPassword = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log("User signed in:", userCredential.user);
    return userCredential.user;
  } catch (error: any) {
    console.error("Error signing in:", error.message);
    throw error;
  }
};

export {
  auth,
  provider,
  githubProvider,
  signUpWithEmailPassword,
  signInWithEmailPassword,
};

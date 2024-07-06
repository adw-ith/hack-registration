"use client";
import { auth } from "@/config/firbaseconfig";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React from "react";

export default function Logout() {
  const router = useRouter();

  const logout = async () => {
    try {
      await signOut(auth);
      console.log("User signed out");
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <div
      onClick={logout}
      className="text-red-500 border-2  px-2 border-red-500 hover:bg-red-500 hover:text-white"
    >
      Logout
    </div>
  );
}

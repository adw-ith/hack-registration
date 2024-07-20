"use client";
import {
  auth,
  githubProvider,
  provider,
  signInWithEmailPassword,
  signUpWithEmailPassword,
} from "@/config/firbaseconfig";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useRef, useState } from "react";

export default function Signin() {
  const ref = useRef(null);

  const [sl, setSl] = useState<boolean>(false);
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confpassword, setconfPassword] = useState("");

  const handleFormSignup = async (e: any) => {
    e.preventDefault();
    if (password != confpassword) {
      console.log("password mismatch");
      window.alert("password mismatch");

      return;
    }
    try {
      const user = await signUpWithEmailPassword(email, password);
      console.log("Successfully signed up!");
      console.log(user);
      //@ts-ignore
      ref.current.click();
    } catch (error: any) {
      console.error("Error signing up:", error.message);
      window.alert(error.message);
    }
  };

  const handleFormLogin = async (e: any) => {
    e.preventDefault();
    try {
      await signInWithEmailPassword(email, password);
      console.log("Successfully signed in!");
      //@ts-ignore
      ref.current.click();
    } catch (error: any) {
      console.error("Error signing in:", error.message);
      window.alert(error.message);
    }
  };

  const handleSignIn = async () => {
    try {
      const user = await signInWithPopup(auth, provider);
      console.log("User signed in");
      console.log(user);

      //@ts-ignore
      ref.current.click();
    } catch (error: any) {
      console.error("Error signing in: ", error);
      window.alert(error.message);
    }
  };

  const signInWithGithub = async () => {
    try {
      const result = await signInWithPopup(auth, githubProvider);
      console.log("User signed in with GitHub:", result.user);
      //@ts-ignore
      ref.current.click();
    } catch (error: any) {
      console.error("Error signing in with GitHub:", error.message);
      window.alert(error.message);
      throw error;
    }
  };

  return (
    <div className="form p-4 md:px-20 md:pt-8">
      <form
        className="flex border-2 max-w-[600px] mx-auto md:max-w-[400px] border-[#F56E0F] p-8 rounded-lg  flex-col text-base gap-y-4 h-full place-items-center text-white"
        onSubmit={sl ? handleFormSignup : handleFormLogin}
      >
        <div className="text-2xl pb-4">{sl ? "Signup" : "login"}</div>
        {sl && (
          <div className="flex  flex-col  w-full">
            <label htmlFor="name">Name</label>
            <input
              className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        )}
        <div className="flex flex-col  w-full">
          <label htmlFor="email">Email</label>
          <input
            className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
            type="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="flex flex-col  w-full">
          <label htmlFor="password">Password</label>
          <input
            className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {sl && (
          <div className="flex flex-col  w-full">
            <label htmlFor="confirm">Confirm Password</label>
            <input
              className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
              type="text"
              name="confirm"
              value={confpassword}
              onChange={(e) => setconfPassword(e.target.value)}
            />
          </div>
        )}
        <button
          className="w-2/5 bg-lava py-2 my-2 rounded hover:bg-orange-800 duration-300"
          type="submit"
        >
          {sl ? "signup" : "login"}
        </button>
        <p className="text-sm text-left text-slate-400 w-full">
          {sl ? "Already registered ? " : "New registration ? "}
          <span
            className="font-thin hover:text-[#F56E0F]"
            onClick={() => setSl(!sl)}
          >
            {sl ? "login" : "signup"}
          </span>
        </p>
        <div className="flex gap-4 py-4 mt-4">
          <div
            onClick={handleSignIn}
            className="w-12 bg-slate-800 hover:bg-[#F56E0F] duration-300 rounded-full p-2"
          >
            <Image alt="" src="/google-logo.png" width={32} height={32}></Image>
          </div>
          <div
            onClick={signInWithGithub}
            className="w-12 bg-slate-800 hover:bg-[#F56E0F] duration-300 rounded-full p-2"
          >
            <Image alt="" src="/github-logo.png" width={32} height={32}></Image>
          </div>
        </div>
        <a
          ref={ref}
          className=" text-white"
          href="/teamRegistration"
          style={{ display: "none" }}
        ></a>
      </form>
    </div>
  );
}

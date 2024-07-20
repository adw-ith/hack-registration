"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useState } from "react";

export default function TeamReg({
  state,
  onStateChange,
}: {
  state: any;
  onStateChange: (newState: any) => void;
}) {
  const { user, loading } = useAuth();

  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [ieeeId, setIeeeId] = useState("");
  const [tname, setTname] = useState("");

  const [warning, setWarning] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !name ||
      !college ||
      !branch ||
      !year ||
      !gender ||
      !contactNumber ||
      !tname
    ) {
      setWarning("Please fill out all required fields.");
    } else {
      setWarning("");

      try {
        const email = user?.email;
        const response = await axios.post("/api/team", {
          team: tname,
          members: [
            {
              name,
              email,
              college,
              branch,
              year,
              gender,
              contactNumber,
              ieeeId,
            },
          ],
        });

        console.log(response.data);
        onStateChange(true);
      } catch (error: any) {
        console.error("Error creating team:", error);
        window.alert(error.message);

        // Handle error, show error message, etc.
      }
    }
  };

  return (
    <div className="flex flex-col p-8 pt-20">
      <form
        onSubmit={handleSubmit}
        className="flex border-2 border-[#F56E0F] p-8 rounded-lg flex-col text-base gap-y-4 h-full place-items-center text-white"
      >
        <div className="text-2xl pb-4">Enter Your Details</div>
        {warning && <div className="text-red-500 pb-4">{warning}</div>}
        <div className="flex flex-col w-full">
          <label htmlFor="name">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="Email">
            Email <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
            type="text"
            name="Email"
            readOnly
            value={user?.email ?? ""}
            required
          />
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="College">
            College <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
            type="text"
            name="College"
            value={college}
            onChange={(e) => setCollege(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col md:flex-row w-full gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="Branch">
              Branch <span className="text-red-500">*</span>
            </label>
            <input
              className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
              type="text"
              name="Branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="Year">
              Year of Study <span className="text-red-500">*</span>
            </label>
            <input
              className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
              type="text"
              name="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="Gender">
              Gender <span className="text-red-500">*</span>
            </label>
            <select
              className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
              name="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row w-full gap-4">
          <div className="flex flex-col w-full">
            <label htmlFor="ContactNumber">
              Contact Number <span className="text-red-500">*</span>
            </label>
            <input
              className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
              type="text"
              name="ContactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="IeeeId">IEEE ID</label>
            <input
              className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
              type="text"
              name="IeeeId"
              value={ieeeId}
              onChange={(e) => setIeeeId(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col w-full">
          <label htmlFor="teamName">
            Team Name <span className="text-red-500">*</span>
          </label>
          <input
            className="bg-void focus:bg-slate-800 focus-within:bg-slate-800 focus-visible:bg-slate-800 rounded-md h-10 border border-slate-700"
            type="text"
            name="teamName"
            maxLength={32}
            value={tname}
            onChange={(e) => setTname(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="bg-[#F56E0F] hover:bg-[#e95b00] text-white font-bold py-2 mt-8 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

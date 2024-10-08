"use client";

import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { FormEvent, useEffect, useState } from "react";
import Load from "./load";
import IDCard from "./id";
import Link from "next/link";

async function searchTeamByEmail(email: string) {
  try {
    const response = await axios.post("/api/checkreg", { email: email });
    return response.data;
  } catch (error) {
    console.error("Error searching for team by email:", error);
    throw error;
  }
}

const registerTeam = async (teamName: string) => {
  try {
    const response = await axios.put("/api/register", { team: teamName });
    return response.data;
  } catch (error) {
    console.error("Error registering team:", error);
    throw error;
  }
};

async function addMemberToTeam(team: any, member: any) {
  try {
    const response = await axios.put("/api/addteammate", { team, member });
    return response.data;
  } catch (error) {
    console.error("Error adding member to team:", error);
    throw error;
  }
}

async function deleteUserFromTeam(email: any, team: any) {
  try {
    const response = await axios.delete("/api/deleteteammate", {
      data: { email, team },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user from team:", error);
    throw error;
  }
}

export default function Team() {
  const [team, setTeam] = useState();
  const [addMember, setAddMember] = useState(false);
  const [abstract, setAbstract] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [gender, setGender] = useState("");
  const [branch, setBranch] = useState("");
  const [year, setYear] = useState("");
  const [ieeeId, setIeeeId] = useState("");
  const [contact, setContact] = useState("");
  const [projectTitle, setProjectTitle] = useState("");
  const [theme, setTheme] = useState("");
  const [description, setDescription] = useState("");
  const { user, loading } = useAuth();
  const [refresh, setRefresh] = useState(false);
  const [register, setRegister] = useState(false);
  const [load, setLoad] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setAddMember(false);
    const member = {
      name,
      email,
      college,
      gender,
      branch,
      year,
      ieeeId,
      contact,
    };

    try {
      //@ts-ignore
      const tname = team?.team;
      const response = await addMemberToTeam(tname, member);
      console.log(response.message);
      setRefresh((prev) => !prev); // Toggle the refresh state
    } catch (error) {
      console.log("An error occurred while adding the member.");
    }
  };

  const handleDelete = async (email: any) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this teammate?"
    );
    if (!confirmDelete) return;

    try {
      //@ts-ignore
      const teamn = team?.team;
      const response = await deleteUserFromTeam(email, teamn);
      console.log(response.message);
      setRefresh((prev) => !prev); // Toggle the refresh state
    } catch (error) {
      console.log("An error occurred while deleting the member.");
    }
  };

  const handleAbstract = async (e: any) => {
    e.preventDefault();
    //@ts-ignore

    const teamn = team?.team;

    try {
      const response = await axios.put("/api/createabstract", {
        projectTitle,
        theme,
        description,
        team: teamn,
      });

      console.log(response.data.message);
      setRefresh((prev) => !prev);
      // Reset the form or provide feedback to the user
      setAbstract(false);
    } catch (error: any) {
      console.error("Error adding abstract:", error.response?.data?.message);
    }
  };

  const checkAbstractFields = () => {
    //@ts-ignore
    if (!team || !team.abstract) {
      return false;
    }
    //@ts-ignore
    const { projectTitle, theme, description } = team.abstract;
    if (projectTitle === "" || theme === "" || description === "") {
      return false;
    }

    return true;
  };

  // const handleRegisterTeam = async () => {
  //   if (!checkAbstractFields()) {
  //     window.alert("Abstract not filled");
  //     return;
  //   }
  //   const confirmRegister = window.confirm(
  //     "Are you sure you want to Register now ? You cannot make any changes after this."
  //   );
  //   if (!confirmRegister) return;
  //   //@ts-ignore
  //   const teamName = team?.team;
  //   try {
  //     const result = await registerTeam(teamName);
  //     setRefresh((prev) => !prev);
  //     console.log("Team registered successfully:", result);
  //     // Handle success
  //   } catch (error) {
  //     console.error("Error registering team:", error);
  //     // Handle error
  //   }
  // };

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        setLoad(true);
        //@ts-ignore
        const result = await searchTeamByEmail(user?.email);
        console.log(result);
        setTeam(result.team);
        setProjectTitle(result.team.abstract.projectTitle);
        setTheme(result.team.abstract.theme);
        setDescription(result.team.abstract.description);
        setRegister(result.team.registered);
        setLoad(false);
      } catch (error) {
        console.log(error);
      }
    };

    if (user?.email) {
      fetchTeam();
    }
  }, [user?.email, refresh]);

  return (
    <div className="flex flex-col min-h-dvh  relative   place-items-center">
      {load && <Load></Load>}
      <div className="relative flex w-full border-b-2 border-slate-200">
        <div className="text-4xl text-slate-100 p-4 pt-20 pb-16 md:pt-32 md:p-16">
          Welcome{" "}
          <span className="text-lava font-bold">
            {
              //@ts-ignore
              team?.team
            }
          </span>
          {!register && (
            <div>
              <div className="text-red-400 text-lg">Registration Closed!!!</div>
              <div className="text-xl text-red-300">
                You did not complete the Registration in Time
              </div>
            </div>
          )}
        </div>

        <div className="absolute flex gap-x-2 bottom-0 w-full">
          <div className="flex  gap-x-2 text-white ml-1 mb-1  md:ml-[4rem] ">
            {/* {!register && (
              <button
                onClick={handleRegisterTeam}
                className=" p-1 px-4 max-h-[40px] min-w-[100px] rounded-sm  bg-blue-600  border-2 border-blue-600 hover:bg-transparent "
              >
                Register
              </button>
            )} */}
            {register && (
              <div className="text-xl text-green-400"> Registered !!! </div>
            )}
          </div>
          {/* {!register && (
            <div className="flex gap-x-2 text-white ml-auto mb-1 mr-1   md:mr-[2rem] ">
              <button
                onClick={() => setAbstract(true)}
                className=" p-1 sm:px-4 min-w-[100px] max-h-[40px] rounded-sm  bg-[#3d3a3a]  border-2 border-[#3d3a3a] hover:bg-transparent "
              >
                {" "}
                Add/Edit Abstract
              </button>
              <button
                onClick={() => setAddMember(true)}
                className=" p-1 sm:px-4 min-w-[100px] max-h-[40px] rounded-sm  bg-[#F56E0F]  border-2 border-[#F56E0F] hover:bg-transparent hover:text-[#F56E0F]"
              >
                {" "}
                <span className="text-lg font-bold"> + </span> add member
              </button>
            </div>
          )} */}
        </div>
      </div>
      <div className="text-white flex flex-col-reverse w-full md:grid md:grid-cols-3 p-4">
        <div className="col-span-2 mt-8 md:mt-0">
          <div className="px-4 flex flex-col md:grid md:grid-cols-2 md:gap-x-4 gap-y-4">
            <div className="cols-span-1 p-8 min-w-50 rounded-sm bg-slate-800">
              <div className="flex justify-between">
                <h3 className="text-2xl pb-4">Team Leader</h3>
              </div>
              <ul className="px-6">
                <li>
                  <span className="text-slate-400">Name: </span>

                  {
                    //@ts-ignore
                    team?.members[0].name
                  }
                </li>
                <li>
                  <span className="text-slate-400">Email: </span>

                  {
                    //@ts-ignore
                    team?.members[0].email
                  }
                </li>
                <li>
                  <span className="text-slate-400">College: </span>
                  {
                    //@ts-ignore
                    team?.members[0].college
                  }
                </li>
                <li>
                  <span className="text-slate-400">Contact: </span>
                  {
                    //@ts-ignore
                    team?.members[0].contactNumber
                  }
                </li>
                {register && (
                  <Link
                    target="_blank"
                    href={`/id?name=${encodeURIComponent(
                      //@ts-ignore
                      team?.members[0]?.name || ""
                    )}`}
                  >
                    <button className="flex mt-4 items-center text-xs md:text-base gap-x-1 md:gap-x-2 rounded-sm p-1 px-2 md:px-4 border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-[#20262E] bg-transparent">
                      <span>Download</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-4 h-4 md:w-6 md:h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                    </button>
                  </Link>
                )}
              </ul>
            </div>
            {
              //@ts-ignore
              team?.members != null &&
                //@ts-ignore
                team?.members.map(
                  (member: any, index: any) =>
                    index != 0 && (
                      <div
                        key={index}
                        className="cols-span-1 p-8 min-w-50 rounded-sm bg-slate-800"
                      >
                        <div className="flex justify-between">
                          <h3 className="text-2xl pb-4">
                            Team member {index + 1}
                          </h3>
                          <div>
                            {/* {!register && (
                              <svg
                                className="h-6 w-6 text-red-500"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                strokeWidth="2"
                                stroke="currentColor"
                                fill="none"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                onClick={() => handleDelete(member.email)}
                              >
                                <path stroke="none" d="M0 0h24v24H0z" />
                                <circle cx="12" cy="12" r="9" />
                                <path d="M10 10l4 4m0 -4l-4 4" />
                              </svg>
                            )} */}
                          </div>
                        </div>
                        <ul className="px-6">
                          <li>
                            <span className="text-slate-400">Name: </span>

                            {
                              //@ts-ignore
                              member.name
                            }
                          </li>
                          <li>
                            <span className="text-slate-400">Email: </span>

                            {
                              //@ts-ignore
                              member.email
                            }
                          </li>
                          <li>
                            <span className="text-slate-400">College: </span>
                            {
                              //@ts-ignore
                              member.college
                            }
                          </li>
                          <li>
                            <span className="text-slate-400">Contact: </span>
                            {
                              //@ts-ignore
                              member.contact
                            }
                          </li>
                          {register && (
                            <Link
                              target="_blank"
                              href={`/id?name=${encodeURIComponent(
                                //@ts-ignore
                                member.name || ""
                              )}`}
                            >
                              <button className="flex mt-4 items-center text-xs md:text-base gap-x-1 md:gap-x-2 rounded-sm p-1 px-2 md:px-4 border-blue-500 border-2 text-blue-500 hover:bg-blue-500 hover:text-[#20262E] bg-transparent">
                                <span>Download</span>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  strokeWidth={2}
                                  stroke="currentColor"
                                  className="w-4 h-4 md:w-6 md:h-6"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 4v16m8-8H4"
                                  />
                                </svg>
                              </button>
                            </Link>
                          )}
                        </ul>
                      </div>
                    )
                )
            }
          </div>
        </div>
        <div className="col-span-1">
          <div className="max-h-[60vh] overflow-y-scroll  p-4 md:p-8 bg-slate-800 ">
            <div className="text-xl py-2 pt-4">Project Title</div>
            <div className="text-lg text-slate-300">
              {
                //@ts-ignore
                team?.abstract?.projectTitle === ""
                  ? "N/A"
                  : //@ts-ignore
                    team?.abstract?.projectTitle ?? ""
              }
            </div>
            <div className="text-xl py-2 pt-4">Project Theme</div>
            <div className="text-lg text-slate-300">
              {
                //@ts-ignore
                team?.abstract?.theme === ""
                  ? "N/A"
                  : //@ts-ignore
                    team?.abstract?.theme ?? ""
              }
            </div>
            <div className="text-xl py-2 pt-4">Project Description</div>
            <div className="text-sm text-slate-300">
              {
                //@ts-ignore
                team?.abstract?.description === ""
                  ? "N/A"
                  : //@ts-ignore
                    team?.abstract?.description ?? ""
              }
            </div>
          </div>
        </div>
      </div>
      {addMember && (
        <div className="form mt-20 absolute min-w-80 md:min-w-1/2 md:w-1/2 bg-[#262626] px-16 py-8 shadow-gray-800 shadow-lg rounded">
          <div className="flex justify-between">
            <div className="text-xl pb-8 text-white">
              Enter Team member detail
            </div>
            <div className="p-1">
              <svg
                className="h-6 w-6 text-gray-300 hover:text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => setAddMember(false)}
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="name"
                required
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-transparent text-white border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-transparent text-white border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="college"
                required
                placeholder="College"
                value={college}
                onChange={(e) => setCollege(e.target.value)}
                className="bg-transparent text-white border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col md:grid md:grid-cols-3 pb-8 gap-x-2">
              <select
                className="text-gray-400 bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200 col-span-1"
                required
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <input
                type="text"
                name="branch"
                required
                placeholder="Branch"
                value={branch}
                onChange={(e) => setBranch(e.target.value)}
                className="bg-transparent border-b-2 border-slate-400 text-white focus:border-y-2 focus:border-blue-400 duration-200 col-span-1"
              />
              <input
                type="text"
                name="year"
                placeholder="Year of study"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="bg-transparent border-b-2 border-slate-400 text-white focus:border-y-2 focus:border-blue-400 duration-200 col-span-1"
              />
            </div>
            <div className="flex flex-col pb-8">
              <input
                type="text"
                name="ieeeId"
                placeholder="IEEE ID"
                value={ieeeId}
                onChange={(e) => setIeeeId(e.target.value)}
                className="bg-transparent border-b-2 border-slate-400 text-white focus:border-y-2 focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col pb-8 gap-x-4">
              <input
                type="tel"
                required
                name="contact"
                placeholder="Contact No."
                value={contact}
                onChange={(e) => setContact(e.target.value)}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 text-white focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col place-items-center">
              <button
                type="submit"
                className="w-1/4 min-w-24 bg-lava text-white py-2 rounded-sm"
              >
                Add member
              </button>
            </div>
          </form>
        </div>
      )}
      {abstract && (
        <div className="mt-20 bg-[#262626] absolute min-w-80 md:w-1/2 flex flex-col p-4 md:p-8">
          <div className="flex justify-between ">
            <div className="text-xl pb-8 text-white">Enter Project detail</div>
            <div className="p-1">
              <svg
                className="h-6 w-6 text-gray-300 hover:text-red-500"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                onClick={() => setAbstract(false)}
              >
                <path stroke="none" d="M0 0h24v24H0z" />
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
          </div>
          <form
            className="w-full  place-items-center"
            onSubmit={handleAbstract}
          >
            <div className="flex flex-col pb-8 gap-x-4">
              <input
                type="text"
                required
                name="projectTitle"
                placeholder="Project Title"
                value={projectTitle}
                onChange={(e) => setProjectTitle(e.target.value)}
                className="bg-transparent border-b-2 border-slate-400 focus:border-y-2 text-white focus:border-blue-400 duration-200"
              />
            </div>
            <div className="flex flex-col pb-8 gap-x-4">
              <select
                className={
                  "bg-transparent border-b-2 border-slate-400 focus:border-y-2 focus:border-blue-400 duration-200 col-span-1 " +
                  (theme == "" ? "text-gray-400" : "text-white")
                }
                required
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option className="bg-slate-700" value="">
                  Select Theme
                </option>
                <option
                  className="bg-slate-700"
                  value="Good health and well-being"
                >
                  Good health and well-being
                </option>
                <option className="bg-slate-700" value="Quality Education">
                  Quality Education
                </option>
                <option
                  className="bg-slate-700"
                  value="Affordable and clean energy"
                >
                  Affordable and clean energy
                </option>
                <option
                  className="bg-slate-700"
                  value="Industry, innovation, and infrastructure"
                >
                  Industry, innovation, and infrastructure
                </option>
                <option
                  className="bg-slate-700"
                  value="Sustainable cities and communities"
                >
                  Sustainable cities and communities
                </option>
                <option className="bg-slate-700" value="Life on land">
                  Life on land
                </option>
              </select>
            </div>
            <div className="flex flex-col pb-8 gap-x-4">
              <textarea
                name="description"
                rows={10}
                required
                maxLength={2000}
                placeholder="Project Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="bg-transparent border-y-2 border-slate-400 focus:border-y-2 text-white focus:border-blue-400 duration-200"
              />
            </div>
            <button
              type="submit"
              className="bg-lava text-white p-2 rounded-md hover:bg-orange-600"
            >
              Submit
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

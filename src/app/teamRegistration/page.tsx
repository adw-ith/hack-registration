"use client";

import Footer from "@/components/footer";
import Load from "@/components/load";
import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Team from "@/components/team";
import TeamReg from "@/components/teamReg";
import { useAuth } from "@/context/AuthContext";
import axios from "axios";
import { useEffect, useState } from "react";

async function searchTeamByEmail(email: string) {
  try {
    const response = await axios.post("/api/checkreg", { email: email });
    return response.data;
  } catch (error) {
    console.error("Error searching for team by email:", error);
    throw error;
  }
}

export default function TeamRegisteration() {
  const { user, loading } = useAuth();

  const [load, setLoad] = useState(true);

  const [teamExist, setTeamExist] = useState();

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        //@ts-ignore
        const result = await searchTeamByEmail(user?.email);
        console.log(result);
        setTeamExist(result.team);
        setLoad(false);
      } catch (error) {}
    };

    if (user?.email) {
      fetchTeam();
    }
  }, [user?.email]);

  return (
    <ProtectedRoute>
      {load && <Load></Load>}
      <div>
        <Navbar></Navbar>
        {!teamExist ? (
          <TeamReg state={teamExist} onStateChange={setTeamExist}></TeamReg>
        ) : (
          <Team></Team>
        )}
        <Footer></Footer>
      </div>
    </ProtectedRoute>
  );
}

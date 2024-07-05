"use client";

import Navbar from "@/components/navbar";
import ProtectedRoute from "@/components/ProtectedRoute";
import Team from "@/components/team";
import TeamReg from "@/components/teamReg";

export default function TeamRegisteration() {
  return (
    <ProtectedRoute>
      <div>
        <Navbar></Navbar>
        <div className="pt-20">
          <TeamReg></TeamReg>
        </div>
        <Team></Team>
      </div>
    </ProtectedRoute>
  );
}

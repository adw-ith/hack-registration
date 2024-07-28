import React from "react";

export default function Footer() {
  return (
    <div className="flex flex-col">
      <div className="flex w-full bg-[rgb(135,135,135)]  p-4 sm:px-16 md:px-24 sm:p-8 py-12 justify-between">
        <div className="text-slate-800 text-2xl">.hack();24</div>
        <button className="border-2 border-slate-800 text-slate-800 px-2 hover:text-[#878787] hover:bg-slate-800">
          <a
            target="_blank"
            href="https://chat.whatsapp.com/EqiC2Djnagi6lsJKjPC8L6"
          >
            Join Community
          </a>
        </button>
      </div>
      <div className="bg-[#8c8c8c] p-1 text-center text-sm text-slate-600">
        Developed by .hack24 web team.{" "}
        <span className="text-slate-800 hover:text-slate-600">
          <a target="_blank" href="https://ieeemace.org/">
            ©IEEE MACE.
          </a>
        </span>{" "}
        All rights reserved.
      </div>
    </div>
  );
}

"use client";
export default function Team() {
  return (
    <div className="flex flex-col  ">
      <div className="relative flex w-full border-b-2 border-slate-200">
        <div className="text-4xl text-slate-100 p-4 pt-20 pb-16 md:pt-32 md:p-16">
          Welcome{" "}
        </div>
        <div className="absolute flex gap-x-2 text-white bottom-0 ml-auto mb-1 mr-1 right-0  md:mr-[2rem] ">
          <button className=" p-1 px-4 min-w-[100px] rounded-sm  bg-[#3d3a3a]  border-2 border-[#3d3a3a] hover:bg-transparent ">
            {" "}
            Add/Edit Abstract
          </button>
          <button className=" p-1 px-4 min-w-[100px] rounded-sm  bg-[#F56E0F]  border-2 border-[#F56E0F] hover:bg-transparent hover:text-[#F56E0F]">
            {" "}
            <span className="text-lg font-bold"> + </span> add member
          </button>
        </div>
      </div>
      <div className="flex flex-col-reverse md:grid md:grid-cols-3 md:p-16 p-4">
        <div className="col-span-2">hello</div>
        <div className="col-span-1">loki</div>
      </div>
    </div>
  );
}

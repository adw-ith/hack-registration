import Navbar from "@/components/navbar";
import Signin from "@/components/signin";

const Instructions = ["", "", "", "", "", "", "", "", "", "", ""];

export default function Home() {
  return (
    <main className="w-dvw bg-void text-slate-300 overflow-scroll overflow-x-hidden">
      <Navbar></Navbar>
      <div className="w-full flex flex-col-reverse md:grid md:grid-cols-2 p-4 md:p-12 lg:p-16">
        <div className="col-span-1 p-8">
          <div className="p-6 bg-slate-900 rounded-md">
            <div className="text-2xl">Instructions</div>
            <div className="p-4">
              {Instructions.map((ins, index) => (
                <p key={index} className="text-base">
                  {index + 1}. Lorem ipsum dolor, sit amet consectetur
                  adipisicing elit. Rerum, expedita!
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="col-span-1 mt-20 md:mt-0 h-full flex flex-col place-content-center ">
          <div className="form">
            <Signin></Signin>
          </div>
        </div>
      </div>
    </main>
  );
}

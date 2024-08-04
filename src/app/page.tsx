import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import Signin from "@/components/signin";

const Instructions = [
  "Only the team leader should register for the hackathon on behalf of the team.ring registration, the team leader must add all team members. There is no need for separate registrations for other team members.",
  "IEEE membership is not required to participate in the hackathon.If you are an IEEE member, please provide your IEEE member number during registration.",
  "Choose a theme from the provided options. Upload an abstract that corresponds to the selected theme. This abstract should outline your project idea, approach and impact.",
  "Each team should consist of 1 to 4 members. Ensure all team members are added during the registration process.",
  "Shortlisted teams will receive problem statements based on their selected theme for the offline hackathon.",
  "Use of ChatGPT or any other form of plagiarism is strictly prohibited and will lead to immediate disqualification.",
  "Make sure to review all registration details before submitting the form.",
  "The abstract should be no longer than 2000 characters",
  "There is no registration fee",
  "If you have any questions or encounter issues during registration, please contact: email: hack.macesb@gmail.com",
];

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
                  {index + 1}. {ins}
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
      <Footer></Footer>
    </main>
  );
}

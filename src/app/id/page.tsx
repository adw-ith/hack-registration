"use client";
import { useSearchParams } from "next/navigation";
import IDCard from "@/components/id";

export default function IDCardPage() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  console.log(name);

  return (
    <div className="flex justify-center items-center overflow-scroll min-h-screen">
      <IDCard name={name || ""} />
    </div>
  );
}

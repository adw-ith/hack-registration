// src/components/idCardPageContent.tsx

"use client";
import { useSearchParams } from "next/navigation";
import IDCard from "@/components/id";

export default function IDCardPageContent() {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  return (
    <div className="flex justify-center items-center overflow-scroll min-h-screen">
      <IDCard name={name || ""} />
    </div>
  );
}

// src/app/id/page.tsx
"use client";
import IDCardPageContent from "@/components/idCardPageContent";
import { Suspense } from "react";

export default function IDCardPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <IDCardPageContent />
    </Suspense>
  );
}

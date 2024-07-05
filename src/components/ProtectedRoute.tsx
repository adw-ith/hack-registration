"use client";
import { useRouter } from "next/navigation";
// components/ProtectedRoute.tsx
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import Load from "./load";

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Load />;
  }

  if (!user) {
    return null;
  }

  return <>{children}</>;
};

export default ProtectedRoute;

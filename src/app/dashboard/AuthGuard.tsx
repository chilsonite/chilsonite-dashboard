// New file: Client-side auth guard for dashboard routes
"use client";
import { useGetCurrentUser } from "../../schemas/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const { data: userRes, status, isLoading } = useGetCurrentUser();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (status !== "success" || userRes.status !== 200) {
    window.location.href = "/login";
    return null;
  }
  return <>{children}</>;
}

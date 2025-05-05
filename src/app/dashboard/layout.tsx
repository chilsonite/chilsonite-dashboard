import { cookie, redirect } from "@lazarv/react-server";

import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import { getCurrentUser } from "../../schemas/auth";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookies = cookie();
  const cookieHeader = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  try {
    await getCurrentUser({
      headers: { Cookie: cookieHeader },
    });
  } catch {
    redirect("/login");
  }

  return (
    <div className="w-full min-h-screen flex flex-col dark:bg-zinc-900 dark:text-gray-400">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4">{children}</main>
      </div>
    </div>
  );
}

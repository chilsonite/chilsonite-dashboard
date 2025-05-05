// New file: Dashboard page (React Server Component) with data prefetch
import { cookie } from "@lazarv/react-server";
import { redirect } from "@lazarv/react-server";

import Card from "../../components/Card";
import PageLayout from "../../components/PageLayout";
import UserDetail from "../../features/user/ui/UserDetail";
import { getCurrentUser } from "../../schemas/auth";

export default async function DashboardPage() {
  // クライアントからの Cookie を取得
  const cookies = cookie();
  const cookieHeader = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  const { data: user, status } = await getCurrentUser({
    headers: { Cookie: cookieHeader },
  });
  if (status !== 200) {
    redirect("/login");
    return;
  }

  return (
    <PageLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UserDetail user={user} />
        <Card title="Recent Activity" subtitle="Your latest actions">
          <div className="space-y-4">
            <p className="text-gray-600 dark:text-gray-300">
              Recent activity will appear here.
            </p>
          </div>
        </Card>
      </div>
    </PageLayout>
  );
}

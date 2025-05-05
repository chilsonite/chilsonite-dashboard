import { cookie } from "@lazarv/react-server";
import { redirect } from "@lazarv/react-server";

import { getCurrentUser } from "../schemas/auth";
import HeaderClient from "./HeaderClient";

export default async function Header() {
  // サーバコンポーネントでユーザーデータを取得
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

  return <HeaderClient initialData={user} />;
}

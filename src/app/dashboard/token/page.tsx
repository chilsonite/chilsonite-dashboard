import { cookie, redirect } from "@lazarv/react-server";

import { listTokens } from "../../../schemas/auth";
import PageClient from "./pageClient";

export default async function TokenPage() {
  const cookies = cookie();
  const cookieHeader = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");
  const { data: tokens, status } = await listTokens({
    headers: { Cookie: cookieHeader },
  });
  if (status === 401) redirect("/login");
  if (status !== 200) throw new Error("トークン一覧取得に失敗しました");
  return <PageClient initialData={tokens} />;
}

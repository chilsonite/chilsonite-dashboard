import "../global.css";

import { dehydrate } from "@tanstack/react-query";

import { getCookieHeader } from "../lib/cookies";
import { getGetCurrentUserQueryOptions } from "../schemas/auth";
import { getQueryClient } from "./get-query-client";
import Providers from "./providers";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // クエリクライアント作成とサーバでのデータプレフェッチ
  const cookieHeader = getCookieHeader();
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    getGetCurrentUserQueryOptions({
      request: {
        headers: { Cookie: cookieHeader },
      },
    })
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en" className="h-screen">
      <head />
      <body className="dark:bg-zinc-900 dark:text-gray-400">
        <Providers dehydratedState={dehydratedState}>{children}</Providers>
      </body>
    </html>
  );
}

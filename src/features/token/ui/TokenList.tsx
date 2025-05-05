"use client";
import toast from "react-hot-toast";

import type { TokenResponse } from "../../../schemas";
import { useListTokens } from "../../../schemas/auth";

interface Props {
  initialData: TokenResponse[];
}

export default function TokenList({ initialData }: Props) {
  const { data: tokens } = useListTokens({
    query: {
      initialData: { status: 200, data: initialData, headers: new Headers() },
      staleTime: 60_000,
    },
  });

  if (tokens.status !== 200) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error: {tokens.status}</p>
      </div>
    );
  }

  if (tokens.data.length === 0) {
    return (
      <p className="text-gray-600 dark:text-gray-400">No tokens issued yet.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="space-y-3">
        {tokens.data.map((t) => (
          <li
            key={t.token}
            className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 flex justify-between items-start hover:shadow-sm transition-shadow"
          >
            <div>
              <p className="font-mono text-sm bg-gray-100 dark:bg-gray-900 px-2 py-1 rounded mb-2 overflow-x-auto whitespace-nowrap max-w-[200px] sm:max-w-[300px] md:max-w-full">
                {t.token}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Expires at: {new Date(t.expires_at * 1000).toLocaleString()}
              </p>
            </div>
            <button
              onClick={() => {
                navigator.clipboard
                  .writeText(t.token)
                  .then(() => toast.success("コピーしました"))
                  .catch(() => toast.error("コピーに失敗しました"));
              }}
              className="ml-2 p-3  bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              Copy
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

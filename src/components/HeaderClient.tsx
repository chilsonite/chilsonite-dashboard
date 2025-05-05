"use client";
import type { CurrentUserResponse } from "../schemas";
import { useGetCurrentUser } from "../schemas/auth";

export default function HeaderClient({
  initialData,
}: {
  initialData: CurrentUserResponse;
}) {
  const { data: user, status } = useGetCurrentUser({
    query: {
      initialData: {
        status: 200,
        data: initialData,
        headers: new Headers(),
      },
      staleTime: 60_000,
    },
  });

  if (status !== "success" || user.status !== 200) {
    return (
      <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-2 shadow">
        <h1 className="text-2xl font-bold">chilsonite</h1>
        <div className="flex items-center space-x-4">
          <span className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
            ⭐ 0P
          </span>
          <div className="flex items-center space-x-2">
            <img
              src={`https://ui-avatars.com/api/?name=Guest`}
              alt="avatar"
              className="w-8 h-8 rounded-full"
            />
            <span className="font-medium">Guest</span>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-2 shadow">
      <h1 className="text-2xl font-bold">chilsonite</h1>
      <div className="flex items-center space-x-4">
        <span className="flex items-center bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
          ⭐ {user.data.points}P
        </span>
        <div className="flex items-center space-x-2">
          <img
            src={`https://ui-avatars.com/api/?name=${user.data.username}`}
            alt="avatar"
            className="w-8 h-8 rounded-full"
          />
          <span className="font-medium">{user.data.username}</span>
        </div>
      </div>
    </header>
  );
}

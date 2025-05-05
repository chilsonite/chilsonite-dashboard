import Card from "../../../components/Card";

export default function UserDetail({
  user,
}: {
  user: { username: string; points: number; role: string };
}) {
  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-semibold text-gray-900 dark:text-white">
          {user.username}
        </h1>
        <span
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            user.role === "admin"
              ? "bg-red-200 text-red-800"
              : "bg-blue-200 text-blue-800"
          } dark:bg-opacity-20`}
        >
          {user.role}
        </span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            Points
          </h2>
          <p className="mt-1 text-xl font-bold text-gray-800 dark:text-gray-100">
            {user.points}
          </p>
        </div>
        <div>
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
            User ID
          </h2>
          <p className="mt-1 text-xl text-gray-800 dark:text-gray-100">
            {user.username}
          </p>
        </div>
      </div>
    </Card>
  );
}

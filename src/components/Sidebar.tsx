import { Link } from "@lazarv/react-server/navigation";

export default function Sidebar() {
  return (
    <nav className="hidden md:flex bg-gray-50 dark:bg-gray-900 p-4 space-y-4 flex-col">
      <Link
        to="/dashboard"
        className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        User Details
      </Link>
      <Link
        to="/dashboard/agents"
        className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        Agent List
      </Link>
      <Link
        to="/dashboard/token"
        className="block px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-800"
      >
        Token Generation
      </Link>
    </nav>
  );
}

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center px-4 py-16 gap-8 min-h-[60vh]">
      <h1 className="text-4xl font-bold text-center">Chilsonite DashBoard</h1>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href="/login"
          className="w-full sm:w-auto bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 text-center"
        >
          Login
        </a>
        <a
          href="/register"
          className="w-full sm:w-auto bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 text-center"
        >
          Register
        </a>
      </div>
    </div>
  );
}

import Card from "../../components/Card";
import LoginForm from "../../features/login/ui/LoginForm";

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-8 bg-gray-50 dark:bg-gray-900">
      <Card className="w-full max-w-md">
        <div className="flex flex-col gap-6">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Login
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
              Sign in to your account
            </p>
          </div>
          <LoginForm />
        </div>
      </Card>
    </div>
  );
}

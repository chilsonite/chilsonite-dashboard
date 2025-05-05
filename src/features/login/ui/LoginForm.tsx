"use client";
import toast from "react-hot-toast";

import { useClient } from "@lazarv/react-server/client";
import { Link } from "@lazarv/react-server/navigation";
import { useForm } from "@tanstack/react-form";
import * as v from "valibot";

import { useLogin } from "../../../schemas/auth";

// Valibot schema for login using v.pipe and updated methods
const loginSchema = v.object({
  username: v.string(), // Keep basic type validation
  password: v.string(), // Keep basic type validation
});

// type LoginValues = { username: string; password: string };

export default function LoginForm() {
  const { navigate } = useClient();
  const { mutateAsync, status } = useLogin();
  const isLoading = status === "pending";
  const form = useForm({
    defaultValues: { username: "", password: "" },
    validators: { onSubmit: loginSchema },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ data: value });
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (e: any) {
        toast.error(e.message);
        return { form: e.message };
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="flex flex-col gap-2"
    >
      {/* username */}
      <form.Field name="username">
        {(field) => (
          <>
            <input
              id={field.name}
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Username"
              className="border p-2 rounded"
            />
            {field.state.meta.errors?.[0] && (
              <p className="text-red-500">
                {field.state.meta.errors[0].message}
              </p>
            )}
          </>
        )}
      </form.Field>

      {/* password */}
      <form.Field name="password">
        {(field) => (
          <>
            <input
              id={field.name}
              type="password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder="Password"
              className="border p-2 rounded"
            />
            {field.state.meta.errors?.[0] && (
              <p className="text-red-500">
                {field.state.meta.errors[0].message}
              </p>
            )}
          </>
        )}
      </form.Field>

      {/* root‑level error & submit button */}
      <form.Subscribe selector={(s) => [s.errorMap.onSubmit, s.canSubmit]}>
        {([submitError, canSubmit]) => (
          <>
            {submitError && (
              <p className="text-red-500">{String(submitError)}</p>
            )}
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Logging in..." : "Login"}
            </button>
          </>
        )}
      </form.Subscribe>
      <div className="mt-2 text-sm">
        <Link to="/register" className="text-blue-500 underline">
          Go to Registration
        </Link>
      </div>
    </form>
  );
}

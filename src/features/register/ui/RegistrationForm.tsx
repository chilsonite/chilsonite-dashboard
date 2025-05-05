// New file: Client component for user registration form
"use client";
import toast from "react-hot-toast";

import { useClient } from "@lazarv/react-server/client";
import { Link } from "@lazarv/react-server/navigation";
import { useForm } from "@tanstack/react-form";
import * as v from "valibot";

import { useRegister } from "../../../schemas/auth";

// Valibot schema for registration using v.pipe and updated methods
const registrationSchema = v.object({
  username: v.pipe(
    v.string(),
    v.minLength(3, "Username must be at least 3 characters long")
  ),
  password: v.pipe(
    v.string(),
    v.minLength(8, "Password must be at least 8 characters long"),
    v.regex(/[A-Za-z]/, "Please include at least one letter"),
    v.regex(/\d/, "Please include at least one number")
  ),
});

export default function RegistrationForm() {
  const { navigate } = useClient();
  const { mutateAsync, status } = useRegister();
  const isLoading = status === "pending";
  const form = useForm({
    defaultValues: { username: "", password: "" },
    validators: { onSubmit: registrationSchema },
    onSubmit: async ({ value }) => {
      try {
        await mutateAsync({ data: value });
        toast.success("Registration successful");
        navigate("/login");
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
              <p className="text-red-500">
                {(() => {
                  if (typeof submitError === "object" && submitError !== null) {
                    // Check if it's the Valibot error structure Record<string, StandardSchemaV1Issue[]>
                    // Get the first field name that has errors
                    const firstErrorKey = Object.keys(submitError)[0];
                    if (firstErrorKey) {
                      const issues = submitError[firstErrorKey];
                      // Check if it's an array of issues and has at least one issue
                      if (Array.isArray(issues) && issues.length > 0) {
                        const firstIssue = issues[0];
                        // Display the message of the first issue
                        if (
                          firstIssue &&
                          typeof firstIssue.message === "string"
                        ) {
                          return firstIssue.message;
                        }
                      }
                    }
                    // Fallback for unexpected object structure or if message extraction fails
                    return "Please check your input.";
                  } else if (submitError === true) {
                    // Handle the 'true' case - often indicates a generic failure
                    return "Registration failed.";
                  }
                  // Fallback for any other unexpected type (though the provided type covers object and true)
                  return String(submitError);
                })()}
              </p>
            )}
            <button
              type="submit"
              disabled={!canSubmit || isLoading}
              className="bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </>
        )}
      </form.Subscribe>
      <div className="mt-2 text-sm">
        <Link to="/login" className="text-blue-500 underline">
          Go to Login
        </Link>
      </div>
    </form>
  );
}

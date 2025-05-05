"use client";
import toast from "react-hot-toast";

import Button from "../../../components/Button";
import { useTokenGeneration } from "../hooks/useTokenGeneration";

export default function TokenGenerator({
  onGenerate,
}: {
  onGenerate?: () => void;
}) {
  const { tokenInfo, error, isPending, handleGenerate } =
    useTokenGeneration(onGenerate);

  return (
    <div className="flex flex-col gap-4">
      <Button
        onClick={handleGenerate}
        className={`${isPending ? "opacity-70 cursor-not-allowed" : ""}`}
      >
        {isPending ? "Generating..." : "Generate New Token"}
      </Button>

      {error && (
        <div className="p-3 bg-red-100 text-red-800 rounded-md dark:bg-red-900 dark:bg-opacity-30 dark:text-red-300">
          {error}
        </div>
      )}

      {tokenInfo && (
        <div className="mt-2 p-4 border border-green-200 rounded-lg bg-green-50 dark:bg-green-900 dark:bg-opacity-20 dark:border-green-800">
          <div className="space-y-2">
            <h3 className="font-medium text-gray-700 dark:text-gray-300">
              New Token Generated
            </h3>
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                Token:
              </p>
              <div className="flex items-center">
                <code className="font-mono text-sm bg-white dark:bg-gray-800 p-2 rounded flex-grow overflow-x-auto">
                  {tokenInfo.token}
                </code>
                <button
                  onClick={() => {
                    navigator.clipboard
                      .writeText(tokenInfo.token)
                      .then(() => toast.success("Copied"))
                      .catch(() => toast.error("Failed to copy"));
                  }}
                  className="ml-2 p-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
                  aria-label="Copy token"
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Expires at:{" "}
              {new Date(tokenInfo.expires_at * 1000).toLocaleString()}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

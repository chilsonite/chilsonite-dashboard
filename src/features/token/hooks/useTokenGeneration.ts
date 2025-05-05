import { useState } from "react";
import toast from "react-hot-toast";

import { useQueryClient } from "@tanstack/react-query";

import { getListTokensQueryKey, useGenerateToken } from "../../../schemas/auth";

interface TokenInfo {
  token: string;
  expires_at: number;
}

export function useTokenGeneration(onGenerate?: () => void) {
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [error, setError] = useState<string | null>(null);

  const queryClient = useQueryClient();
  const { mutateAsync, isPending } = useGenerateToken(
    {
      request: { credentials: "include" },
      mutation: {
        onSuccess: (res) => {
          if (res.status !== 201) {
            toast.error("Failed to generate token");
            throw new Error("Failed to generate token");
          }
          // 発行成功
          toast.success("Token generated successfully");
          setTokenInfo(res.data);
          // Orval が生成したクエリキーで invalidate
          queryClient.invalidateQueries({
            queryKey: getListTokensQueryKey(),
          });
          onGenerate?.();
        },
        onError: (err) => {
          const msg = err.error || "Failed to generate token";
          toast.error(msg);
          setError(msg);
        },
      },
    },
    queryClient
  );

  const handleGenerate = () => {
    setError(null);
    mutateAsync();
  };

  return {
    tokenInfo,
    error,
    isPending,
    handleGenerate,
  };
}

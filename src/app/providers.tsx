"use client";
import { Toaster } from "react-hot-toast";

import { hydrate, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import { getQueryClient } from "./get-query-client";

interface ProvidersProps {
  children: React.ReactNode;
  dehydratedState?: unknown;
}

export default function Providers({
  children,
  dehydratedState,
}: ProvidersProps) {
  const queryClient = getQueryClient();
  if (dehydratedState) {
    hydrate(queryClient, dehydratedState);
  }
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} client={queryClient} />
      <Toaster />
    </QueryClientProvider>
  );
}

// New file: React Query client initializer
import { isServer, QueryClient } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 60_000, refetchOnWindowFocus: true },
    },
  });
}

let browserClient: QueryClient;
export function getQueryClient() {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserClient) {
    browserClient = makeQueryClient();
  }
  return browserClient;
}

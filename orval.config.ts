import { defineConfig } from "orval";

export default defineConfig({
  api: {
    input: {
      target: "http://localhost:8080/api-doc/openapi.json",
    },
    output: {
      httpClient: "fetch",
      mode: "tags",
      target: "src/schemas/index.ts",
      schemas: "src/schemas",
      client: "react-query",
      override: {
        requestOptions: true,
        query: {
          version: 5,
          useQuery: true,
        },
        mutator: {
          path: "./src/mutator.ts",
          name: "fetchEnvMutator",
        },
      },
    },
  },
});

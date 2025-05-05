"use client";
import { useQueryClient } from "@tanstack/react-query";

import Card from "../../../components/Card";
import PageLayout from "../../../components/PageLayout";
import TokenGenerator from "../../../features/token/ui/TokenGenerator";
import TokenList from "../../../features/token/ui/TokenList";
import type { TokenResponse } from "../../../schemas";

export default function PageClient({
  initialData,
}: {
  initialData: TokenResponse[];
}) {
  const queryClient = useQueryClient();
  const onTokenGenerated = () => {
    queryClient.invalidateQueries({ queryKey: ["me", "tokens"] });
  };

  return (
    <PageLayout title="Token Management">
      <Card title="Generate New Token">
        <TokenGenerator onGenerate={onTokenGenerated} />
      </Card>
      <Card title="Your Tokens">
        <TokenList initialData={initialData} />
      </Card>
    </PageLayout>
  );
}

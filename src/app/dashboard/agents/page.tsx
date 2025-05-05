import { cookie } from "@lazarv/react-server";

import Card from "../../../components/Card";
import PageLayout from "../../../components/PageLayout";
import AgentTable from "../../../features/agents/ui/AgentTable";
import { listAgents } from "../../../schemas/agent";

export default async function AgentsPage() {
  const cookies = cookie();
  const cookieHeader = Object.entries(cookies)
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

  const { data: agents } = await listAgents(undefined, {
    headers: { Cookie: cookieHeader },
  });

  return (
    <PageLayout title="Agent Management">
      <Card>
        <AgentTable agents={agents} />
      </Card>
    </PageLayout>
  );
}

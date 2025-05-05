"use client";

import Card from "../../../../components/Card";
import PageLayout from "../../../../components/PageLayout";
import { useCommandExecution } from "../../../../features/agents/hooks/useCommandExecution";
import { CommandForm } from "../../../../features/agents/ui/CommandForm";
import { CommandOutput } from "../../../../features/agents/ui/CommandOutput";

export default function AgentCommandPage({ agentId }: { agentId: string }) {
  const { output, running, outputRef, executeCommand, stopExecution } =
    useCommandExecution(agentId);

  return (
    <PageLayout
      title={`Agent: ${agentId}`}
      action={
        <div className="flex space-x-2">
          <button className="px-3 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
            Agent Details
          </button>
        </div>
      }
    >
      <Card title="Command Execution" subtitle="Run commands on this agent">
        <div className="space-y-4">
          <CommandOutput output={output} outputRef={outputRef} />
          <CommandForm
            onExecute={executeCommand}
            onStop={stopExecution}
            running={running}
          />
        </div>
      </Card>
    </PageLayout>
  );
}

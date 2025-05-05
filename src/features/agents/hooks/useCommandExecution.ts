import { useCallback, useRef, useState } from "react";

import { getExecuteCommandUrl } from "../../../schemas/agent";

export function useCommandExecution(agentId: string) {
  const [output, setOutput] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const outputRef = useRef<HTMLDivElement>(null);
  const abortControllerRef = useRef<AbortController | null>(null);

  const executeCommand = useCallback(
    async (command: string) => {
      if (!command.trim()) return;

      setOutput([]);
      setRunning(true);

      // prepare abort controller
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;

      try {
        const res = await fetch(getExecuteCommandUrl(), {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ agent_id: agentId, command }),
          signal,
        });

        if (!res.ok) {
          const err = await res.json();
          throw new Error(err.error || res.statusText);
        }

        const reader = res.body?.getReader();
        const decoder = new TextDecoder();
        let buffer = "";

        while (true) {
          const { done, value } = await (reader as any).read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split(/\r?\n/);
          buffer = lines.pop()!;

          lines.forEach((line) => {
            if (line.startsWith("data:")) {
              setOutput((prev) => [...prev, line.replace(/^data:\s*/, "")]);
            }
          });

          // スクロールを最下部に保持
          outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
        }
      } catch (err: any) {
        if (err.name === "AbortError") {
          setOutput((prev) => [...prev, "⏹️ Aborted"]);
        } else {
          setOutput((prev) => [...prev, `Error: ${err.message}`]);
        }
      } finally {
        setRunning(false);
        abortControllerRef.current = null;
      }
    },
    [agentId]
  );

  const stopExecution = useCallback(() => {
    abortControllerRef.current?.abort();
  }, []);

  return {
    output,
    running,
    outputRef,
    executeCommand,
    stopExecution,
  };
}

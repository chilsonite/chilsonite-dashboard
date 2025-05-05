"use client";
import { useState } from "react";

interface CommandFormProps {
  onExecute: (command: string) => void;
  onStop: () => void;
  running: boolean;
}

export function CommandForm({ onExecute, onStop, running }: CommandFormProps) {
  const [command, setCommand] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onExecute(command);
    // コマンドを実行したらクリアしない（再実行のため残しておく）
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <input
        type="text"
        value={command}
        onChange={(e) => setCommand(e.target.value)}
        placeholder="コマンド"
        className="flex-1 border p-2 rounded"
        required
        disabled={running}
      />

      {!running ? (
        <button type="submit" className="bg-blue-500 text-white px-4 rounded">
          Execute
        </button>
      ) : (
        <button
          type="button"
          onClick={onStop}
          className="bg-red-500 text-white px-4 rounded"
        >
          Stop
        </button>
      )}
    </form>
  );
}

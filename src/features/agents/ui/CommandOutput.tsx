"use client";
import { RefObject } from "react";

interface CommandOutputProps {
  output: string[];
  outputRef: RefObject<HTMLDivElement | null>;
}

export function CommandOutput({ output, outputRef }: CommandOutputProps) {
  return (
    <div
      ref={outputRef}
      className="bg-black text-white font-mono p-2 rounded h-64 overflow-y-auto"
    >
      {output.map((line, i) => (
        <div key={i}>{line}</div>
      ))}
    </div>
  );
}

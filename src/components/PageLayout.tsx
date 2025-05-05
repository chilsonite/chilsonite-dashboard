import React from "react";

export interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
  action?: React.ReactNode;
  className?: string;
}

export default function PageLayout({
  children,
  title,
  action,
  className = "",
}: PageLayoutProps) {
  return (
    <div
      className={`flex flex-col w-full max-w-6xl mx-auto px-2 py-4 gap-8 ${className}`}
    >
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          {title}
        </h1>
        {action && <div>{action}</div>}
      </div>
      {children}
    </div>
  );
}

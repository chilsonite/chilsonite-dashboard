"use client";

import { useState } from "react";

import { Link } from "@lazarv/react-server/navigation";
import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";

import type { AgentInfo } from "../../../schemas";
import { useGetCurrentUser } from "../../../schemas/auth";

interface Props {
  agents: AgentInfo[];
}

export default function AgentTable({ agents }: Props) {
  // State for global and per-column filters
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  // Toggle for showing filter inputs
  const [showFilters, setShowFilters] = useState(false);

  // Fetch current user via orval-generated hook
  const { data: user, status } = useGetCurrentUser();

  if (status !== "success" || user.status !== 200) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-red-500">Error fetching user data</p>
      </div>
    );
  }

  // Define columns using original schema props
  const columns: ColumnDef<AgentInfo>[] = [
    {
      accessorKey: "agent_id",
      header: "Agent ID",
      enableColumnFilter: true,
    },
    { accessorKey: "ip", header: "IP", enableColumnFilter: true },
    {
      accessorKey: "remote_host",
      header: "Remote Host",
      enableColumnFilter: true,
    },
    {
      accessorKey: "country_code",
      header: "Country Code",
      enableColumnFilter: true,
    },
    { accessorKey: "city", header: "City", enableColumnFilter: true },
    { accessorKey: "region", header: "Region", enableColumnFilter: true },
    { accessorKey: "asn", header: "ASN", enableColumnFilter: true },
    { accessorKey: "asn_org", header: "ASN Org", enableColumnFilter: true },
    { accessorKey: "os_type", header: "OS Type", enableColumnFilter: true },
    {
      accessorKey: "os_version",
      header: "OS Version",
      enableColumnFilter: true,
    },
    { accessorKey: "hostname", header: "Hostname", enableColumnFilter: true },
    {
      accessorKey: "kernel_version",
      header: "Kernel Version",
      enableColumnFilter: true,
    },
    { accessorKey: "username", header: "Username", enableColumnFilter: true },
    {
      id: "execute",
      header: "Execute Command",
      cell: ({ row }) => {
        const id = row.getValue<string>("agent_id");
        const isAdmin = user.data.role === "admin";
        return isAdmin ? (
          <Link to={`/dashboard/agents/${id}`}>
            <button className="px-2 py-1 bg-blue-500 text-white rounded">
              Execute Command
            </button>
          </Link>
        ) : (
          <button
            className="px-2 py-1 bg-gray-400 text-gray-700 rounded cursor-not-allowed"
            disabled
          >
            Execute Command
          </button>
        );
      },
    },
  ];

  const table = useReactTable({
    data: agents,
    columns,
    state: { globalFilter, columnFilters },
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    globalFilterFn: "includesString",
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="overflow-x-auto">
      <table className="table-auto w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th className="px-4 py-2">
                <button
                  onClick={() => setShowFilters((prev) => !prev)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  {showFilters ? "×" : "🔍"}
                </button>
              </th>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-sm font-medium text-gray-700"
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  {showFilters && header.column.getCanFilter() && (
                    <div className="mt-1">
                      <input
                        type="text"
                        value={(header.column.getFilterValue() as string) ?? ""}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        placeholder="..."
                        className="border mt-1 rounded px-1 py-0.5 text-xs w-full"
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              <td className="px-4 py-2"></td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-4 py-2 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

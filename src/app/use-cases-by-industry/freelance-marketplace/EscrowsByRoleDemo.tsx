"use client";

import React from "react";
import { useGetEscrowsFromIndexerByRole } from "@trustless-work/escrow/hooks";
import type { GetEscrowsFromIndexerByRoleParams } from "@trustless-work/escrow/types";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const roles = [
  "approver",
  "serviceProvider",
  "platformAddress",
  "releaseSigner",
  "disputeResolver",
  "receiver",
  "signer",
] as const satisfies ReadonlyArray<GetEscrowsFromIndexerByRoleParams["role"]>;

export function EscrowsByRoleDemo() {
  const { getEscrowsByRole } = useGetEscrowsFromIndexerByRole();

  const [roleAddress, setRoleAddress] = React.useState("");
  const [role, setRole] =
    React.useState<GetEscrowsFromIndexerByRoleParams["role"]>("approver");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [resultJson, setResultJson] = React.useState<string>("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setResultJson("");

    if (!roleAddress.trim()) {
      setError("Ingresa un roleAddress (Stellar address).");
      return;
    }

    setLoading(true);
    try {
      const payload: GetEscrowsFromIndexerByRoleParams = {
        role,
        roleAddress: roleAddress.trim(),
        orderDirection: "desc",
        orderBy: "updatedAt",
        page: 1,
      };

      const escrows = await getEscrowsByRole(payload);
      setResultJson(JSON.stringify(escrows, null, 2));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary">Read-only</Badge>
        <p className="text-sm text-muted-foreground">
          Uses <code>useGetEscrowsFromIndexerByRole</code>. Some deployments may
          require <code>NEXT_PUBLIC_API_KEY</code>.
        </p>
      </div>

      <form onSubmit={onSubmit} className="grid gap-3 md:grid-cols-3">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Role</span>
          <select
            value={role}
            onChange={(e) =>
              setRole(e.target.value as GetEscrowsFromIndexerByRoleParams["role"])
            }
            className={cn(
              "flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            )}
          >
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-1 md:col-span-2">
          <span className="text-sm font-medium">Role address</span>
          <Input
            value={roleAddress}
            onChange={(e) => setRoleAddress(e.target.value)}
            placeholder="G... (Stellar public address)"
          />
        </div>

        <div className="md:col-span-3 flex flex-wrap items-center gap-3">
          <Button type="submit" disabled={loading}>
            {loading ? "Querying..." : "Query escrows"}
          </Button>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
        </div>
      </form>

      {resultJson ? (
        <pre className="max-h-[420px] overflow-auto rounded-lg border border-border bg-muted p-4 text-xs text-foreground">
          {resultJson}
        </pre>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-4 text-sm text-muted-foreground">
          Paste an address and run the query to see results here.
        </div>
      )}
    </div>
  );
}


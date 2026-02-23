import Link from "next/link";
import { EscrowsByRoleDemo } from "./EscrowsByRoleDemo";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function FreelanceMarketplaceUseCasePage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Button asChild variant="outline" size="sm">
            <Link href="/use-cases-by-industry">← Back</Link>
          </Button>

          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">Use case</Badge>
            <Badge variant="outline">Freelance marketplace</Badge>
          </div>
        </div>

        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Escrow flow for service marketplaces
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          A minimal, product-like surface using the Trustless Work SDK: query
          escrows, and follow the recommended XDR signing &amp; submit pattern
          for write flows.
        </p>
      </header>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Recommended flow</CardTitle>
          <CardDescription>Simple, role-gated, wallet-signed.</CardDescription>
        </CardHeader>
        <CardContent>
          <ol className="list-decimal space-y-1 pl-5 text-sm text-muted-foreground">
            <li>Call a write hook (initialize / fund / release / dispute).</li>
            <li>The API returns an unsigned XDR.</li>
            <li>Sign the XDR client-side with the correct role wallet.</li>
            <li>
              Broadcast with <code>useSendTransaction</code>.
            </li>
          </ol>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Query escrows by role</CardTitle>
          <CardDescription>
            Use this as your “dashboard” building block.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EscrowsByRoleDemo />
        </CardContent>
      </Card>
    </main>
  );
}


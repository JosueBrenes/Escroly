import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function UseCasesByIndustryPage() {
  return (
    <main className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12">
      <header className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="secondary">Escrow UX</Badge>
          <Badge variant="outline">Trustless Work</Badge>
        </div>
        <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
          Use cases by industry
        </h1>
        <p className="max-w-2xl text-sm text-muted-foreground md:text-base">
          Proyectos demo (pequeños) con una superficie de producto clara: query,
          firma XDR y envío de transacciones.
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <Button asChild>
            <Link href="/use-cases-by-industry/freelance-marketplace">
              Open marketplace use case
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to landing</Link>
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link href="/use-cases-by-industry/freelance-marketplace">
          <Card className="transition-colors hover:bg-accent/40">
            <CardHeader>
              <CardTitle className="text-base">Freelance / Marketplace</CardTitle>
              <CardDescription>
                Read-only query by role + the recommended XDR signing flow.
              </CardDescription>
            </CardHeader>
          </Card>
        </Link>
      </section>
    </main>
  );
}


import Link from "next/link";
import { ArrowRight, Check, Shield, Sparkles, Wallet, Zap } from "lucide-react";

import { EscrowsByRoleDemo } from "./use-cases-by-industry/freelance-marketplace/EscrowsByRoleDemo";
import { WalletButton } from "@/components/tw-blocks/wallet-kit/WalletButtons";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/70 backdrop-blur">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-semibold tracking-tight">
                Escrowly
              </span>
              <span className="text-xs text-muted-foreground">
                Trustless escrow UX
              </span>
            </div>
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/use-cases-by-industry"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Use cases
            </Link>
            <a
              href="https://docs.trustlesswork.com"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Trustless Work docs
            </a>
          </nav>

          <div className="flex items-center gap-2">
            <WalletButton />
            <Button asChild variant="outline" className="hidden sm:inline-flex">
              <Link href="/use-cases-by-industry">Explore</Link>
            </Button>
            <Button asChild>
              <Link href="/use-cases-by-industry/freelance-marketplace">
                Open demo <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6">
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(60%_60%_at_50%_0%,hsl(var(--primary)/0.12)_0%,transparent_70%)]" />

          <div className="grid gap-10 md:grid-cols-2 md:items-center">
            <div className="flex flex-col gap-6">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="secondary">Powered by Trustless Work</Badge>
                <Badge variant="outline">Stellar • XDR signing</Badge>
              </div>

              <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
                Escrows that feel like a product.
              </h1>

              <p className="max-w-xl text-pretty text-base leading-7 text-muted-foreground md:text-lg">
                A simple, professional flow for marketplaces and service
                platforms: initialize escrow, sign XDR in the wallet, fund, and
                release—role-gated and transparent.
              </p>

              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild size="lg">
                  <Link href="/use-cases-by-industry/freelance-marketplace">
                    Try the flow <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/use-cases-by-industry">See use cases</Link>
                </Button>
              </div>

              <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Next.js app + shadcn-style UI
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4" /> Trustless Work React SDK wired
                  via provider
                </div>
              </div>
            </div>

            <Card className="relative">
              <CardHeader>
                <CardTitle>Product surface</CardTitle>
                <CardDescription>
                  One dashboard, two actions: check escrow state and complete the
                  next step.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-border bg-background p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Shield className="h-4 w-4" />
                      Role-gated actions
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Approver, provider, release signer, resolver—each signs
                      only what they should.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Wallet className="h-4 w-4" />
                      Wallet signing
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Write flows return unsigned XDR, signed client-side, then
                      submitted to the network.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Zap className="h-4 w-4" />
                      Minimal API surface
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      Use the SDK hooks; keep server logic thin and predictable.
                    </p>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-4">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <Sparkles className="h-4 w-4" />
                      Clean UX defaults
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">
                      shadcn-style components, fast UI, and simple copy.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <Separator className="my-8" />

        <section className="py-10">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              Super simple flow
            </h2>
            <p className="max-w-2xl text-sm text-muted-foreground">
              This demo is intentionally tiny: one provider, a couple hooks, and
              a single “send signed XDR” step for write operations.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">1) Request</CardTitle>
                <CardDescription>
                  Call an SDK hook (initialize / fund / release).
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">2) Sign</CardTitle>
                <CardDescription>
                  Wallet signs the returned unsigned XDR.
                </CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">3) Submit</CardTitle>
                <CardDescription>
                  Use <code>useSendTransaction</code> to broadcast.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="py-10">
          <Card>
            <CardHeader>
              <CardTitle>Try a read-only query</CardTitle>
              <CardDescription>
                Search escrows by role (this is the “product-ish” surface).
              </CardDescription>
            </CardHeader>
            <CardContent>
              <EscrowsByRoleDemo />
            </CardContent>
          </Card>
        </section>

        <section className="py-14">
          <Card className="bg-primary text-primary-foreground">
            <CardContent className="flex flex-col items-start justify-between gap-6 p-8 md:flex-row md:items-center">
              <div className="flex flex-col gap-2">
                <h3 className="text-2xl font-semibold tracking-tight">
                  Ready to ship escrow UX?
                </h3>
                <p className="text-sm text-primary-foreground/80">
                  Open the use case and plug in your API key when you’re ready
                  for write flows.
                </p>
              </div>
              <Button asChild size="lg" variant="secondary">
                <Link href="/use-cases-by-industry/freelance-marketplace">
                  Open marketplace use case <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </main>

      <footer className="border-t border-border/60">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 py-10 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-muted-foreground">
            Escrowly is a demo product surface built on Trustless Work.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="/use-cases-by-industry"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Use cases
            </Link>
            <a
              href="https://dev.api.trustlesswork.com/docs"
              target="_blank"
              rel="noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              API (testnet)
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}

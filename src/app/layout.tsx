import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TrustlessWorkProvider } from "@/providers/trustless-work-provider";
import { WalletProvider } from "@/modules/wallet/providers/wallet-provider";
import { Navbar } from "@/shared/layout/navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Anchor — Decentralized trust for rental deposits",
  description:
    "Programmable escrow, clear rules, and verifiable evidence that eliminate deposit disputes without changing payment flows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <TrustlessWorkProvider>
          <WalletProvider>
            <Navbar />
            <main className="min-h-[calc(100vh-4rem)]">{children}</main>
          </WalletProvider>
        </TrustlessWorkProvider>
      </body>
    </html>
  );
}

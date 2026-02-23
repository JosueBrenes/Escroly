import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { TrustlessWorkProvider } from "@/trustless-work-provider";
import { WalletProvider } from "@/components/tw-blocks/providers/WalletProvider";
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
  title: "Escrowly — trustless escrow flows",
  description:
    "A tiny product demo: simple, professional escrow UX powered by Trustless Work.",
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
          <WalletProvider>{children}</WalletProvider>
        </TrustlessWorkProvider>
      </body>
    </html>
  );
}

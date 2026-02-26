# Anchor

Decentralized trust infrastructure for rental deposits. Programmable escrow with clear rules and verifiable evidence — no arbitrary charges, no disputes.

Built with [Trustless Work](https://docs.trustlesswork.com) on the Stellar network.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Environment Variables

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_API_KEY` — Required for most SDK operations.
- `NEXT_PUBLIC_TW_NETWORK` — `development` (default) or `mainnet`.

## Routes

| Route | Description |
|---|---|
| `/` | Landing page |
| `/how-it-works` | Step-by-step escrow flow |
| `/dashboard` | View and manage your deposits |
| `/deposit/new` | Create a new deposit escrow |
| `/deposit/[id]` | Deposit detail, actions, and status |

## Project Structure

```
src/
├── app/                          Pages (thin, import from modules)
├── modules/
│   ├── landing/ui/               Landing page components
│   ├── how-it-works/ui/          How It Works components
│   ├── dashboard/
│   │   ├── ui/                   Dashboard components
│   │   ├── hooks/                useEscrows
│   │   └── types/
│   ├── deposit/
│   │   ├── ui/                   Deposit form, detail, actions
│   │   ├── hooks/                useDepositForm, useDepositDetail, useDepositActions
│   │   └── types/
│   └── wallet/
│       ├── ui/                   WalletButton
│       ├── hooks/                useWallet
│       ├── providers/            WalletProvider
│       └── lib/                  wallet-kit, validators, trustlines
├── shared/
│   ├── ui/                       Reusable UI components (Button, Input, Badge, etc.)
│   ├── layout/                   Navbar
│   └── lib/                      Utilities (cn)
└── providers/                    TrustlessWorkProvider
```

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript 5**
- **Tailwind CSS 4**
- **Trustless Work SDK** (`@trustless-work/escrow`)
- **Stellar Wallet Kit** (`@creit.tech/stellar-wallets-kit`)

## Docs

- [Trustless Work Documentation](https://docs.trustlesswork.com)
- [Testnet API Swagger](https://dev.api.trustlesswork.com/docs)

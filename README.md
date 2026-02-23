## Escrowly

Small “product surface” demo for **Trustless Work**: a clean escrow UX with a minimal flow (request → wallet signs XDR → submit).

## Getting Started

Install dependencies and run the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Routes

- `/`: Landing page
- `/use-cases-by-industry`: Use cases index
- `/use-cases-by-industry/freelance-marketplace`: Marketplace escrow demo

## Trustless Work (Escrow React SDK)

This repo is wired with the Trustless Work React SDK provider (`TrustlessWorkConfig`).

- **Provider**: `src/trustless-work-provider.tsx`
- **Mounted in**: `src/app/layout.tsx`
- **Demo route**: `/use-cases-by-industry` (includes a read-only example calling `useGetEscrowsFromIndexerByRole`)

### Env vars

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_API_KEY`: optional for read-only calls; required for most write flows.
- `NEXT_PUBLIC_TW_NETWORK`: `development` (default) or `mainnet`.

### Docs

- Trustless Work docs: `https://docs.trustlesswork.com`
- Testnet API Swagger: `https://dev.api.trustlesswork.com/docs`

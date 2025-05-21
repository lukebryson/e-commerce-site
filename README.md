# ShopEase – E-commerce Demo

A full-stack TypeScript project that shows a lightweight shopping workflow:

* **React + Vite** client styled with Tailwind
* **Express** API (TypeScript + tsx) that also serves the compiled client
* Local JSON “database” – no external DB required
* **React-Query** for fetching, Context + `localStorage` for the basket

> Built over a 4 hour period, so the code is intentionally compact and easy to follow.

---

## Features

| Area          | What’s implemented                                                |
| ------------- | ----------------------------------------------------------------- |
| Browse items  | Responsive grid with stock count                                  |
| Basket        | Add/Remove, quantity guard vs. stock, persisted in `localStorage` |
| Checkout      | Dummy **Pay** button clears basket & decrements stock             |
| Order history | Can be toggled on (saved to `localStorage`)                       |
| Dev UX        | Hot-reload via Vite (client) + Nodemon (API)                      |

---

## Tech Stack

* **Client:** React 18, Vite, TypeScript, Tailwind, React-Query, Radix UI, Lucide icons
* **Server:** Node 20, Express 5, `tsx` runtime, Drizzle ORM (future)
* **Tooling:** Cross-env, Nodemon, npm scripts

---

## Prerequisites

| Software | Version                  |
| -------- | ------------------------ |
| Node.js  | 18 + (tested on 20.19.2) |
| npm      | 9 +                      |

---

## Getting Started

```bash
# 1 – clone & install
git clone <repo-url> shopease
cd shopease
npm install

# 2 – run dev workflow with hot-reload
npm run dev
# client  👉 http://localhost:5173
# api     👉 http://localhost:5000/api/products
```

#### Windows note

All scripts use **cross-env**, so `NODE_ENV=…` works fine in PowerShell, Git Bash, CMD, etc.

---

## npm Scripts

| Script  | Purpose                                                                |
| ------- | ---------------------------------------------------------------------- |
| `dev`   | Runs Vite client **and** Nodemon-watched API concurrently              |
| `build` | Bundles client (`vite build`) **and** server (`esbuild`) to `dist/`    |
| `start` | Serves production build – `node dist/index.js` (defaults to port 5000) |
| `check` | Type-checks client & server (`tsc --noEmit`)                           |

> Change the runtime port with `PORT=4000 npm start`.

---

## Folder Structure (top-level)

```
client/                      React front-end (src/ contains pages, components, hooks…)
server/                      Express API (index.ts entry)
shared/                      Zod schema reused by both sides
productsJsonServer.json      Local “DB” seed
```

---

## API Routes

| Method | Endpoint        | Description            |
| ------ | --------------- | ---------------------- |
| GET    | `/api/products` | All products           |
| POST   | `/api/orders`   | Persist order *(TODO)* |

---

## TODO / Nice-to-haves

* Persist orders in a real DB (Drizzle + SQLite)
* Auth & user accounts
* Replace hard-coded image map with `product.image`
* Unit tests (Vitest + RTL)
* CI pipeline (GitHub Actions)

---

## Licence

MIT © 2025 ShopEase Demo

ShopEase – E‑commerce Demo

A full‑stack TypeScript project that demonstrates a simple e‑commerce workflow:

React + Vite client with Tailwind CSS UI components

Express REST API (TypeScript, tsx) that serves the compiled client and a JSON‑based product catalogue

Local JSON “database” (productsJsonServer.json) – no external DB required

React‑Query for data fetching, Context + localStorage for basket state

Built during a one‑day assessment – code is intentionally concise and easy to follow.

Features

Area

What’s implemented

Browse products

Grid of items, stock count, responsive design

Basket

Add / remove, quantity guard vs. stock, persisted in localStorage

Checkout

Dummy “pay” button that clears basket & decrements stock

Order history

Saved paid orders in localStorage (optional – see TODO)

Dev UX

Hot‑reload via Vite & Nodemon

Tech Stack

Client: React 18, Vite, TypeScript, Tailwind CSS, React‑Query, Radix UI,
Lucide‑React icons

Server: Node 20, Express 5, tsx runtime, Drizzle ORM (future db work)

Tooling: Cross‑env, Nodemon, npm scripts

Prerequisites

Software

Version

Node.js

18 or newer (tested on 20.19.2)

npm

9 or newer

Getting Started

# 1 – clone & install deps (≈ 1 min)
git clone <repo‑url> shopease
cd shopease
npm install

# 2 – run the dev workflow with hot‑reload
npm run dev
# client → http://localhost:5173
# api    → http://localhost:5000/api/products

Windows note (cross‑env)

Windows shells can’t parse NODE_ENV=value inline.
All scripts use cross-env so they work everywhere – no extra steps required.

NPM Scripts

Script

What it does

dev

Runs Vite client and Nodemon‑watched API concurrently

build

Bundles client (vite build) and server (esbuild) to dist/

start

Serves production build – node dist/index.js (default port 5000)

check

Type checks both client & server (tsc --noEmit)

Change the runtime port with PORT=4000 npm start (server code picks up process.env.PORT).

Folder Structure (top‑level)

client/          # React front‑end (src/ contains components, pages, hooks…)
server/          # Express API (index.ts entry)
shared/          # Zod schema reused by both sides
productsJsonServer.json   # local “DB” seed

API Routes (dev & prod)

Method

Endpoint

Description

GET

/api/products

All products

POST

/api/orders TODO

Persist paid order

TODO / Nice‑to‑haves

Persist orders to a real DB (Drizzle + SQLite)

Auth & user accounts

Image handling via product image field instead of hard‑coded map

Unit tests (Vitest + React Testing Library)

CI pipeline (GitHub Actions)

Licence

MIT © 2025 ShopEase Demo

# BrightMart

A small React storefront built on the free, CORS-enabled [FakeStoreAPI](https://fakestoreapi.com/products). Search, filter by category, wishlist, cart with quantities, and a checkout flow.

## Project structure

```
brightmart-app/
├── index.html                  entry HTML file Vite serves
├── package.json                dependencies + run scripts
├── vite.config.js              build tool config
└── src/
    ├── main.jsx                 mounts <App /> into the page, imports the stylesheet
    ├── App.jsx                  top-level state (products, cart, wishlist, view) + layout
    ├── api/
    │   └── products.js          the one fetch() call to FakeStoreAPI
    ├── utils/
    │   └── format.js             formatMoney() helper
    ├── styles/
    │   └── styles.css            ALL the CSS for the whole app, in one place
    └── components/
        ├── Header.jsx            logo, search box, wishlist/cart nav buttons
        ├── CategoryRail.jsx      the row of category filter chips
        ├── ProductGrid.jsx       lays out a list of ProductCards
        ├── ProductCard.jsx       a single product card
        ├── SkeletonGrid.jsx      the gray loading placeholder cards
        ├── EmptyState.jsx        reused for "no results" / errors / empty cart
        ├── DetailView.jsx        the full single-product page
        └── CartDrawer.jsx        the slide-over cart + checkout confirmation
```

Each component only knows how to render its own piece of UI — `App.jsx` holds all the actual state (what's in the cart, what's wishlisted, what's being searched for) and passes it down as props. `styles.css` is the only file with CSS; components use plain class names like `b-card` or `b-primary-btn` that are defined there.

## How to run it

You'll need [Node.js](https://nodejs.org) installed (version 18 or newer). To check, open a terminal and run:

```bash
node -v
```

Then, from inside the `brightmart-app` folder:

**1. Install the dependencies**
```bash
npm install
```
This reads `package.json` and downloads React, Vite, and lucide-react into a `node_modules` folder. Only needs to be done once (or whenever dependencies change).

**2. Start the dev server**
```bash
npm run dev
```
Vite will print a local address, typically:
```
Local:   http://localhost:5173/
```
Open that URL in your browser — the app loads there with hot-reload (any file you edit updates instantly).

**3. (Optional) Build for production**
```bash
npm run build
```
This creates an optimized `dist/` folder you could deploy to any static host (Netlify, Vercel, GitHub Pages, etc.).

**4. (Optional) Preview the production build locally**
```bash
npm run preview
```

## Confirming it actually works

- On `npm run dev`, watch the terminal for errors — a clean start shows no red text, just the local URL.
- In the browser, open DevTools (F12) → Network tab → reload. You should see a request to `fakestoreapi.com/products` returning status `200`.
- Try each feature by hand: search, click a category chip, open a product, heart it, add it to cart, open the cart drawer, adjust quantity, and complete an order.

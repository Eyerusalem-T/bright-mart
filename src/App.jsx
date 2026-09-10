import { useState, useEffect, useMemo } from "react";
import { Heart, Search, PackageOpen } from "lucide-react";

import Header from "./components/Header.jsx";
import CategoryRail from "./components/CategoryRail.jsx";
import ProductGrid from "./components/ProductGrid.jsx";
import SkeletonGrid from "./components/SkeletonGrid.jsx";
import EmptyState from "./components/EmptyState.jsx";
import DetailView from "./components/DetailView.jsx";
import CartDrawer from "./components/CartDrawer.jsx";

import { fetchProducts } from "./api/products.js";

export default function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(null);

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [view, setView] = useState("catalog"); // catalog | detail | wishlist
  const [selectedId, setSelectedId] = useState(null);

  const [wishlist, setWishlist] = useState(() => new Set());
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [order, setOrder] = useState(null);
  const [detailQty, setDetailQty] = useState(1);
  const [justAddedId, setJustAddedId] = useState(null);

  // ---- Load data from the API once on mount ----
  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setLoadError(null);

    fetchProducts()
      .then((data) => {
        if (!cancelled) setProducts(data);
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err.message || "Could not load products.");
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // ---- Derived data ----
  const categories = useMemo(() => {
    const set = new Set(products.map((p) => p.category));
    return ["all", ...Array.from(set)];
  }, [products]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return products.filter((p) => {
      const inCategory = activeCategory === "all" || p.category === activeCategory;
      if (!inCategory) return false;
      if (!q) return true;
      return p.title.toLowerCase().includes(q) || (p.description || "").toLowerCase().includes(q);
    });
  }, [products, query, activeCategory]);

  const wishlistProducts = useMemo(() => products.filter((p) => wishlist.has(p.id)), [products, wishlist]);

  const cartEntries = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const product = products.find((p) => p.id === Number(id));
        return product ? { product, qty } : null;
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartCount = cartEntries.reduce((sum, e) => sum + e.qty, 0);
  const cartTotal = cartEntries.reduce((sum, e) => sum + e.product.price * e.qty, 0);
  const selectedProduct = products.find((p) => p.id === selectedId) || null;

  // ---- Handlers ----
  function toggleWishlist(id) {
    setWishlist((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  }

  function addToCart(id, qty = 1) {
    setCart((prev) => ({ ...prev, [id]: (prev[id] || 0) + qty }));
    setJustAddedId(id);
    setTimeout(() => setJustAddedId((cur) => (cur === id ? null : cur)), 1200);
  }

  function setCartQty(id, qty) {
    setCart((prev) => {
      if (qty <= 0) {
        const next = { ...prev };
        delete next[id];
        return next;
      }
      return { ...prev, [id]: qty };
    });
  }

  function removeFromCart(id) {
    setCart((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
  }

  function openDetail(id) {
    setSelectedId(id);
    setDetailQty(1);
    setView("detail");
  }

  function goHome() {
    setView("catalog");
    setSelectedId(null);
  }

  function completeOrder() {
    const number = `BM-${Math.floor(100000 + Math.random() * 899999)}`;
    setOrder({ number, total: cartTotal, count: cartCount });
    setCart({});
  }

  function closeOrderSlip() {
    setOrder(null);
    setCartOpen(false);
  }

  return (
    <div className="bright">
      <Header
        query={query}
        onQueryChange={(val) => {
          setQuery(val);
          setView("catalog");
        }}
        view={view}
        onGoHome={goHome}
        onShowWishlist={() => {
          setView("wishlist");
          setSelectedId(null);
        }}
        onOpenCart={() => setCartOpen(true)}
        wishlistCount={wishlist.size}
        cartCount={cartCount}
      />

      {view !== "detail" && (
        <CategoryRail
          categories={categories}
          activeCategory={activeCategory}
          onSelect={(cat) => {
            setActiveCategory(cat);
            setView("catalog");
          }}
        />
      )}

      <main className="b-main">
        {view === "detail" && selectedProduct && (
          <DetailView
            product={selectedProduct}
            qty={detailQty}
            onQtyChange={setDetailQty}
            onBack={goHome}
            onAddToCart={(q) => addToCart(selectedProduct.id, q)}
            isWished={wishlist.has(selectedProduct.id)}
            onToggleWish={() => toggleWishlist(selectedProduct.id)}
          />
        )}

        {view === "catalog" && (
          <>
            <div className="b-section-head">
              <h2>{activeCategory === "all" ? "All products" : activeCategory}</h2>
              {!loading && (
                <span className="b-result-count">
                  {filtered.length} item{filtered.length !== 1 ? "s" : ""}
                </span>
              )}
            </div>

            {loading && <SkeletonGrid />}

            {!loading && loadError && (
              <EmptyState
                icon={<PackageOpen size={26} />}
                title="Couldn't load the shop"
                message={`${loadError} Try refreshing the page in a moment.`}
              />
            )}

            {!loading && !loadError && filtered.length === 0 && (
              <EmptyState
                icon={<Search size={24} />}
                title="Nothing matches that search"
                message="Try a different term, or clear the category filter."
              />
            )}

            {!loading && !loadError && filtered.length > 0 && (
              <ProductGrid
                products={filtered}
                wishlist={wishlist}
                onToggleWish={toggleWishlist}
                onOpen={openDetail}
                onAdd={addToCart}
                justAddedId={justAddedId}
              />
            )}
          </>
        )}

        {view === "wishlist" && (
          <>
            <div className="b-section-head">
              <h2>Your wishlist</h2>
              <span className="b-result-count">
                {wishlistProducts.length} item{wishlistProducts.length !== 1 ? "s" : ""}
              </span>
            </div>
            {wishlistProducts.length === 0 ? (
              <EmptyState
                icon={<Heart size={24} />}
                title="Nothing saved yet"
                message="Tap the heart on any item to keep it here for later."
              />
            ) : (
              <ProductGrid
                products={wishlistProducts}
                wishlist={wishlist}
                onToggleWish={toggleWishlist}
                onOpen={openDetail}
                onAdd={addToCart}
                justAddedId={justAddedId}
              />
            )}
          </>
        )}
      </main>

      {cartOpen && (
        <CartDrawer
          cartEntries={cartEntries}
          cartTotal={cartTotal}
          order={order}
          onClose={() => setCartOpen(false)}
          onSetQty={setCartQty}
          onRemove={removeFromCart}
          onCheckout={completeOrder}
          onCloseOrder={closeOrderSlip}
        />
      )}
    </div>
  );
}

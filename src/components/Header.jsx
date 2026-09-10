import { Heart, ShoppingBag, Search } from "lucide-react";

export default function Header({
  query,
  onQueryChange,
  view,
  onGoHome,
  onShowWishlist,
  onOpenCart,
  wishlistCount,
  cartCount,
}) {
  return (
    <header className="b-header">
      <div className="b-header-row">
        <div className="b-logo" onClick={onGoHome}>
          <span className="b-logo-dot" />
          <span className="display">
            Bright<span>Mart</span>
          </span>
        </div>

        <div className="b-search">
          <Search size={16} />
          <input
            type="text"
            placeholder="Search products…"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>

        <nav className="b-nav">
          <button
            className={`b-nav-btn ${view === "wishlist" ? "active" : ""}`}
            onClick={onShowWishlist}
          >
            <Heart size={16} /> <span className="label">Wishlist</span>
            {wishlistCount > 0 && <span className="b-badge">{wishlistCount}</span>}
          </button>
          <button className="b-nav-btn" onClick={onOpenCart}>
            <ShoppingBag size={16} /> <span className="label">Cart</span>
            {cartCount > 0 && <span className="b-badge">{cartCount}</span>}
          </button>
        </nav>
      </div>
    </header>
  );
}

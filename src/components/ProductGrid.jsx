import ProductCard from "./ProductCard.jsx";

export default function ProductGrid({ products, wishlist, onToggleWish, onOpen, onAdd, justAddedId }) {
  return (
    <div className="b-grid">
      {products.map((p) => (
        <ProductCard
          key={p.id}
          product={p}
          isWished={wishlist.has(p.id)}
          onToggleWish={() => onToggleWish(p.id)}
          onOpen={() => onOpen(p.id)}
          onAdd={() => onAdd(p.id)}
          justAdded={justAddedId === p.id}
        />
      ))}
    </div>
  );
}

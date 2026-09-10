import { Heart, Plus, Check } from "lucide-react";
import StarRating from "./StarRating.jsx";
import { formatMoney } from "../utils/format.js";

export default function ProductCard({ product, isWished, onToggleWish, onOpen, onAdd, justAdded }) {
  return (
    <div className="b-card">
      <div className="b-card-img-wrap" onClick={onOpen}>
        <span className="b-cat-pill">{product.category}</span>
        <img src={product.image} alt={product.title} loading="lazy" />
        <button
          className="b-wish-btn"
          onClick={(e) => {
            e.stopPropagation();
            onToggleWish();
          }}
          aria-label={isWished ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart size={14} fill={isWished ? "#ff8a3d" : "none"} color={isWished ? "#ff8a3d" : "#1a1a2e"} />
        </button>
      </div>
      <div className="b-card-body">
        <span className="b-card-title" onClick={onOpen}>
          {product.title}
        </span>
        <StarRating rating={product.rating?.rate} count={product.rating?.count} />
        <div className="b-card-bottom">
          <span className="b-price">{formatMoney(product.price)}</span>
          <button className={`b-add-btn ${justAdded ? "added" : ""}`} onClick={onAdd}>
            {justAdded ? <Check size={14} /> : <Plus size={14} />}
            {justAdded ? "Added" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
}

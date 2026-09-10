import { ChevronLeft, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import StarRating from "./StarRating.jsx";
import { formatMoney } from "../utils/format.js";

export default function DetailView({ product, qty, onQtyChange, onBack, onAddToCart, isWished, onToggleWish }) {
  return (
    <div>
      <button className="b-back" onClick={onBack}>
        <ChevronLeft size={16} /> Back to catalog
      </button>
      <div className="b-detail">
        <div className="b-detail-img">
          <img src={product.image} alt={product.title} />
        </div>
        <div>
          <span className="b-detail-cat">{product.category}</span>
          <h1>{product.title}</h1>
          <div className="b-detail-meta">
            <StarRating rating={product.rating?.rate} count={product.rating?.count} />
            <span>{product.rating?.rate?.toFixed(1)} rating</span>
          </div>
          <div className="b-detail-price">{formatMoney(product.price)}</div>
          <p className="b-detail-desc">{product.description}</p>
          <div className="b-detail-actions">
            <div className="b-qty-stepper">
              <button onClick={() => onQtyChange(Math.max(1, qty - 1))}>
                <Minus size={14} />
              </button>
              <span>{qty}</span>
              <button onClick={() => onQtyChange(qty + 1)}>
                <Plus size={14} />
              </button>
            </div>
            <button className="b-primary-btn" onClick={() => onAddToCart(qty)}>
              <ShoppingBag size={16} /> Add to cart
            </button>
            <button className={`b-secondary-btn ${isWished ? "is-wished" : ""}`} onClick={onToggleWish}>
              <Heart size={16} fill={isWished ? "#fff" : "none"} />
              {isWished ? "Saved" : "Save for later"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

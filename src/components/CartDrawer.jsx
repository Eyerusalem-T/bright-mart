import { X, ShoppingBag, Minus, Plus, Check } from "lucide-react";
import EmptyState from "./EmptyState.jsx";
import { formatMoney } from "../utils/format.js";

export default function CartDrawer({
  cartEntries,
  cartTotal,
  order,
  onClose,
  onSetQty,
  onRemove,
  onCheckout,
  onCloseOrder,
}) {
  return (
    <div
      className="b-overlay"
      onClick={() => {
        onClose();
        if (order) onCloseOrder();
      }}
    >
      <div className="b-drawer" onClick={(e) => e.stopPropagation()}>
        {order ? (
          <div className="b-slip">
            <div className="b-slip-check">
              <Check size={28} />
            </div>
            <h3>Order placed!</h3>
            <div className="b-slip-number">{order.number}</div>
            <p>
              {order.count} item{order.count !== 1 ? "s" : ""} · {formatMoney(order.total)} total. Thanks for
              shopping with BrightMart.
            </p>
            <button className="b-primary-btn" onClick={onCloseOrder} style={{ marginTop: 8 }}>
              Back to shopping
            </button>
          </div>
        ) : (
          <>
            <div className="b-drawer-head">
              <h2>Your cart</h2>
              <button className="b-icon-btn" onClick={onClose}>
                <X size={17} />
              </button>
            </div>
            <div className="b-drawer-body">
              {cartEntries.length === 0 ? (
                <EmptyState
                  compact
                  icon={<ShoppingBag size={24} />}
                  title="Your cart is empty"
                  message="Add something from the catalog to see it here."
                />
              ) : (
                cartEntries.map(({ product, qty }) => (
                  <div className="b-cart-item" key={product.id}>
                    <img src={product.image} alt={product.title} />
                    <div className="b-cart-item-info">
                      <div className="b-cart-item-title">{product.title}</div>
                      <div className="b-cart-item-row">
                        <div className="b-qty-stepper">
                          <button onClick={() => onSetQty(product.id, qty - 1)}>
                            <Minus size={13} />
                          </button>
                          <span>{qty}</span>
                          <button onClick={() => onSetQty(product.id, qty + 1)}>
                            <Plus size={13} />
                          </button>
                        </div>
                        <strong>{formatMoney(product.price * qty)}</strong>
                      </div>
                      <button className="b-remove-link" onClick={() => onRemove(product.id)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
            {cartEntries.length > 0 && (
              <div className="b-drawer-foot">
                <div className="b-subtotal-row">
                  <span>Subtotal</span>
                  <span className="amt">{formatMoney(cartTotal)}</span>
                </div>
                <button className="b-primary-btn" style={{ width: "100%", justifyContent: "center" }} onClick={onCheckout}>
                  Complete order
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

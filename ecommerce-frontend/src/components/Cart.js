import React from 'react';
import './Cart.css';

function Cart({ cart, onRemove, onUpdateQuantity, onCheckout }) {
  if (cart.items.length === 0) {
    return (
      <section className="cart-section">
        <h2>Shopping Cart</h2>
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <span>Add some products to get started!</span>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-section">
      <h2>Shopping Cart</h2>
      <div className="cart-container">
        <div className="cart-items">
          {cart.items.map(item => (
            <div key={item.id} className="cart-item">
              <div className="cart-item-image">
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="100" height="100"%3E%3Crect fill="%23ddd" width="100" height="100"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="12" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EProduct%3C/text%3E%3C/svg%3E';
                  }}
                />
              </div>
              <div className="cart-item-details">
                <h3 className="cart-item-name">{item.name}</h3>
                <p className="cart-item-price">${item.price.toFixed(2)} each</p>
                <div className="cart-item-controls">
                  <div className="quantity-controls">
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      −
                    </button>
                    <span className="quantity-value">{item.quantity}</span>
                    <button
                      className="quantity-btn"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => onRemove(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="cart-item-subtotal">
                <span className="subtotal-label">Subtotal</span>
                <span className="subtotal-value">${item.subtotal.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="cart-summary">
          <div className="summary-row">
            <span className="summary-label">Total Items:</span>
            <span className="summary-value">
              {cart.items.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </div>
          <div className="summary-row total-row">
            <span className="summary-label">Total:</span>
            <span className="summary-value total-value">${cart.total.toFixed(2)}</span>
          </div>
          <button className="checkout-btn" onClick={onCheckout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </section>
  );
}

export default Cart;


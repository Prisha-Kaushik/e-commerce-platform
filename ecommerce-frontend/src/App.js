import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';
import ProductsGrid from './components/ProductsGrid';
import Cart from './components/Cart';
import CheckoutModal from './components/CheckoutModal';
import ReceiptModal from './components/ReceiptModal';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      setProducts(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to load products. Please try again later.');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/cart`);
      setCart(response.data);
    } catch (err) {
      console.error('Error fetching cart:', err);
    }
  };

  const handleAddToCart = async (productId, quantity = 1) => {
    try {
      await axios.post(`${API_BASE_URL}/api/cart`, {
        productId,
        qty: quantity
      });
      await fetchCart();
    } catch (err) {
      setError('Failed to add item to cart');
      console.error('Error adding to cart:', err);
    }
  };

  const handleRemoveFromCart = async (itemId) => {
    try {
      await axios.delete(`${API_BASE_URL}/api/cart/${itemId}`);
      await fetchCart();
    } catch (err) {
      setError('Failed to remove item from cart');
      console.error('Error removing from cart:', err);
    }
  };

  const handleUpdateQuantity = async (itemId, quantity) => {
    if (quantity < 1) {
      handleRemoveFromCart(itemId);
      return;
    }
    try {
      await axios.put(`${API_BASE_URL}/api/cart/${itemId}`, { quantity });
      await fetchCart();
    } catch (err) {
      setError('Failed to update quantity');
      console.error('Error updating quantity:', err);
    }
  };

  const handleCheckout = async (customerData) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/api/checkout`, {
        cartItems: cart.items.map(item => ({
          productId: item.product_id,
          quantity: item.quantity
        })),
        customerName: customerData.name,
        customerEmail: customerData.email
      });
      setReceipt(response.data);
      setShowCheckout(false);
      setShowReceipt(true);
      await fetchCart();
    } catch (err) {
      setError('Failed to process checkout. Please try again.');
      console.error('Error during checkout:', err);
    }
  };

  const handleCloseReceipt = () => {
    setShowReceipt(false);
    setReceipt(null);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🛍️ Vibe Commerce</h1>
        <nav>
          <button 
            className="cart-button"
            onClick={() => setShowCheckout(true)}
            disabled={cart.items.length === 0}
          >
            Cart ({cart.items.length})
          </button>
        </nav>
      </header>

      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>×</button>
        </div>
      )}

      <main className="app-main">
        {loading ? (
          <div className="loading">Loading products...</div>
        ) : (
          <>
            <ProductsGrid 
              products={products} 
              onAddToCart={handleAddToCart}
            />
            <Cart
              cart={cart}
              onRemove={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onCheckout={() => setShowCheckout(true)}
            />
          </>
        )}
      </main>

      {showCheckout && (
        <CheckoutModal
          cart={cart}
          onClose={() => setShowCheckout(false)}
          onSubmit={handleCheckout}
        />
      )}

      {showReceipt && receipt && (
        <ReceiptModal
          receipt={receipt}
          onClose={handleCloseReceipt}
        />
      )}
    </div>
  );
}

export default App;


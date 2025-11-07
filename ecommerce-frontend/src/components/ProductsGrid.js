import React from 'react';
import './ProductsGrid.css';

function ProductsGrid({ products, onAddToCart }) {
  if (products.length === 0) {
    return (
      <section className="products-section">
        <h2>Products</h2>
        <p className="empty-message">No products available</p>
      </section>
    );
  }

  return (
    <section className="products-section">
      <h2>Products</h2>
      <div className="products-grid">
        {products.map(product => (
          <div key={product.id} className="product-card">
            <div className="product-image">
              <img 
                src={product.image || 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=300&h=300&fit=crop'} 
                alt={product.name}
                onError={(e) => {
                  // Fallback to a data URI if image fails to load
                  e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="300" height="300"%3E%3Crect fill="%23ddd" width="300" height="300"/%3E%3Ctext fill="%23999" font-family="sans-serif" font-size="18" dy="10.5" font-weight="bold" x="50%25" y="50%25" text-anchor="middle"%3EProduct%3C/text%3E%3C/svg%3E';
                }}
              />
            </div>
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              {product.description && (
                <p className="product-description">{product.description}</p>
              )}
              <div className="product-footer">
                <span className="product-price">${product.price.toFixed(2)}</span>
                <button
                  className="add-to-cart-btn"
                  onClick={() => onAddToCart(product.id, 1)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default ProductsGrid;


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Database setup
const dbPath = path.join(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

// Initialize database tables
db.serialize(() => {
  // Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT,
    image TEXT
  )`);

  // Cart items table
  db.run(`CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL DEFAULT 1,
    FOREIGN KEY (product_id) REFERENCES products(id)
  )`);

  // Orders table (for checkout history)
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    customer_email TEXT NOT NULL,
    total REAL NOT NULL,
    items TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Insert mock products if table is empty
  db.get('SELECT COUNT(*) as count FROM products', (err, row) => {
    if (err) {
      console.error('Error checking products:', err);
      return;
    }
    if (row.count === 0) {
      const products = [
        { name: 'Wireless Headphones', price: 79.99, description: 'Premium noise-cancelling headphones', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=300&h=300&fit=crop' },
        { name: 'Smart Watch', price: 199.99, description: 'Feature-rich smartwatch with health tracking', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop' },
        { name: 'Laptop Stand', price: 49.99, description: 'Ergonomic aluminum laptop stand', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop' },
        { name: 'Mechanical Keyboard', price: 129.99, description: 'RGB mechanical gaming keyboard', image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=300&fit=crop' },
        { name: 'USB-C Hub', price: 39.99, description: 'Multi-port USB-C hub adapter', image: 'https://images.unsplash.com/photo-1625842268584-8f3296236761?w=300&h=300&fit=crop' },
        { name: 'Wireless Mouse', price: 29.99, description: 'Ergonomic wireless mouse', image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=300&h=300&fit=crop' },
        { name: 'Monitor Stand', price: 59.99, description: 'Adjustable dual monitor stand', image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop' },
        { name: 'Desk Lamp', price: 34.99, description: 'LED desk lamp with adjustable brightness', image: 'https://images.unsplash.com/photo-1507473885765-e6c2c5678e42?w=300&h=300&fit=crop' }
      ];

      const stmt = db.prepare('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)');
      products.forEach(product => {
        stmt.run(product.name, product.price, product.description, product.image);
      });
      stmt.finalize();
      console.log('Mock products inserted');
    }
  });
});

// Helper function to handle database errors
const handleDbError = (res, err, message = 'Database error') => {
  console.error(message, err);
  res.status(500).json({ error: message, details: err.message });
};

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  db.all('SELECT * FROM products ORDER BY id', (err, rows) => {
    if (err) {
      return handleDbError(res, err, 'Failed to fetch products');
    }
    res.json(rows);
  });
});

// POST /api/cart - Add item to cart
app.post('/api/cart', (req, res) => {
  const { productId, qty } = req.body;

  if (!productId || !qty || qty < 1) {
    return res.status(400).json({ error: 'productId and qty (>= 1) are required' });
  }

  // Check if product exists
  db.get('SELECT * FROM products WHERE id = ?', [productId], (err, product) => {
    if (err) {
      return handleDbError(res, err, 'Failed to check product');
    }
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if item already in cart
    db.get('SELECT * FROM cart_items WHERE product_id = ?', [productId], (err, existingItem) => {
      if (err) {
        return handleDbError(res, err, 'Failed to check cart');
      }

      if (existingItem) {
        // Update quantity
        const newQty = existingItem.quantity + qty;
        db.run('UPDATE cart_items SET quantity = ? WHERE product_id = ?', [newQty, productId], function(err) {
          if (err) {
            return handleDbError(res, err, 'Failed to update cart');
          }
          res.json({ message: 'Cart updated', id: existingItem.id, productId, quantity: newQty });
        });
      } else {
        // Insert new item
        db.run('INSERT INTO cart_items (product_id, quantity) VALUES (?, ?)', [productId, qty], function(err) {
          if (err) {
            return handleDbError(res, err, 'Failed to add to cart');
          }
          res.json({ message: 'Item added to cart', id: this.lastID, productId, quantity: qty });
        });
      }
    });
  });
});

// DELETE /api/cart/:id - Remove item from cart
app.delete('/api/cart/:id', (req, res) => {
  const { id } = req.params;

  db.run('DELETE FROM cart_items WHERE id = ?', [id], function(err) {
    if (err) {
      return handleDbError(res, err, 'Failed to remove item');
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Item removed from cart' });
  });
});

// PUT /api/cart/:id - Update cart item quantity
app.put('/api/cart/:id', (req, res) => {
  const { id } = req.params;
  const { quantity } = req.body;

  if (!quantity || quantity < 1) {
    return res.status(400).json({ error: 'quantity (>= 1) is required' });
  }

  db.run('UPDATE cart_items SET quantity = ? WHERE id = ?', [quantity, id], function(err) {
    if (err) {
      return handleDbError(res, err, 'Failed to update cart item');
    }
    if (this.changes === 0) {
      return res.status(404).json({ error: 'Cart item not found' });
    }
    res.json({ message: 'Cart item updated', quantity });
  });
});

// GET /api/cart - Get cart with total
app.get('/api/cart', (req, res) => {
  db.all(`
    SELECT 
      ci.id,
      ci.product_id,
      ci.quantity,
      p.name,
      p.price,
      p.image,
      (ci.quantity * p.price) as subtotal
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    ORDER BY ci.id
  `, (err, items) => {
    if (err) {
      return handleDbError(res, err, 'Failed to fetch cart');
    }

    const total = items.reduce((sum, item) => sum + item.subtotal, 0);
    res.json({ items, total: parseFloat(total.toFixed(2)) });
  });
});

// POST /api/checkout - Process checkout
app.post('/api/checkout', (req, res) => {
  const { cartItems, customerName, customerEmail } = req.body;

  if (!cartItems || !Array.isArray(cartItems) || cartItems.length === 0) {
    return res.status(400).json({ error: 'cartItems array is required' });
  }

  if (!customerName || !customerEmail) {
    return res.status(400).json({ error: 'customerName and customerEmail are required' });
  }

  // Calculate total
  let total = 0;
  const itemsWithDetails = [];

  const processItems = () => {
    let processed = 0;
    cartItems.forEach((item) => {
      db.get('SELECT * FROM products WHERE id = ?', [item.productId], (err, product) => {
        if (err) {
          return handleDbError(res, err, 'Failed to fetch product');
        }
        if (!product) {
          return res.status(404).json({ error: `Product ${item.productId} not found` });
        }

        const subtotal = product.price * item.quantity;
        total += subtotal;
        itemsWithDetails.push({
          productId: product.id,
          name: product.name,
          price: product.price,
          quantity: item.quantity,
          subtotal: parseFloat(subtotal.toFixed(2))
        });

        processed++;
        if (processed === cartItems.length) {
          // Save order to database
          const itemsJson = JSON.stringify(itemsWithDetails);
          db.run(
            'INSERT INTO orders (customer_name, customer_email, total, items) VALUES (?, ?, ?, ?)',
            [customerName, customerEmail, total, itemsJson],
            function(err) {
              if (err) {
                return handleDbError(res, err, 'Failed to save order');
              }

              // Clear cart
              db.run('DELETE FROM cart_items', (err) => {
                if (err) {
                  console.error('Failed to clear cart:', err);
                }

                // Return receipt
                res.json({
                  orderId: this.lastID,
                  customerName,
                  customerEmail,
                  items: itemsWithDetails,
                  total: parseFloat(total.toFixed(2)),
                  timestamp: new Date().toISOString()
                });
              });
            }
          );
        }
      });
    });
  };

  processItems();
});

// Bonus: Fake Store API integration endpoint
app.get('/api/products/sync-fakestore', (req, res) => {
  const https = require('https');
  const url = 'https://fakestoreapi.com/products';
  
  https.get(url, (apiRes) => {
    let data = '';
    
    apiRes.on('data', (chunk) => {
      data += chunk;
    });
    
    apiRes.on('end', () => {
      try {
        const products = JSON.parse(data);
        
        // Clear existing products
        db.run('DELETE FROM products', (err) => {
          if (err) {
            return handleDbError(res, err, 'Failed to clear products');
          }
          
          // Insert Fake Store products
          const stmt = db.prepare('INSERT INTO products (name, price, description, image) VALUES (?, ?, ?, ?)');
          let inserted = 0;
          const totalProducts = products.length;
          
          if (totalProducts === 0) {
            return res.json({ message: 'No products found in Fake Store API', count: 0 });
          }
          
          products.forEach((product) => {
            stmt.run(
              product.title,
              product.price,
              product.description,
              product.image,
              (err) => {
                if (err) {
                  console.error('Error inserting product:', err);
                }
                inserted++;
                
                if (inserted === totalProducts) {
                  stmt.finalize();
                  res.json({ 
                    message: `Successfully synced ${inserted} products from Fake Store API`,
                    count: inserted
                  });
                }
              }
            );
          });
        });
      } catch (parseErr) {
        return handleDbError(res, parseErr, 'Failed to parse Fake Store API response');
      }
    });
  }).on('error', (err) => {
    return handleDbError(res, err, 'Failed to fetch from Fake Store API');
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'E-commerce API is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err);
    } else {
      console.log('Database connection closed');
    }
    process.exit(0);
  });
});


# 🛍️ Vibe Commerce - E-Commerce Shopping Cart

A full-stack shopping cart application built for Vibe Commerce screening. This application demonstrates a complete e-commerce flow with product listing, cart management, and mock checkout functionality.

## 📋 Overview

This project is a basic full-stack shopping cart application that handles:
- Product browsing and display
- Add/remove items from cart
- Cart quantity management
- Total calculations
- Mock checkout process (no real payments)
- Order receipt generation

## 🏗️ Architecture

### Backend (Node.js/Express)
- **Framework**: Express.js
- **Database**: SQLite (lightweight, file-based)
- **API**: RESTful endpoints
- **Port**: 5000 (default)

### Frontend (React)
- **Framework**: React (Create React App)
- **Styling**: Custom CSS with responsive design
- **HTTP Client**: Axios
- **Port**: 3000 (default)

## 🚀 Quick Start

### Prerequisites
- Node.js 14+ and npm
- Git

### Installation & Setup

#### 1. Backend Setup

```bash
cd ecommerce-backend
npm install
npm start
```

The backend API will start on `http://localhost:5000`

For development with auto-reload:
```bash
npm run dev
```

#### 2. Frontend Setup

Open a new terminal:

```bash
cd ecommerce-frontend
npm install
npm start
```

The frontend will start on `http://localhost:3000` and automatically open in your browser.

## 📁 Project Structure

**Note**: This project uses `ecommerce-backend` and `ecommerce-frontend` directories. If you prefer the standard `/backend` and `/frontend` structure, you can rename these directories accordingly.

```
ecommerce-backend/
├── server.js              # Main Express server
├── package.json           # Dependencies
├── database.sqlite        # SQLite database (created on first run)
└── .gitignore

ecommerce-frontend/
├── public/
│   └── index.html
├── src/
│   ├── App.js            # Main app component
│   ├── App.css           # App styles
│   ├── index.js          # Entry point
│   ├── index.css         # Global styles
│   └── components/
│       ├── ProductsGrid.js      # Product listing component
│       ├── ProductsGrid.css
│       ├── Cart.js              # Shopping cart component
│       ├── Cart.css
│       ├── CheckoutModal.js     # Checkout form modal
│       ├── CheckoutModal.css
│       ├── ReceiptModal.js      # Order receipt modal
│       └── ReceiptModal.css
├── package.json
└── .gitignore
```

## 🔌 API Endpoints

### Products
- **GET** `/api/products` - Get all products
  - Returns: Array of product objects with `id`, `name`, `price`, `description`, `image`

- **GET** `/api/products/sync-fakestore` - Sync products from Fake Store API (Bonus)
  - Fetches products from https://fakestoreapi.com/products
  - Replaces existing products in database
  - Returns: Success message with count of synced products

### Cart
- **GET** `/api/cart` - Get cart contents with total
  - Returns: `{ items: [...], total: number }`
  
- **POST** `/api/cart` - Add item to cart
  - Body: `{ productId: number, qty: number }`
  - Returns: Success message with cart item details

- **DELETE** `/api/cart/:id` - Remove item from cart
  - Returns: Success message

- **PUT** `/api/cart/:id` - Update cart item quantity
  - Body: `{ quantity: number }`
  - Returns: Success message

### Checkout
- **POST** `/api/checkout` - Process checkout
  - Body: `{ cartItems: [...], customerName: string, customerEmail: string }`
  - Returns: Receipt object with order details

### Health Check
- **GET** `/health` - API health status

## ✨ Features

### Core Features ✅
- [x] Product grid display with images
- [x] Add items to cart
- [x] Remove items from cart
- [x] Update item quantities
- [x] Real-time cart total calculation
- [x] Checkout form with validation
- [x] Order receipt with order details
- [x] Responsive design (mobile, tablet, desktop)
- [x] Error handling and user feedback

### Bonus Features 🎯
- [x] Database persistence (SQLite)
- [x] Order history storage
- [x] Form validation
- [x] Loading states
- [x] Error messages
- [x] Modern, clean UI design
- [x] Smooth animations and transitions
- [x] Fake Store API integration (sync endpoint available)

## 🎨 UI/UX Features

- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Modern UI**: Clean, gradient-based design with smooth animations
- **User Feedback**: Loading states, error messages, and success confirmations
- **Intuitive Navigation**: Easy-to-use cart and checkout flow
- **Visual Feedback**: Hover effects, transitions, and interactive elements

## 🗄️ Database Schema

### Products Table
```sql
CREATE TABLE products (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  price REAL NOT NULL,
  description TEXT,
  image TEXT
);
```

### Cart Items Table
```sql
CREATE TABLE cart_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  product_id INTEGER NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (product_id) REFERENCES products(id)
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  customer_name TEXT NOT NULL,
  customer_email TEXT NOT NULL,
  total REAL NOT NULL,
  items TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

## 🧪 Testing the Application

1. **Start Backend**: `cd ecommerce-backend && npm start`
2. **Start Frontend**: `cd ecommerce-frontend && npm start`
3. **Browse Products**: View the product grid on the homepage
4. **Add to Cart**: Click "Add to Cart" on any product
5. **View Cart**: Scroll down to see your cart with items and total
6. **Update Quantities**: Use +/- buttons to adjust quantities
7. **Remove Items**: Click "Remove" to delete items
8. **Checkout**: Click "Proceed to Checkout" button
9. **Complete Order**: Fill in name and email, submit
10. **View Receipt**: See order confirmation with receipt details

### Bonus: Using Fake Store API

To sync products from Fake Store API:
```bash
# Make sure backend is running, then:
curl http://localhost:5000/api/products/sync-fakestore
```

Or visit the URL in your browser. This will replace the mock products with real products from Fake Store API.

## 📸 Screenshots

### Product Grid
- Displays all available products in a responsive grid
- Each product shows image, name, description, and price
- "Add to Cart" button for each product

### Shopping Cart
- Lists all cart items with images
- Quantity controls (+/- buttons)
- Remove button for each item
- Real-time subtotal and total calculation
- Sticky summary sidebar (on desktop)

### Checkout Modal
- Order summary preview
- Customer information form (name, email)
- Form validation
- Cancel and submit buttons

### Receipt Modal
- Order confirmation with success icon
- Order ID and timestamp
- Customer information
- Itemized list of purchases
- Total amount highlighted

## 🔧 Configuration

### Backend Port
Change the port in `ecommerce-backend/server.js`:
```javascript
const PORT = process.env.PORT || 5000;
```

### Frontend API URL
Set environment variable or modify `ecommerce-frontend/src/App.js`:
```javascript
const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';
```

## 🐛 Troubleshooting

### Backend Issues
- **Port already in use**: Change PORT in server.js or kill the process using port 5000
- **Database errors**: Delete `database.sqlite` and restart server to recreate
- **CORS errors**: Ensure CORS middleware is enabled (already configured)

### Frontend Issues
- **Cannot connect to API**: Verify backend is running on port 5000
- **Build errors**: Run `npm install` again to ensure all dependencies are installed
- **Port conflicts**: React will prompt to use a different port automatically

## 📝 Notes

- The database is automatically created on first run
- Mock products are seeded automatically if the products table is empty
- Cart persists in database until checkout (then it's cleared)
- Orders are stored in the database for history
- No real payment processing - this is a mock checkout system

## 🚀 Deployment

### Backend Deployment
1. Set `PORT` environment variable
2. Ensure SQLite database file is writable
3. Run `npm start` or use a process manager like PM2

### Frontend Deployment
1. Build the app: `npm run build`
2. Serve the `build` folder using a static file server
3. Set `REACT_APP_API_URL` to your backend URL

### GitHub Deployment
1. Create a new repository
2. Push both `ecommerce-backend` and `ecommerce-frontend` folders
3. Add comprehensive README (this file)
4. Include setup instructions

## 🔮 Future Enhancements

- User authentication and accounts
- Product search and filtering
- Product categories
- Product reviews and ratings
- Wishlist functionality
- Order tracking
- Email notifications
- Payment gateway integration (Stripe, PayPal)
- Admin dashboard for product management
- Image upload for products
- Fake Store API integration for real product data

## 📄 License

MIT License - feel free to use this project for your screening or portfolio.

## 👤 Author

Built for Vibe Commerce screening assignment.

---

**Happy Shopping! 🛒**


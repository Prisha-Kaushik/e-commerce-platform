# 🛍️ E-Commerce Platform

A modern, full-stack e-commerce shopping cart application built with React and Node.js. This project demonstrates a complete e-commerce flow with product browsing, cart management, and checkout functionality.

![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)
![React](https://img.shields.io/badge/React-18.2-blue.svg)
![Express](https://img.shields.io/badge/Express-4.18-lightgrey.svg)
![SQLite](https://img.shields.io/badge/SQLite-3-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## ✨ Features

### Core Functionality
- 🛒 **Shopping Cart Management** - Add, remove, and update items in your cart
- 📦 **Product Catalog** - Browse products with images, descriptions, and prices
- 💰 **Real-time Calculations** - Automatic cart total and subtotal calculations
- ✅ **Checkout Process** - Complete order flow with customer information
- 📄 **Order Receipts** - Generate and display order confirmations
- 💾 **Data Persistence** - SQLite database for products, cart, and orders

### User Experience
- 📱 **Responsive Design** - Works seamlessly on mobile, tablet, and desktop
- 🎨 **Modern UI** - Clean, gradient-based design with smooth animations
- ⚡ **Fast Performance** - Optimized React components and efficient API calls
- 🔔 **User Feedback** - Loading states, error handling, and success messages
- 🎯 **Intuitive Navigation** - Easy-to-use cart and checkout flow

### Developer Features
- 🔄 **RESTful API** - Well-structured backend endpoints
- 🗄️ **Database Integration** - SQLite for lightweight, file-based storage
- 🔌 **CORS Enabled** - Cross-origin resource sharing configured
- 🛠️ **Development Tools** - Hot reload for both frontend and backend
- 📝 **Comprehensive Documentation** - Detailed setup and API docs

## 🛠️ Tech Stack

### Frontend
- **React 18.2** - Modern UI library
- **Axios** - HTTP client for API requests
- **CSS3** - Custom styling with responsive design
- **React Hooks** - Functional components with state management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **SQLite3** - Lightweight, file-based database
- **CORS** - Cross-origin resource sharing middleware
- **Body Parser** - Request body parsing middleware

## 📁 Project Structure

```
ECOMMERCE-PLATFORM/
├── ecommerce-backend/          # Backend API server
│   ├── server.js               # Express server and routes
│   ├── database.sqlite         # SQLite database (auto-created)
│   ├── package.json            # Backend dependencies
│   └── .gitignore
│
├── ecommerce-frontend/         # React frontend application
│   ├── public/                 # Static files
│   ├── src/
│   │   ├── App.js              # Main application component
│   │   ├── App.css             # Application styles
│   │   ├── index.js            # React entry point
│   │   ├── index.css           # Global styles
│   │   └── components/         # React components
│   │       ├── ProductsGrid.js      # Product listing
│   │       ├── ProductsGrid.css
│   │       ├── Cart.js              # Shopping cart
│   │       ├── Cart.css
│   │       ├── CheckoutModal.js     # Checkout form
│   │       ├── CheckoutModal.css
│   │       ├── ReceiptModal.js      # Order receipt
│   │       └── ReceiptModal.css
│   ├── package.json            # Frontend dependencies
│   └── .gitignore
│
└── README.md                   # This file
```

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:
- **Node.js** (version 14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Prisha-Kaushik/e-commerce-platform.git
   cd e-commerce-platform
   ```

2. **Install Backend Dependencies**
   ```bash
   cd ecommerce-backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../ecommerce-frontend
   npm install
   ```

### Running the Application

#### Start the Backend Server

Open a terminal and run:
```bash
cd ecommerce-backend
npm start
```

The backend API will start on `http://localhost:5000` (or port 5001, check your configuration).

For development with auto-reload:
```bash
npm run dev
```

#### Start the Frontend Application

Open a **new terminal** (keep the backend running) and run:
```bash
cd ecommerce-frontend
npm start
```

The frontend will automatically open in your browser at `http://localhost:3000`.

### Verify Installation

1. **Backend Check**: Visit `http://localhost:5000/api/products` in your browser
   - You should see a JSON array of products

2. **Frontend Check**: The app should open automatically at `http://localhost:3000`
   - You should see the product grid and shopping cart interface

## 📡 API Documentation

### Base URL
```
http://localhost:5000
```

### Endpoints

#### Products

**GET `/api/products`**
- Get all available products
- **Response**: Array of product objects
  ```json
  [
    {
      "id": 1,
      "name": "Product Name",
      "price": 29.99,
      "description": "Product description",
      "image": "https://example.com/image.jpg"
    }
  ]
  ```

**GET `/api/products/sync-fakestore`**
- Sync products from Fake Store API
- Replaces existing products in database
- **Response**: Success message with count

#### Cart

**GET `/api/cart`**
- Get current cart contents
- **Response**:
  ```json
  {
    "items": [...],
    "total": 99.99
  }
  ```

**POST `/api/cart`**
- Add item to cart
- **Body**:
  ```json
  {
    "productId": 1,
    "qty": 2
  }
  ```

**PUT `/api/cart/:id`**
- Update cart item quantity
- **Body**:
  ```json
  {
    "quantity": 3
  }
  ```

**DELETE `/api/cart/:id`**
- Remove item from cart

#### Checkout

**POST `/api/checkout`**
- Process checkout and create order
- **Body**:
  ```json
  {
    "cartItems": [...],
    "customerName": "John Doe",
    "customerEmail": "john@example.com"
  }
  ```
- **Response**: Order receipt object

#### Health Check

**GET `/health`**
- API health status check

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

## 📸 Screenshots
### Product Grid
- Responsive grid layout displaying all available products
- Each product card shows image, name, description, and price
- "Add to Cart" button for each product
<img width="2940" height="1584" alt="image" src="https://github.com/user-attachments/assets/781c1188-db3d-4bf0-a5ea-5c0a6b5aa5f8" />

### Shopping Cart
- Real-time cart updates
- Quantity controls with +/- buttons
- Remove item functionality
- Automatic total calculation
- Sticky cart summary on desktop
<img width="2940" height="934" alt="image" src="https://github.com/user-attachments/assets/b7697969-b578-4f1f-bdbe-ae7134117506" />

### Checkout Modal
- Order summary preview
- Customer information form (name, email)
- Form validation
- Cancel and submit options
<img width="2940" height="1591" alt="image" src="https://github.com/user-attachments/assets/0049eda5-05ff-465e-94d6-ec7f4954c65e" />

### Receipt Modal
- Order confirmation with success indicator
- Order ID and timestamp
- Customer information display
- Itemized purchase list
- Total amount highlighted
<img width="2940" height="1586" alt="image" src="https://github.com/user-attachments/assets/7b641f2e-1a02-4cbf-9818-e21043725efe" />

## 🚢 Deployment

### Backend Deployment

1. Set environment variables:
   ```bash
   export PORT=5000
   ```

2. Ensure SQLite database file is writable

3. Start the server:
   ```bash
   npm start
   ```

   Or use a process manager like PM2:
   ```bash
   pm2 start server.js --name ecommerce-backend
   ```

### Frontend Deployment

1. Build the production bundle:
   ```bash
   cd ecommerce-frontend
   npm run build
   ```

2. Set the API URL:
   ```bash
   export REACT_APP_API_URL=https://your-backend-url.com
   ```

3. Serve the `build` folder using a static file server:
   - **Netlify**: Drag and drop the `build` folder
   - **Vercel**: Connect your repository and set build command to `npm run build`
   - **AWS S3**: Upload `build` folder contents to an S3 bucket

### Environment Variables

**Backend:**
- `PORT` - Server port (default: 5000)

**Frontend:**
- `REACT_APP_API_URL` - Backend API URL (default: http://localhost:5000)

## 🐛 Troubleshooting

### Port Already in Use
- **Backend**: Change `PORT` in `server.js` or kill the process using the port
- **Frontend**: React will automatically prompt to use a different port

### Cannot Connect to API
- Verify backend is running on the correct port
- Check CORS configuration in backend
- Ensure `REACT_APP_API_URL` matches your backend URL

### Database Errors
- Delete `database.sqlite` and restart the server (it will recreate)
- Ensure the backend has write permissions in the directory

### Installation Issues
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 14 or higher

## 🔮 Future Enhancements

- [ ] User authentication and accounts
- [ ] Product search and filtering
- [ ] Product categories and tags
- [ ] Product reviews and ratings
- [ ] Wishlist functionality
- [ ] Order tracking and history
- [ ] Email notifications
- [ ] Payment gateway integration (Stripe, PayPal)
- [ ] Admin dashboard for product management
- [ ] Image upload for products
- [ ] Multi-currency support
- [ ] Inventory management
- [ ] Discount codes and promotions

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Prisha Kaushik**

- GitHub: [@Prisha-Kaushik](https://github.com/Prisha-Kaushik)
- Project Link: [https://github.com/Prisha-Kaushik/e-commerce-platform](https://github.com/Prisha-Kaushik/e-commerce-platform)
- Loom Video Demo: https://www.loom.com/share/8fef155a89d14aa0912aaf43a1d689b7
  

## 🙏 Acknowledgments

- [Fake Store API](https://fakestoreapi.com/) for product data
- React and Express.js communities for excellent documentation
- All contributors and users of this project

---

**Happy Shopping! 🛒**

If you find this project helpful, please consider giving it a ⭐ on GitHub!


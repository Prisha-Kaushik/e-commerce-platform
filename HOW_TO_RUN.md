# 🚀 How to Run the E-Commerce Cart Project

## Prerequisites

Make sure you have installed:
- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

Check if you have them installed:
```bash
node --version
npm --version
```

If not installed, download from: https://nodejs.org/

---

## Step-by-Step Setup

### Step 1: Install Backend Dependencies

Open a terminal and navigate to the backend directory:

```bash
cd ecommerce-backend
npm install
```

This will install all required packages (Express, SQLite, CORS, etc.)

### Step 2: Start the Backend Server

While still in the `ecommerce-backend` directory:

```bash
npm start
```

You should see:
```
Server running on http://localhost:5000
```

**Keep this terminal window open** - the backend needs to keep running.

### Step 3: Install Frontend Dependencies

Open a **NEW terminal window** (keep the backend running) and navigate to the frontend directory:

```bash
cd ecommerce-frontend
npm install
```

This will install React and all frontend dependencies.

### Step 4: Start the Frontend Application

While in the `ecommerce-frontend` directory:

```bash
npm start
```

This will:
- Start the React development server
- Automatically open your browser to `http://localhost:3000`
- Show the shopping cart application

---

## ✅ Verify Everything is Working

1. **Backend Check**: Visit `http://localhost:5000/api/products` in your browser
   - You should see a JSON array of products

2. **Frontend Check**: The app should open automatically at `http://localhost:3000`
   - You should see "Vibe Commerce" header
   - Product grid with items
   - Shopping cart section below

---

## 🎯 Quick Commands Summary

**Terminal 1 (Backend):**
```bash
cd ecommerce-backend
npm install    # Only needed first time
npm start
```

**Terminal 2 (Frontend):**
```bash
cd ecommerce-frontend
npm install    # Only needed first time
npm start
```

---

## 🐛 Troubleshooting

### Port Already in Use

**Backend (port 5000):**
- Kill the process using port 5000, or
- Change the port in `ecommerce-backend/server.js` (line 8)

**Frontend (port 3000):**
- React will automatically ask to use a different port (like 3001)
- Click "Y" to accept

### Cannot Connect to API

- Make sure backend is running first
- Check that backend shows "Server running on http://localhost:5000"
- Verify frontend is trying to connect to `http://localhost:5000`

### Database Errors

- Delete `ecommerce-backend/database.sqlite` file
- Restart the backend server (it will recreate the database)

### npm install Fails

- Make sure you have Node.js installed: `node --version`
- Try deleting `node_modules` folder and `package-lock.json`, then run `npm install` again
- Check your internet connection

---

## 🧪 Test the Application

1. **Add Products**: Click "Add to Cart" on any product
2. **View Cart**: Scroll down to see your cart
3. **Update Quantity**: Use +/- buttons
4. **Remove Items**: Click "Remove" button
5. **Checkout**: Click "Proceed to Checkout" or "Cart" button
6. **Complete Order**: Fill in name and email, submit
7. **View Receipt**: See your order confirmation!

---

## 💡 Development Mode

For auto-reload during development:

**Backend:**
```bash
cd ecommerce-backend
npm run dev    # Uses nodemon for auto-restart
```

**Frontend:**
- Already auto-reloads when you run `npm start`
- Changes to code will refresh the browser automatically

---

## 🎉 You're All Set!

The application should now be running. If you encounter any issues, check the terminal output for error messages.


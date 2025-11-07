# Fix: Port 5000 Already in Use

## Quick Fix

Run these commands in your terminal:

```bash
# Kill all processes using port 5000
lsof -ti:5000 | xargs kill -9

# Wait a second
sleep 1

# Now start your server
cd ecommerce-backend
npm start
```

## Alternative: Use a Different Port

If port 5000 keeps getting used, change the port in `server.js`:

1. Open `ecommerce-backend/server.js`
2. Find line 8: `const PORT = process.env.PORT || 5000;`
3. Change to: `const PORT = process.env.PORT || 5001;`
4. Save and run `npm start` again

Then update your frontend to use port 5001, or set an environment variable.

## One-Line Solution

```bash
cd ecommerce-backend && lsof -ti:5000 | xargs kill -9 2>/dev/null; npm start
```


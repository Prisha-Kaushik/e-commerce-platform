# Backend Error Troubleshooting Guide

## Common Backend Errors & Solutions

### 1. **Port Already in Use (EADDRINUSE)**
**Error:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Find and kill the process using port 5000
# On Mac/Linux:
lsof -ti:5000 | xargs kill -9

# Or change the port in server.js (line 8)
# Change: const PORT = process.env.PORT || 5000;
# To: const PORT = process.env.PORT || 5001;
```

### 2. **Module Not Found**
**Error:** `Cannot find module 'express'` or similar

**Solution:**
```bash
cd ecommerce-backend
rm -rf node_modules package-lock.json
npm install
```

### 3. **Database Permission Error**
**Error:** `SQLITE_CANTOPEN` or permission denied

**Solution:**
```bash
cd ecommerce-backend
rm database.sqlite
npm start
# Database will be recreated automatically
```

### 4. **Node Version Too Old**
**Error:** Syntax errors or `require` issues

**Solution:**
```bash
# Check Node version
node --version
# Should be 14 or higher

# If not, update Node.js from https://nodejs.org/
```

### 5. **Missing Dependencies**
**Error:** Any module-related errors

**Solution:**
```bash
cd ecommerce-backend
npm install express cors sqlite3 body-parser
```

### 6. **Database Locked Error**
**Error:** `SQLITE_BUSY: database is locked`

**Solution:**
- Make sure only one instance of the server is running
- Kill all node processes: `pkill node`
- Restart the server

---

## Quick Fix Commands

Run these commands in order:

```bash
# 1. Navigate to backend
cd ecommerce-backend

# 2. Clean install
rm -rf node_modules package-lock.json
npm install

# 3. Remove old database (if exists)
rm -f database.sqlite

# 4. Kill any existing processes on port 5000
lsof -ti:5000 | xargs kill -9 2>/dev/null || true

# 5. Start server
npm start
```

---

## Check What Error You're Getting

Please share the **exact error message** you see. Common formats:

1. Copy the full error from your terminal
2. Look for lines starting with "Error:" or "Error:"
3. Check if it's a module error, port error, or database error

---

## Manual Test

Try running the server directly to see the error:

```bash
cd ecommerce-backend
node server.js
```

This will show you the exact error message.


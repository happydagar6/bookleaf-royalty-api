# BookLeaf Author Royalty System API

## 🚀 Deployed URL
https://your-app-name.onrender.com

*(Update this with your actual Render URL after deployment)*

## 📚 Tech Stack & Rationale
**Node.js with Express** - Chosen for its simplicity, performance, and large ecosystem. Express provides minimal overhead and makes building REST APIs straightforward and maintainable.

**In-memory storage (JavaScript objects)** - Using simple arrays and objects for data persistence as required by the assignment specifications.

## 🎯 API Endpoints

### 1. GET /authors
Returns list of all authors with calculated earnings and balance.
```json
[
  {
    "id": 1,
    "name": "Priya Sharma",
    "total_earnings": 3825,
    "current_balance": 3825
  }
]
```

### 2. GET /authors/:id
Returns detailed author information including books.
```json
{
  "id": 1,
  "name": "Priya Sharma",
  "email": "priya@email.com",
  "current_balance": 3825,
  "total_earnings": 3825,
  "total_books": 2,
  "books": [...]
}
```

### 3. GET /authors/:id/sales
Returns all sales for an author's books (sorted newest first).

### 4. POST /withdrawals
Creates a withdrawal request with validation.
**Request:**
```json
{
  "author_id": 1,
  "amount": 1000
}
```
**Validations:**
- Minimum ₹500
- Cannot exceed current balance
- Author must exist

### 5. GET /authors/:id/withdrawals
Returns withdrawal history for an author (sorted newest first).

## ✅ Verified Calculations
- **Priya Sharma**: ₹3,825 (Silent River: 65×₹45 + Midnight: 15×₹60)
- **Rahul Verma**: ₹9,975 (Code&Coffee: 105×₹75 + Startup: 30×₹50 + Poetry: 20×₹30)
- **Anita Desai**: ₹400 (Garden: 10×₹40)

## 📝 Assumptions Made
1. All monetary values are in Indian Rupees (₹)
2. Withdrawals are immediately deducted from current_balance with "pending" status
3. Sales data is pre-seeded and static (no POST endpoints for adding sales)
4. IDs are sequential integers starting from 1
5. CORS enabled for all origins to support automated testing
6. No authentication/authorization required for this MVP

## ⏱️ Time Spent
Approximately **4 hours** total:
- Backend implementation & logic: 2 hours
- Testing calculations & validation: 1 hour
- Deployment & documentation: 1 hour

## 🛠️ Local Development

```bash
# Install dependencies
pnpm install

# Run development server (with auto-reload)
pnpm run dev

# Run production server
pnpm start
```

Server runs on: http://localhost:3000

## 🌐 Deployment Instructions (Render)

### Prerequisites
- GitHub account
- Render account (free tier)

### Steps

1. **Initialize Git Repository**
```bash
git init
git add .
git commit -m "Initial commit: BookLeaf Royalty API"
```

2. **Push to GitHub**
```bash
# Create new repo on GitHub: bookleaf-royalty-api
git remote add origin https://github.com/YOUR_USERNAME/bookleaf-royalty-api.git
git branch -M main
git push -u origin main
```

3. **Deploy on Render**
- Go to https://render.com and sign up
- Click "New +" → "Web Service"
- Connect your GitHub repository
- Configure:
  - **Name**: bookleaf-royalty-api
  - **Environment**: Node
  - **Build Command**: `pnpm install`
  - **Start Command**: `node src/index.js`
  - **Plan**: Free
- Click "Create Web Service"
- Wait 5-10 minutes for deployment

4. **Verify Deployment**
- Visit: `https://your-app-name.onrender.com/authors`
- Should see JSON list of authors with balances

5. **Update README**
- Replace **REPLACE_WITH_YOUR_RENDER_URL** with your actual Render URL

### Important Notes
- Free Render apps sleep after 15 minutes of inactivity
- First request after sleeping takes ~30-50 seconds (this is normal)
- The automated testing tool will handle this delay

## 📧 Submission Checklist
- [ ] Deployed URL (Render)
- [ ] GitHub repository link
- [ ] README updated with deployed URL
- [ ] All endpoints tested and working
- [ ] Calculations verified (Priya=₹3,825, Rahul=₹9,975, Anita=₹400)

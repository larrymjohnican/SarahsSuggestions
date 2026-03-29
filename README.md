# 📚🌙 Sarah's Suggestions

A cozy book review and recommendation site built for readers who love a good story.

**Live site:** [sarahssuggestions.com](https://sarahssuggestions.com)

---

## What It Does

- Browse curated book recommendations with cover art, ratings, and reviews
- Filter books by genre
- Create an account and log in with email verification
- Affiliate links to Amazon and Bookshop.org

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React + Vite + Tailwind CSS |
| Backend | Node.js + Express |
| Database | MongoDB Atlas |
| Auth | JWT (access + refresh tokens) + email verification |
| Email | Resend API |
| Hosting | Vercel (frontend + backend) |
| Domain | Porkbun → sarahssuggestions.com |

---

## Project Structure

```
SarahsSuggestions/
├── frontend/          # React app (Vite)
│   ├── src/
│   │   ├── components/   # Navbar, BookCard, Footer, etc.
│   │   ├── pages/        # Landing, Home, BookSuggestions, Reviews, Verify
│   │   ├── data/         # books.js (book data)
│   │   └── assets/       # logo.svg
│   └── vercel.json
│
└── backend/           # Express API
    ├── models/        # User.js, Note.js
    ├── routes/        # auth.js, notes.js
    ├── middleware/    # auth.js (JWT verification)
    ├── server.js
    └── vercel.json
```

---

## Local Development

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (or local MongoDB)

### Backend

```bash
cd backend
npm install
```

Create a `.env` file:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
JWT_REFRESH_SECRET=your_refresh_secret
RESEND_API_KEY=your_resend_api_key
PORT=8000
```

```bash
npm start
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---

## Environment Variables

### Backend (set in Vercel)
| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret for access tokens |
| `JWT_REFRESH_SECRET` | Secret for refresh tokens |
| `RESEND_API_KEY` | Resend API key for verification emails |

### Frontend (`.env.production`)
| Variable | Description |
|----------|-------------|
| `VITE_API_URL` | Backend API URL |

---

## Deployment

Both frontend and backend are deployed on Vercel under the `larrymjohnicans-projects` team.

- **Frontend:** https://sarahssuggestions.com
- **Backend:** https://backend-kappa-blue-53.vercel.app

Pushes to `main` auto-deploy via Vercel's GitHub integration.

---

## Affiliate Disclosure

This site contains Amazon affiliate links. As an Amazon Associate, Sarah earns from qualifying purchases. Affiliate tag: `sarahssugge0e-20`.

---

*Built with 💜 for Sarah.*

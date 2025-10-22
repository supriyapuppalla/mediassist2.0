# MediAssist MERN (Generated Scaffold)

This repository is a converted MERN scaffold of the MediAssist project with:
- Node + Express + Mongoose backend
- JWT authentication (register / login)
- React + Vite frontend with Tailwind CSS
- Firebase placeholders for notifications
- Green, professional UI theme

How to run (development)
1. Install server deps:
   ```bash
   cd server
   npm install
   ```
2. Install client deps:
   ```bash
   cd ../client
   npm install
   ```
3. Create `.env` in `server` from `.env.example` and set `MONGODB_URI` and `JWT_SECRET`.
4. Start server and client in two terminals:
   ```bash
   # server
   cd server
   npm run dev
   # client
   cd ../client
   npm run dev
   ```
5. Use `/api/auth/register` to create accounts or run seed:
   ```bash
   cd server
   npm run seed
   ```

Production
- Build client: `cd client && npm run build`
- Start server with `NODE_ENV=production node server/index.js`
- Server will serve the client from `client/dist`

Notes
- Firebase admin integration requires a service account JSON and setting FIREBASE_SERVICE_ACCOUNT_JSON env var.
- This scaffold focuses on essential features and a polished UI. Expand models/controllers/pages as needed.
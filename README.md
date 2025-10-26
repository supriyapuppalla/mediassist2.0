# MediAssist — Handoff README

This README explains how to run, seed, test and package the project locally from the feature/mediassist-fixes branch.

Prerequisites
- Node.js 18+ and npm (or pnpm)
- MongoDB (local or a connection string)
- Git

Clone and checkout branch
```bash
git clone https://github.com/supriyapuppalla/mediassist2.0.git
cd mediassist2.0
git fetch origin
git checkout feature/mediassist-fixes
```

Environment files
- Copy example env and update values (server/.env must contain MONGO_URI and JWT_SECRET).
Create a file `server/.env` with the content from `.env.example` (see .env.example in this repo or below) and set:
- MONGO_URI — your MongoDB connection string
- JWT_SECRET — random secret for JWT tokens
- PORT — optional (defaults to 8080)

Install dependencies
```bash
# from repo root
cd server
npm install
cd ../client
npm install
cd ..
```

Seed database
```bash
# from server directory
cd server
npm run seed
# or: node seed.js
# The seed script will create test accounts and sample data (caretaker, patient, reminders, appointments, expiry, and possibly health tips)
```

Run in development (server + client)
```bash
# server (dev)
cd server
npm run dev      # nodemon index.js

# in a separate terminal
cd client
npm run dev      # starts Vite dev server (default port used in CORS: 5174)
```

Build frontend and prepare ZIP
```bash
# build frontend
cd client
npm run build    # creates dist/

# package project into a zip (exclude node_modules)
cd ..
zip -r mediassist-final.zip . -x "node_modules/*" -x "server/node_modules/*" -x "client/node_modules/*" -x ".git/*"
```

Seed/test accounts (expected from seed)
- Caretaker: caretaker@example.com / Test1234
- Patient: patient@example.com / Test1234

Verify API endpoints (examples)
- Login (get JWT):
  POST http://localhost:8080/api/auth/login
  Body (JSON): { "email": "caretaker@example.com", "password": "Test1234" }

- Create reminder (caretaker):
  POST http://localhost:8080/api/reminders
  Headers: Authorization: Bearer <JWT>
  Body (example):
  {
    "patientId": "<patientMongoId>",
    "title": "Take insulin",
    "when": "2025-10-23T09:00:00.000Z",
    "notes": "Before breakfast"
  }

- Get patient reminders (patient or query by patient id):
  GET http://localhost:8080/api/reminders?patientId=<patientMongoId>

- Create appointment (caretaker):
  POST http://localhost:8080/api/appointments
  Headers: Authorization: Bearer <JWT>
  Body:
  {
    "patientId":"<patientMongoId>",
    "date":"2025-10-24T11:00:00.000Z",
    "doctor":"Dr. Smith",
    "notes":"Follow up"
  }

- Expiry tracker items (caretaker):
  POST http://localhost:8080/api/expiry
  Body:
  {
    "patientId":"<patientMongoId>",
    "medicine":"Atorvastatin",
    "expiryDate":"2026-01-01"
  }

- Emergency event (patient triggers):
  POST http://localhost:8080/api/emergency
  Body:
  {
    "patientId":"<patientMongoId>",
    "location":"12.34,56.78",
    "notes":"Fainted"
  }
  Expected: creates timestamped event visible to caretakers via /api/emergency or /api/patients/:id/emergencies

How to locate patient id quickly
- After running the seed script, check server logs or query:
  GET http://localhost:8080/api/patients
  or check the MongoDB `patients` collection to find the seeded patient's _id.

Notes & common fixes
- CORS: server currently allows origin http://localhost:5174 (Vite default). If your client runs on a different port, update server/index.js CORS origin or set environment variable.
- If seed fails, run `node seed.js` manually and inspect console error for missing MONGO_URI or connection issues.
- If JWT login fails, confirm JWT_SECRET in server/.env matches any expected value the client may expect (client should use returned token).

If you want me to finish the remaining items (dashboard wiring, emergency polishing and UI polish), tell me and I’ll resume work.
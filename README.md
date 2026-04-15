# HirePrep AI

A full-stack app that analyzes your resume + a target job description and generates an AI-powered **interview plan** (technical questions, behavioral questions, and a preparation roadmap). It also tracks your generated reports and can generate a downloadable resume PDF.

## Tech stack

- **Frontend**: React + Vite, SCSS, Axios, React Router
- **Backend**: Node.js (Express), MongoDB (Mongoose), JWT auth via **HTTP-only cookies**
- **AI**: Google Gemini (`@google/genai`)

## Monorepo structure

- `frontend/` – Vite React client (runs on `http://localhost:5173`)
- `backend/` – Express API (runs on `http://localhost:3000`)

## Prerequisites

- Node.js 18+ (recommended)
- MongoDB connection string (Atlas or local)

## Environment variables

### Backend (`backend/.env`)

Create `backend/.env` (you can copy `backend/.env.example`) and set:

- **`MONGO_URI`**: MongoDB connection string
- **`JWT_SECRET`**: secret used to sign JWTs
- **`GEMINI_API_KEY`**: Gemini API key
- **`FRONTEND_URL`**: the allowed frontend origin for CORS (example: `http://localhost:5173`)

### Frontend (`frontend/.env`)

Create `frontend/.env` (you can copy `frontend/.env.example`) and set:

- **`VITE_BACKEND_URL`**: backend base URL (example: `http://localhost:3000`)

## Install & run (local development)

### 1) Start the backend

```bash
cd backend
npm install
npm run server
```

Backend will start on **`http://localhost:3000`**.

### 2) Start the frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend will start on **`http://localhost:5173`**.

## How authentication works

- The backend sets a JWT in an **HTTP-only cookie** named `token`.
- The frontend uses Axios with `withCredentials: true`, so cookies are sent with API requests.

## Common production notes (CORS + cookies)

Because auth uses cookies, production hosting needs correct CORS + cookie settings:

- **CORS**: `backend/src/app.js` uses `FRONTEND_URL` as the allowed origin and enables `credentials: true`.
  - In production, set `FRONTEND_URL` to your deployed frontend URL (example: `https://your-app.vercel.app`).
- **Cookies**: the auth cookie is currently set with `secure: true` and `sameSite: "None"` in `backend/src/controllers/auth.controller.js`.
  - `secure: true` means the cookie will only be stored/sent over **HTTPS**. For local development on plain `http://localhost`, you may need to adjust cookie options if you want login to persist.
  - If frontend and backend are on different domains in production, `SameSite=None` is required (and also requires `Secure`).

## API (high level)

- `POST /api/auth/register` – register
- `POST /api/auth/login` – login (sets cookie)
- `GET /api/auth/logout` – logout (clears cookie)
- `GET /api/auth/get-me` – current user (requires cookie)
- `POST /api/interview/` – generate interview report (requires auth; accepts resume upload)
- `GET /api/interview/` – list reports (requires auth)
- `GET /api/interview/report/:interviewId` – get report by id (requires auth)
- `POST /api/interview/resume/pdf/:interviewReportId` – generate resume PDF (requires auth)

<img width="960" height="412" alt="Register Page" src="https://github.com/user-attachments/assets/c4a633cb-2bc9-4ef7-b1bc-4d856f3cdb51" />
<img width="847" height="540" alt="Home Page" src="https://github.com/user-attachments/assets/5e05a35d-3c23-4796-9b6f-91f4fcc19a08" />
<img width="960" height="540" alt="Report Page" src="https://github.com/user-attachments/assets/5ee53f27-2a6d-4ee5-9ebe-03d80206fa12" />


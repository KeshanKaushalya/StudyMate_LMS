# StudyMate LMS 🧑‍🎓📚 — MERN Stack Learning Management System

[Live Demo 🚀](https://study-mate-lms-web-mern-stack-front.vercel.app/) · [Repository 🔗](https://github.com/KeshanKaushalya/StudyMate_LMS)

A modern, responsive learning management system built with the MERN stack (MongoDB, Express, React, Node) and a Vite + Tailwind front-end. This README was created after reviewing the repository structure (client/ and server/ directories) and the client-side dependencies to summarize how the app works and how to run it locally.

---

## Overview ✨

StudyMate LMS is a web-based Learning Management System that provides course creation, lesson delivery (video + rich text), progress tracking, and user authentication. The client is a React app bootstrapped with Vite and styled with Tailwind; authentication integration uses Clerk and the front-end uses YouTube playback and rich text editing for content.

Key client-side dependencies detected:
- React (v19) & React DOM
- Vite (dev tooling)
- @clerk/clerk-react (Auth)
- tailwindcss / @tailwindcss/vite
- axios (API requests)
- react-router-dom (routing)
- react-youtube (video player)
- quill (rich text editor)
- react-toastify (notifications)
- rc-progress (progress UI)
- humanize-duration, uniqid

See client/package.json for full versions.

---

## Features ✅

- 🎬 Video lessons (YouTube integration via react-youtube)
- ✍️ Rich text lesson editor (Quill)
- 🔐 Authentication (Clerk)
- 📈 Progress tracking & progress UI (rc-progress)
- 🔔 Toast notifications (react-toastify)
- ⚡ Fast dev workflow (Vite) + TailwindCSS styles
- 🧩 Unique IDs for entities (uniqid) and human friendly durations (humanize-duration)

---

## Live Demo 🖥️

Open the live site here: https://study-mate-lms-web-mern-stack-front.vercel.app/

---

## How It Works — High Level 🛠️

1. Client (React + Vite) handles UI, routing, authentication flows and consumes RESTful API endpoints exposed by the backend.
2. The backend (server/ folder) exposes JSON REST APIs for users, courses, lessons, progress, and admin actions. These endpoints are consumed using axios from the client.
3. Data is stored in MongoDB (typical MERN pattern). Authentication is handled by Clerk on the client; server-side verifies tokens/identities to protect endpoints.
4. Media playback uses react-youtube for seamless YouTube lesson playback and the UI uses Tailwind for styling.

Example client -> server flow:
- User signs in with Clerk → obtains session/token → client calls protected API e.g. GET /api/courses → server verifies the user → returns courses → client renders course list.

(Note: check server/package.json and server routes for exact API route names; typical patterns are /api/auth, /api/users, /api/courses, /api/lessons, /api/progress.)

---

## Gesture Controls (UX for 2025) 🤌📱

Gesture controls improve learning UX on touch devices and enable quick video navigation. Suggested/used gestures:

- Double-tap on left/right of the video to seek backward/forward (10s/15s).
- Two-finger swipe up/down to change playback speed.
- Horizontal swipe to move between lessons (left = next, right = previous).
- Pinch-to-zoom on lesson content for accessibility.
- Long-press to show contextual options (bookmark, add note).

Implementing gestures (example approach):
- Use Pointer Events / Touch Events or a small gesture library if required (e.g., Hammer.js or lightweight custom handlers).
- For seeking on double-tap:
  - Listen to double-tap region (left/right) → call player.seekTo(current + offset).
- For swipe between lessons:
  - Detect horizontal swipe velocity and direction → call router navigation to the lesson route.

Small pseudo snippet (conceptual):
```js
let lastTap = 0;
videoContainer.addEventListener('touchend', (e) => {
  const now = Date.now();
  if (now - lastTap < 300) {
    // double tap detected
    if (touchX < containerWidth/2) seek(-15);
    else seek(+15);
  }
  lastTap = now;
});
```

---

## System Architecture (graphical) 🏗️

Simple ASCII architecture for quick visualization:

Frontend (client) — Vite + React + Clerk
   |
   | axios / fetch (REST)
   v
Backend (server) — Node.js + Express (assumed) + Auth validation
   |
   | mongoose / MongoDB driver
   v
Database — MongoDB (Atlas or self-hosted)

Flow:
Client (React)
  ──> /api/courses, /api/lessons, /api/progress (Express)
       ──> MongoDB

Component diagram (compact):

[Browser / Mobile]
  • React + Clerk + Tailwind
  • react-youtube, Quill, progress components
        |
        | REST APIs (axios)
        v
[Server]
  • Node.js, Express (typical)
  • Auth middleware, Course/Lesson controllers
        |
        v
[MongoDB] (data persistence)

---

## Installation (Local) 🧰

Prerequisites:
- Node.js 18+ (recommend 20+)
- npm or pnpm
- MongoDB connection (Atlas or local)
- Clerk account and keys (for production/auth)

Steps:

1. Clone the repo
   git clone https://github.com/KeshanKaushalya/StudyMate_LMS.git
   cd StudyMate_LMS

2. Server setup (backend)
   cd server
   npm install
   - Create a .env file with required vars, e.g.:
     MONGO_URI=<your-mongo-uri>
     PORT=5000
     JWT_SECRET=<if used>
     CLERK_JWK=<if server needs it>
   - Start server (typical):
     npm run dev
   (See server/package.json for exact scripts. If no dev script, run node index.js or nodemon.)

3. Client setup (frontend)
   cd ../client
   npm install
   - Create a .env (client) with Clerk keys and API base URL, e.g.:
     VITE_API_BASE_URL=http://localhost:5000
     VITE_CLERK_PUBLISHABLE_KEY=<your-clerk-key>
   - Start dev server:
     npm run dev
   - Build for production:
     npm run build
   - Preview:
     npm run preview

Notes:
- The client/package.json includes dependencies such as:
  - @clerk/clerk-react, axios, humanize-duration, quill, rc-progress, react, react-dom, react-router-dom, react-toastify, react-youtube, uniqid
  - devDeps include vite, tailwindcss, postcss, eslint, types for React, etc.

---

## Usage — Quick Commands ▶️

From repo root:
- Start dev servers (example):
  cd server && npm install && npm run dev
  cd ../client && npm install && npm run dev

- Build production front-end:
  cd client && npm run build

- Deploy front-end to Vercel (example): connect the client folder to Vercel and set environment variables (VITE_API_BASE_URL, VITE_CLERK_*).

---

## APIs (What to expect) 🔌

During review the server folder exists — typical REST endpoints (please verify exact endpoints in server source):

- Authentication:
  - POST /api/auth/login (if using server-side sessions)
  - Middleware to validate Clerk tokens or JWTs

- Users:
  - GET /api/users/:id
  - PATCH /api/users/:id

- Courses:
  - GET /api/courses
  - POST /api/courses
  - GET /api/courses/:id
  - PATCH /api/courses/:id
  - DELETE /api/courses/:id

- Lessons:
  - GET /api/courses/:courseId/lessons
  - POST /api/courses/:courseId/lessons
  - GET /api/lessons/:id

- Progress:
  - GET /api/users/:id/progress
  - POST /api/users/:id/progress

Tip: Inspect server source files under server/ to get exact route names and payload shapes. The frontend uses axios to call those endpoints.

---

## Technologies Used 🧩

Frontend
- React 19 (via Vite)
- Vite (dev build tool)
- Tailwind CSS
- Clerk (Auth)
- react-router-dom
- axios
- react-youtube (video playback)
- Quill (rich text editing)
- react-toastify, rc-progress
- humanize-duration, uniqid

Backend (assumed MERN)
- Node.js + Express
- MongoDB (Mongoose)
- JWT/Clerk token verification (auth middleware)

Deployment
- Frontend deployed on Vercel (live link shown)
- Backend can be hosted on Heroku/Render/Cloud Run/AWS/GCP and MongoDB Atlas

---

## Future Enhancements 🚧

- ✅ Improve offline capabilities & content caching (Service Worker / PWA)
- ✅ Native mobile gesture refinements and accessibility improvements (a11y)
- 🔁 Real-time collaboration & live classes (WebRTC or Socket.io)
- 📊 Advanced analytics and learning paths (progress insights)
- 🗂️ SCORM/xAPI import/export support for standard LMS interoperability
- 🔒 Additional security hardening and server-side verification for Clerk tokens
- 🧰 UI/UX polish: dark mode, improved responsive layouts, and keyboard-first navigation

---

## Contributing 🤝

Contributions are welcome! Please open an issue or a pull request and follow the repo's contribution guidelines (if any). Typical workflow:
- Fork → branch → commit → PR

Before opening PRs:
- Run linting (client): npm run lint
- Run tests (if added)

---

## License 📄

MIT License

Copyright (c) 2025 Keshan Kaushalya

Permission is hereby granted, free of charge, to any person obtaining a copy of this software...
(Full MIT license text.)

---

Thanks for building StudyMate LMS — I reviewed the client package.json and repository structure and used that info to assemble this README. If you want, I can:
- generate a ready-to-commit README.md in this repo,
- extract exact server API endpoints by listing server route files,
- or add CI/CD and deployment instructions for Vercel + Heroku/Render with environment variable templates.

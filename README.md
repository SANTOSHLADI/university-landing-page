# University Landing Page Project

A full-stack web application for university admissions with landing pages and API backend.

## Features
- 2 University Landing Pages (Stanford & MIT)
- RESTful API for university data, courses, and fees
- Lead form with Pipedream integration
- Responsive design with Tailwind CSS

## Tech Stack
- Frontend: HTML, Tailwind CSS, JavaScript
- Backend: Node.js, Express
- Deployment: Vercel (Frontend) + Render (Backend)

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
Open `frontend/university1/index.html` in browser with Live Server

## API Endpoints
- GET `/api/university/:id` - Get university details
- GET `/api/courses/:universityId` - Get courses
- GET `/api/fees/:courseId` - Get fee details

## Environment Variables
- `PORT` - Server port (default: 3000)
- `PIPEDREAM_URL` - Pipedream webhook URL
- `FRONTEND_URL` - Frontend URL for CORS
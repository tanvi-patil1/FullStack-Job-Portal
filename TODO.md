# Job Portal Website Development TODO

## Backend Setup
- [x] Create backend/package.json
- [x] Create backend/server.js
- [x] Create backend/.env
- [x] Create backend/config/db.js
- [x] Create backend/models/User.js
- [x] Create backend/models/Job.js
- [x] Create backend/routes/authRoutes.js
- [x] Create backend/routes/jobRoutes.js
- [x] Create backend/controllers/authController.js
- [x] Create backend/controllers/jobController.js
- [x] Create backend/middleware/authMiddleware.js
- [x] Create backend/utils/generateToken.js

## Frontend Setup
- [x] Create frontend/package.json
- [x] Create frontend/vite.config.js
- [x] Create frontend/src/main.jsx
- [x] Create frontend/src/App.jsx
- [x] Create frontend/src/components/ProtectedRoute.jsx
- [x] Create frontend/src/pages/Signup.jsx
- [x] Create frontend/src/pages/Login.jsx
- [x] Create frontend/src/pages/Home.jsx
- [x] Create frontend/src/pages/JobList.jsx
- [x] Create frontend/src/pages/JobDetail.jsx
- [x] Create frontend/src/pages/PostJob.jsx
- [x] Create frontend/src/services/api.js
- [x] Create frontend/src/context/AuthContext.jsx
- [x] Create frontend/public/index.html

## Integration and Testing
- [x] Install backend dependencies (npm install)
- [x] Install frontend dependencies (npm install)
- [x] Test backend server (npm start) - Server running on port 5000, MongoDB connected
- [x] Test frontend build (npm run dev) - Frontend running on port 5173
- [x] Verify full-stack integration (backend API tested, user registration successful)
- [ ] Prepare for GitHub submission (create repo, upload code) - Skipped as per user request

## Feature Enhancements
- [x] Update Backend/models/User.js with profile fields (skills, resume, experience)
- [x] Add Backend/controllers/jobController.js: getJobById, getMyJobs, getAppliedJobs, searchJobs
- [x] Add Backend/controllers/authController.js: updateProfile
- [x] Update Backend/routes/jobRoutes.js: add GET /:id, GET /my, GET /applied, GET /search
- [x] Update Backend/routes/authRoutes.js: add PUT /profile
- [x] Update Frontend/src/pages/Signup.jsx: add role selection
- [x] Create Frontend/src/pages/Profile.jsx: user profile management
- [ ] Update Frontend/src/pages/JobList.jsx: add search/filter form
- [ ] Update Frontend/src/pages/JobDetail.jsx: show applicants for employers
- [x] Create Frontend/src/pages/MyJobs.jsx: employers view their jobs
- [x] Create Frontend/src/pages/MyApplications.jsx: jobseekers view applied jobs
- [x] Update Frontend/src/pages/Home.jsx: add dashboard links
- [x] Update Frontend/src/App.jsx: add new routes
- [x] Enhance UI across all pages: improve styling, responsiveness, add icons, use Bootstrap effectively
- [ ] Test enhanced functionality: backend APIs, frontend integration, UI in browser

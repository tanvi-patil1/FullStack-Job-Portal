# Job Portal Website

A modern, full-stack job portal application that connects job seekers with employers. Built with React for the frontend and Node.js/Express for the backend, featuring user authentication, job posting, application tracking, and more.

## 🚀 Features

### For Job Seekers
- **User Registration & Authentication**: Secure signup and login with JWT tokens
- **Job Search & Filtering**: Advanced search with filters by location, salary, job type, etc.
- **Job Applications**: Easy application process with application tracking
- **Saved Jobs**: Save favorite job listings for later
- **Profile Management**: Update personal information and resume
- **Job Alerts**: Get notified about new jobs matching your preferences

### For Employers
- **Company Dashboard**: Manage your company's job postings
- **Job Posting**: Create and publish job listings with detailed requirements
- **Application Management**: Review and manage job applications
- **Candidate Search**: Find suitable candidates from the applicant pool

### General Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Real-time Updates**: Live notifications and updates
- **Secure**: Protected routes and data encryption

## 🛠 Tech Stack

### Frontend
- **React 18** - Modern JavaScript library for building user interfaces
- **Vite** - Fast build tool and development server
- **React Router** - Declarative routing for React
- **Bootstrap 5** - Responsive CSS framework with custom styling
- **Axios** - HTTP client for API requests
- **Context API** - State management for authentication

### Backend
- **Node.js** - JavaScript runtime for server-side development
- **Express.js** - Web application framework for Node.js
- **MongoDB** - NoSQL database for data storage
- **Mongoose** - MongoDB object modeling for Node.js
- **JWT** - JSON Web Tokens for authentication
- **bcryptjs** - Password hashing
- **Multer** - File upload handling

### Development Tools
- **ESLint** - Code linting
- **Prettier** - Code formatting
- **Git** - Version control

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (version 16 or higher)
- **npm** or **yarn** package manager
- **MongoDB** (local installation or cloud service like MongoDB Atlas)
- **Git** for version control

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/job-portal-website.git
cd job-portal-website
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env file with your configuration
# Add MongoDB connection string, JWT secret, etc.

# Start the backend server
npm run dev
```

The backend server will start on `http://localhost:5000`

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend application will start on `http://localhost:5173`

### 4. Database Setup

Make sure MongoDB is running locally or update the connection string in the backend `.env` file for a cloud database.

## 📖 Usage

### For Development
1. Start the backend server: `cd Backend && npm run dev`
2. Start the frontend server: `cd Frontend && npm run dev`
3. Open `http://localhost:5173` in your browser

### For Production
1. Build the frontend: `cd Frontend && npm run build`
2. Start the backend: `cd Backend && npm start`
3. Serve the built frontend files from the backend or a web server

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile

### Jobs
- `GET /api/jobs` - Get all jobs with filtering
- `POST /api/jobs` - Create new job (employers only)
- `GET /api/jobs/:id` - Get job details
- `PUT /api/jobs/:id` - Update job (employers only)
- `DELETE /api/jobs/:id` - Delete job (employers only)

### Applications
- `POST /api/applications` - Apply for a job
- `GET /api/applications` - Get user's applications
- `GET /api/applications/job/:jobId` - Get applications for a job (employers)

## 📁 Project Structure

```
job-portal-website/
├── Backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   └── jobController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── Job.js
│   │   ├── User.js
│   │   └── JobAlert.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── jobRoutes.js
│   ├── utils/
│   │   └── generateToken.js
│   ├── uploads/
│   ├── server.js
│   └── package.json
├── Frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── job-portal-icon.png
│   ├── src/
│   │   ├── components/
│   │   │   ├── Layout.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── JobList.jsx
│   │   │   ├── JobDetail.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Profile.jsx
│   │   │   ├── PostJob.jsx
│   │   │   ├── MyJobs.jsx
│   │   │   ├── MyApplications.jsx
│   │   │   ├── SavedJobs.jsx
│   │   │   └── JobAlerts.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├── README.md
├── TODO.md
└── .gitignore
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'Add some feature'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a pull request

### Development Guidelines
- Follow the existing code style
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.



## 🙏 Acknowledgments

- Icons from [Bootstrap Icons](https://icons.getbootstrap.com/)
- UI inspiration from modern job portals
- Thanks to all contributors

---

**Note**: This is a full-stack MERN application. Make sure to configure your environment variables properly for production deployment.

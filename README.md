# LearnHub - Complete MERN Stack Online Course Platform

LearnHub is a complete MERN stack online course platform where students can explore and enroll in courses, track their progress, and manage their learning journey. Instructors can create and manage courses, lessons, and student analytics. Secure, responsive, and deployment-ready with a modern UI/UX.

---

## 🏗️ Tech Stack & Architecture

### Backend (Node.js + Express.js)
- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT with bcryptjs for secure password hashing
- **Validation**: Express-validator for input validation
- **File Upload**: Multer for handling file uploads
- **Environment Management**: Dotenv for environment variables
- **Development**: Nodemon for auto-restart during development

### Frontend (React.js)
- **Framework**: React.js with functional components and hooks
- **State Management**: Redux Toolkit for centralized state management
- **Routing**: React Router for navigation
- **HTTP Client**: Axios with interceptors for API communication
- **UI Components**: React Icons for icons, React Toastify for notifications
- **Styling**: CSS with modern design patterns

### Database (MongoDB + Mongoose)
- **User Model**: Authentication, roles, enrolled courses, wishlist
- **Course Model**: Course details, lessons, instructor reference, ratings
- **Enrollment Model**: User-course relationships, progress tracking
- **Proper references and relationships** between collections

---

## 🚀 Key Features

### 👨‍🎓 For Students
- ✅ **Browse & search courses** with filtering and search functionality
- ✅ **View course details** with comprehensive lesson information
- ✅ **Register/Login** with secure JWT authentication
- ✅ **Enroll & track progress** in multiple courses
- ✅ **Mark lessons as complete** and track overall progress
- ✅ **Manage profile** and view enrolled courses
- ✅ **Wishlist functionality** for future course planning

### 👩‍🏫 For Instructors
- ✅ **Create, edit & delete courses** with full CRUD operations
- ✅ **Add & manage lessons** with detailed descriptions
- ✅ **View student analytics** and enrollment data
- ✅ **Course management** tools and publishing controls

### ⚙️ General Features
- ✅ **Responsive design** for desktop, tablet, and mobile devices
- ✅ **Modern UI/UX** with smooth animations and transitions
- ✅ **Real-time updates** without page refresh
- ✅ **Comprehensive error handling** and user feedback
- ✅ **Secure role-based access control** for different user types

---

## 🔐 Authentication & Security

- **JWT-based authentication** with automatic token refresh
- **Role-based access control** (Student/Instructor/Admin)
- **Secure password hashing** with bcryptjs
- **Protected API routes** via middleware
- **Input validation** with express-validator
- **CORS configuration** for secure cross-origin requests

---

## 🛠️ Installation & Setup

### Prerequisites
- **Node.js v14+**
- **MongoDB (local or Atlas)**
- **npm or yarn**

### 🚀 Quick Start
# Clone repo
git clone https://github.com/Maulik6351/LearnHub.git
cd LearnHub

# Install backend dependencies
npm install

# Move into client folder and install frontend dependencies
cd client
npm install
cd ..

# Setup environment variables
cp config.example.env config.env   # or create manually

# Run backend
npm run dev

# Run frontend (inside client folder)
cd client
npm start

---

## 📁 Project Structure

```
LearnHub/
├── 📁 client/                 # React Frontend
│   ├── 📁 public/
│   │   └── 📁 images/         # Course and avatar images
│   ├── 📁 src/
│   │   ├── 📁 components/     # Reusable UI components
│   │   │   └── 📁 layout/     # Header, Footer components
│   │   ├── 📁 features/       # Redux slices and services
│   │   │   ├── 📁 auth/       # Authentication logic
│   │   │   ├── 📁 courses/    # Course management
│   │   │   ├── 📁 users/      # User profile management
│   │   │   └── 📁 enrollments/ # Course enrollment logic
│   │   ├── 📁 pages/          # Main application pages
│   │   ├── App.js             # Main React component
│   │   ├── index.js           # React entry point
│   │   └── store.js           # Redux store configuration
│   └── package.json           # Frontend dependencies
├── 📁 models/                 # MongoDB schemas
│   ├── User.js               # User model with roles
│   ├── Course.js             # Course model with lessons
│   └── Enrollment.js         # Enrollment tracking model
├── 📁 routes/                 # API endpoints
│   ├── auth.js               # Authentication routes
│   ├── courses.js            # Course CRUD operations
│   ├── users.js              # User profile management
│   └── enrollments.js        # Enrollment operations
├── 📁 middleware/             # Custom middleware
│   └── auth.js               # JWT authentication middleware
├── server.js                 # Express server setup
├── config.env                # Environment variables
└── package.json              # Backend dependencies
```



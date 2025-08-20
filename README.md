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

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/Maulik6351/LearnHub.git
   cd LearnHub
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Environment Setup**
   
   Create a `config.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/learnhub
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

5. **Database Setup**
   
   Make sure MongoDB is running on your system or update the `MONGODB_URI` to point to your MongoDB instance.

## 🚀 Running the Application

### Development Mode

1. **Start both frontend and backend concurrently**
   ```bash
   npm run dev
   ```

2. **Run backend only**
   ```bash
   npm run server
   ```

3. **Run frontend only**
   ```bash
   npm run client
   ```

### Production Mode

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm start
   ```

---

## 📡 API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses (with filtering)
- `GET /api/courses/:id` - Get single course
- `POST /api/courses` - Create a course (Instructor/Admin)
- `PUT /api/courses/:id` - Update a course (Instructor/Admin)
- `DELETE /api/courses/:id` - Delete a course (Instructor/Admin)
- `POST /api/courses/:id/rate` - Rate a course

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/enrolled-courses` - Get user's enrolled courses
- `GET /api/users/wishlist` - Get user's wishlist
- `POST /api/users/wishlist/:courseId` - Add course to wishlist
- `DELETE /api/users/wishlist/:courseId` - Remove course from wishlist

### Enrollments
- `POST /api/enrollments/enroll` - Enroll in a course
- `GET /api/enrollments` - Get user's enrollments
- `PUT /api/enrollments/:enrollmentId/lessons/:lessonId/complete` - Mark lesson as completed
- `GET /api/enrollments/:enrollmentId/progress` - Get enrollment progress

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

---

## 🗄️ Database Models

### User Model
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed),
  role: String (student/instructor),
  avatar: String,
  enrolledCourses: [Course references],
  wishlist: [Course references],
  createdAt: Date
}
```

### Course Model
```javascript
{
  title: String,
  description: String,
  category: String,
  price: Number,
  image: String,
  instructor: User reference,
  duration: String,
  level: String (Beginner/Advanced),
  lessons: [{
    title: String,
    description: String,
    duration: String,
    isPreview: Boolean
  }],
  requirements: [String],
  learningOutcomes: [String],
  enrolledStudents: [User references],
  averageRating: Number,
  totalRatings: Number,
  ratings: [Rating objects],
  isPublished: Boolean,
  tags: [String]
}
```

### Enrollment Model
```javascript
{
  user: User reference,
  course: Course reference,
  enrolledAt: Date,
  completedLessons: [Lesson references],
  progress: Number (percentage),
  lastAccessed: Date
}
```

---

## 🔧 Available Scripts

```json
{
  "start": "node server.js",
  "server": "nodemon server.js",
  "client": "npm start --prefix client",
  "dev": "concurrently \"npm run server\" \"npm run client\"",
  "install-client": "cd client && npm install",
  "build": "npm run build --prefix client",
  "heroku-postbuild": "npm run install-client && npm run build"
}
```

---

## 🚀 Deployment

The project is configured for deployment with:
- **Heroku deployment** scripts
- **Production build** configuration
- **Static file serving** for React build
- **Environment variable** management

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🆘 Support

For support, email support@learnhub.com or create an issue in the repository.

---

## 🙏 Acknowledgments

- Font Awesome for icons
- React community for excellent documentation
- MongoDB for the database solution
- Express.js team for the web framework
- Redux Toolkit for state management

---

## 🌟 Features in Detail

### Course Management
- **6 Sample Courses** included with comprehensive content
- **Basic and Advanced levels** for different skill sets
- **Multiple categories**: HTML, CSS, JavaScript
- **Rich content**: Lessons, requirements, learning outcomes
- **Professional images** for each course

### User Experience
- **Intuitive navigation** with React Router
- **Responsive design** for all devices
- **Real-time updates** with Redux state management
- **Toast notifications** for user feedback
- **Protected routes** for authenticated users

### Security Features
- **JWT token management** with automatic refresh
- **Password hashing** with bcryptjs
- **Input validation** with express-validator
- **Role-based access control**
- **Secure API endpoints**

---

**Built with ❤️ using the MERN Stack**

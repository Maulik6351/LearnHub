# LearnHub - MERN Stack Online Learning Platform

A full-stack online learning platform built with the MERN stack (MongoDB, Express.js, React.js, Node.js).

## Features

### For Students
- Browse and search courses
- Enroll in courses
- Track learning progress
- Rate and review courses
- Add courses to wishlist
- User profile management

### For Instructors
- Create and manage courses
- Upload course content
- Track student enrollments
- Course analytics

### For Admins
- User management
- Course moderation
- Platform analytics

## Tech Stack

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

### Frontend
- **React.js** - UI library
- **Redux Toolkit** - State management
- **React Router** - Routing
- **Axios** - HTTP client
- **React Icons** - Icon library
- **React Toastify** - Notifications

## Prerequisites

Before running this application, make sure you have the following installed:

- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd learnhub-mern
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
   
   Create a `.env` file in the root directory:
   ```env
   MONGODB_URI=mongodb://localhost:27017/learnhub
   JWT_SECRET=your_jwt_secret_key_here
   NODE_ENV=development
   PORT=5000
   ```

5. **Database Setup**
   
   Make sure MongoDB is running on your system or update the `MONGODB_URI` to point to your MongoDB instance.

## Running the Application

### Development Mode

1. **Start the backend server**
   ```bash
   npm run server
   ```

2. **Start the frontend development server**
   ```bash
   npm run client
   ```

3. **Run both frontend and backend concurrently**
   ```bash
   npm run dev
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

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user

### Courses
- `GET /api/courses` - Get all courses
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
- `POST /api/enrollments/:courseId` - Enroll in a course
- `GET /api/enrollments/my-enrollments` - Get user's enrollments
- `GET /api/enrollments/:enrollmentId` - Get specific enrollment
- `PUT /api/enrollments/:enrollmentId/complete-lesson` - Mark lesson as completed
- `DELETE /api/enrollments/:enrollmentId` - Cancel enrollment

## Project Structure

```
learnhub-mern/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── features/       # Redux slices
│   │   ├── pages/          # Page components
│   │   └── store/          # Redux store
│   └── package.json
├── models/                 # MongoDB models
├── routes/                 # API routes
├── middleware/             # Custom middleware
├── server.js              # Express server
└── package.json
```

## Database Models

### User
- name, email, password
- role (student, instructor, admin)
- enrolledCourses, wishlist
- profile information

### Course
- title, description, category
- price, duration, level
- instructor reference
- lessons, requirements, learning outcomes
- ratings and reviews

### Enrollment
- student and course references
- progress tracking
- completed lessons
- certificate information

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@learnhub.com or create an issue in the repository.

## Acknowledgments

- Font Awesome for icons
- React community for excellent documentation
- MongoDB for the database solution



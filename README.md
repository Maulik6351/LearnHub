# LearnHub_Online-Course-Website
LearnHub is a complete MERN stack online course platform where students can explore and enroll in courses, track their progress, and manage their learning journey. Instructors can create and manage courses, lessons, and student analytics. Secure, responsive, and deployment-ready with a modern UI/UX.

---

## 🏗️ Tech Stack & Architecture
### Backend (Node.js + Express.js)
- Runtime: **Node.js** with **Express.js** framework
- Database: **MongoDB** with **Mongoose ODM**
- Authentication: **JWT** with **bcryptjs** for secure password hashing
- Validation: **Express-validator**
- File Upload: **Multer**
- Environment Management: **Dotenv**
- Development: **Nodemon**

### Frontend (React.js)
- Framework: **React.js** (functional components + hooks)
- State Management: **Redux Toolkit**
- Routing: **React Router**
- API Calls: **Axios** with interceptors
- UI: **React Icons**, **React Toastify**
- Styling: **CSS** with modern patterns

### Database (MongoDB + Mongoose)
- **User Model**
- **Course Model**
- **Enrollment Model**
- Proper references & relationships between collections

---

## 🚀 Key Features
### 👨‍🎓 For Students
- ✅ Browse & search courses  
- ✅ View course details with lessons & requirements  
- ✅ Register/Login with JWT auth  
- ✅ Enroll & track course progress  
- ✅ Mark lessons as complete  
- ✅ Manage profile & enrolled courses  
- ✅ Wishlist for future courses  

### 👩‍🏫 For Instructors
- ✅ Create, edit & delete courses  
- ✅ Add & manage lessons  
- ✅ View student analytics  

### ⚙️ General Features
- ✅ Responsive design (desktop, tablet, mobile)  
- ✅ Modern UI/UX with smooth animations  
- ✅ Real-time updates without page refresh  
- ✅ Comprehensive error handling & feedback  
- ✅ Secure role-based access control  

---

## 🔐 Authentication & Security
- **JWT-based authentication** with refresh token support  
- **Role-based access control (Student/Instructor)**  
- **Secure password hashing with bcryptjs**  
- **Protected API routes via middleware**  

---

## 🛠️ Installation & Setup
### Prerequisites
- **Node.js v14+**
- **MongoDB (local or Atlas)**
- **npm or yarn**

### Quick Start
```bash
# Clone repo
git clone https://github.com/your-username/learnhub.git
cd learnhub

# Install backend deps
cd backend
npm install

# Install frontend deps
cd ../frontend
npm install

# Setup environment variables
cp .env.example .env

# Run backend
npm run dev

# Run frontend
npm start

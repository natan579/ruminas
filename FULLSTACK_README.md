# Full-Stack To-Do List Application

A complete full-stack to-do list application with user authentication, Node.js backend, MongoDB database, and modern frontend.

## 🏗️ Project Structure

```
ruminas/
├── backend/                    # Node.js + Express server
│   ├── server.js              # Main server file
│   ├── .env                   # Environment variables
│   ├── .env.example           # Example env file
│   ├── package.json           # Backend dependencies
│   ├── routes/
│   │   ├── auth.js           # Authentication routes
│   │   └── todos.js          # Todo CRUD routes
│   ├── models/
│   │   ├── User.js           # User schema
│   │   └── Todo.js           # Todo schema
│   ├── middleware/
│   │   └── auth.js           # JWT verification
│   └── config/
│       └── database.js       # MongoDB connection
├── frontend/                   # Updated frontend
│   ├── index.html
│   ├── login.html
│   ├── signup.html
│   ├── styles/
│   │   └── style.css
│   └── js/
│       ├── api.js            # API communication
│       ├── auth.js           # Auth logic
│       └── app.js            # App logic
└── README.md
```

## ✨ Features

### User Management
- ✅ User registration/signup
- ✅ User login
- ✅ JWT token authentication
- ✅ Logout functionality
- ✅ Protected routes

### Todo Management
- ✅ Create todos
- ✅ Read todos
- ✅ Update todos (text, priority, status)
- ✅ Delete todos
- ✅ Mark complete/incomplete
- ✅ Filter by status

### Data Persistence
- ✅ MongoDB database
- ✅ Cloud-based storage
- ✅ User-specific todos

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB Atlas account (free)
- Git

### Step 1: Clone Repository
```bash
git clone https://github.com/natan579/ruminas.git
cd ruminas
```

### Step 2: Setup Backend
```bash
cd backend
npm install
```

### Step 3: Configure Environment
Create `.env` file in backend folder:
```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
PORT=5000
NODE_ENV=development
```

### Step 4: Start Backend
```bash
cd backend
npm start
```
Server runs on http://localhost:5000

### Step 5: Open Frontend
Open `frontend/login.html` in your browser

## 📚 API Endpoints

### Authentication
- `POST /api/auth/signup` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Todos
- `GET /api/todos` - Get all user todos
- `POST /api/todos` - Create new todo
- `PUT /api/todos/:id` - Update todo
- `DELETE /api/todos/:id` - Delete todo

## 🗄️ Database Schema

### User
```javascript
{
  _id: ObjectId,
  username: String (unique),
  email: String (unique),
  password: String (hashed),
  createdAt: Date,
  updatedAt: Date
}
```

### Todo
```javascript
{
  _id: ObjectId,
  userId: ObjectId (reference to User),
  text: String,
  completed: Boolean,
  priority: String (low/medium/high),
  createdAt: Date,
  updatedAt: Date
}
```

## 🔐 Security Features
- ✅ Password hashing (bcryptjs)
- ✅ JWT token authentication
- ✅ Protected API routes
- ✅ Input validation
- ✅ CORS enabled

## 🌐 Deployment (Railway)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Full-stack todo app"
git push origin main
```

### Step 2: Connect to Railway
1. Go to https://railway.app
2. Sign up with GitHub
3. Create new project
4. Connect your GitHub repository
5. Add MongoDB plugin
6. Set environment variables
7. Deploy!

## 📖 Technology Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcryptjs
- **Deployment**: Railway
- **API**: RESTful API

## 🎯 Development Workflow

```bash
# Terminal 1: Start backend
cd backend
npm start

# Terminal 2: Open frontend in browser
open frontend/login.html
```

## 📝 Environment Variables

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/todos
JWT_SECRET=your_super_secret_key_change_this_in_production
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

## 🐛 Troubleshooting

### MongoDB Connection Error
- Verify MongoDB Atlas connection string
- Add your IP to whitelist in MongoDB Atlas
- Check internet connection

### CORS Error
- Ensure backend CORS is configured correctly
- Check frontend URL in backend .env

### Token Expired
- Clear localStorage and login again
- Check JWT_SECRET is the same

## 🚀 Next Steps

- [ ] Add email verification
- [ ] Add password reset
- [ ] Add task categories
- [ ] Add due dates
- [ ] Add reminders
- [ ] Add dark mode
- [ ] Add mobile app
- [ ] Add collaborative tasks

## 📄 License

MIT License - Feel free to use for personal and commercial projects

## 💬 Support

For issues or questions, create an issue on GitHub!

---

**Made with ❤️ using Node.js, Express, MongoDB, and Vanilla JavaScript**
# 📝 Minimalist Todo API

A secure RESTful backend API built with **Node.js**, **Express.js**, and **MongoDB**. This project demonstrates modern backend development practices including MVC architecture, JWT authentication, password hashing, protected routes, MongoDB integration with Mongoose, and complete CRUD operations for a multi-user Todo application.

---

## ✨ Features

* ✅ Complete CRUD functionality (`Create`, `Read`, `Update`, `Delete`)
* ✅ User registration and login
* ✅ Password hashing with **bcryptjs**
* ✅ JWT authentication and authorization
* ✅ Protected routes using authentication middleware
* ✅ Multi-user Todo ownership
* ✅ Users can only access their own Todos
* ✅ MongoDB integration using Mongoose
* ✅ Schema validation and sanitization
* ✅ Centralized error handling middleware
* ✅ Environment variable management with Dotenv
* ✅ MVC (Model-View-Controller) architecture
* ✅ ES Modules support

---

## 🛠️ Tech Stack

| Category              | Technology            |
| --------------------- | --------------------- |
| Runtime               | Node.js               |
| Framework             | Express.js            |
| Database              | MongoDB               |
| ODM                   | Mongoose              |
| Authentication        | JSON Web Tokens (JWT) |
| Password Hashing      | bcryptjs              |
| Environment Variables | Dotenv                |

---

# 📁 Project Structure

```text
.
├── config/
├── controllers/
│   ├── authController.js
│   └── todoController.js
├── middleware/
│   ├── authMiddleware.js
│   └── errorHandler.js
├── models/
│   ├── Todo.js
│   └── User.js
├── routes/
│   ├── authRoutes.js
│   └── todoRoutes.js
├── utils/
│   └── generateToken.js
├── app.js
├── index.js
└── .env
```

---

#  Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/Mohammed-Er/minimalist-todo-api.git

cd minimalist-todo-api
```

## 2. Install dependencies

```bash
npm install
```

## 3. Configure environment variables

Create a `.env` file in the project root.

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_key
```

Example:

```env
PORT=3000
MONGO_URI=mongodb://localhost:27017/todo_db
JWT_SECRET=myVerySecureSecretKey
```

---

## 4. Start the development server

```bash
npm run dev
```

Server:

```text
http://localhost:3000
```

---

# 📡 API Endpoints

## Authentication

| Method | Endpoint              | Description           |
| ------ | --------------------- | --------------------- |
| POST   | `/api/users/register` | Register a new user   |
| POST   | `/api/users/login`    | Login and receive JWT |

---

## Todos (Protected)

These endpoints require a valid JWT in the Authorization header.

```
Authorization: Bearer <your_token>
```

| Method | Endpoint         | Description                |
| ------ | ---------------- | -------------------------- |
| GET    | `/api/todos`     | Get logged-in user's todos |
| POST   | `/api/todos`     | Create a todo              |
| PUT    | `/api/todos/:id` | Update                     |
| DELETE | `/api/todos/:id` | Delete                     |
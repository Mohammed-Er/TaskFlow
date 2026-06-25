# 📝 Minimalist Todo CRUD API

A RESTful backend API built with Node.js, Express, and MongoDB. This project demonstrates clean backend architecture, environment variable management, MongoDB integration using Mongoose, and complete CRUD operations for a Todo application.

## Features

- ✅ Full CRUD functionality (`Create`, `Read`, `Update`, `Delete`)
- ✅ MongoDB integration using Mongoose ODM
- ✅ Data validation and sanitization through Mongoose Schemas
- ✅ Environment variable isolation with Dotenv
- ✅ Modular project structure with separated concerns
- ✅ ES Modules syntax support

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ODM:** Mongoose
- **Environment Variables:** Dotenv

---

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Mohammed-Er/minimalist-todo-api.git
cd minimalist-todo-api
```

### 2. Install Dependencies

```bash
cd back_end
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
```

Replace `your_mongodb_connection_string` with either:

- Your local MongoDB URI
- MongoDB Atlas connection string

Example:

```env
MONGO_URI=mongodb://localhost:27017/todo_db
```

### 4. Start the Development Server

```bash
npx nodemon index.js
```

The server should now be running at:

```text
http://localhost:3000
```

---

## 📡 API Endpoints

| Method | Endpoint         | Description             |
| ------ | ---------------- | ----------------------- |
| POST   | `/api/todos`     | Create a new todo       |
| GET    | `/api/todos`     | Retrieve all todos      |
| PUT    | `/api/todos/:id` | Update an existing todo |
| DELETE | `/api/todos/:id` | Delete a todo           |

---

## 📷 API Demo

```markdown
![Postman Demo](assets/postman-demo.png)
```

---

## 📄 Example Request

### Create a Todo

**POST** `/api/todos`

```json
{
  "title": "Complete STEM project"
}
```

### Response

```json
{
  "_id": "685c...",
  "title": "Complete STEM project",
  "completed": false
}
```

---

## 🎯 Learning Objectives

This project was built to practice:

- REST API development
- Express.js fundamentals
- MongoDB and Mongoose
- Backend project organization
- Environment variable management
- CRUD operations
- Error handling and validation

```

```

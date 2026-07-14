# 📋 Personal Task Management Dashboard

A full-stack task management application built with the MERN stack (MongoDB, Express.js, React, Node.js). Users can securely register, login, and perform full CRUD (Create, Read, Update, Delete) operations on their personal tasks.

## 📹 Video Walkthrough

https://youtu.be/8V-rvmZ9b2E

## 🛠️ Technologies Used

### Backend
| Technology | Purpose |
|------------|---------|
| **Node.js** | JavaScript runtime environment |
| **Express.js** | Web framework for building REST APIs |
| **MongoDB Atlas** | Cloud NoSQL database |
| **Mongoose** | ODM (Object Data Modeling) for MongoDB |
| **JSON Web Tokens (JWT)** | User authentication and authorization |
| **bcryptjs** | Password hashing for security |
| **dotenv** | Environment variable management |
| **cors** | Cross-origin resource sharing |

### Frontend
| Technology | Purpose |
|------------|---------|
| **React** | UI library for building interactive interfaces |
| **React Router** | Navigation and routing between pages |
| **Axios** | HTTP client for API calls |
| **Context API** | Global state management |
| **Vite** | Fast build tool and development server |
| **CSS3** | Custom styling with Flexbox and Grid |

### Development Tools
| Tool | Purpose |
|------|---------|
| **Nodemon** | Auto-restart server during development |
| **ESLint** | Code linting and quality |
| **Git** | Version control |
| **Postman** | API testing |

## 📁 Project Structure



## 🚀 Getting Started

### Prerequisites
- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (v6 or higher) - Comes with Node.js
- **MongoDB Atlas** account (free tier) - [Sign up](https://www.mongodb.com/cloud/atlas)

### Installation

**1. Clone the repository**
```bash
git clone https://github.com/yourusername/personal-task-dashboard.git
cd personal-task-dashboard


cd backend
npm install

cd ../frontend
npm install

PORT=5000
MONGODB_URI=mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/taskdb
JWT_SECRET=your_super_secret_jwt_key_here

### start server
cd backend
npm run dev

###Start the frontend (in a new terminal):

bash
cd frontend
npm run dev
Frontend will run at: http://localhost:5173
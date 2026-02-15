# Task Assignment Management System - Backend

This is the backend server for the Task Assignment Management System, built using Node.js, Express, and MongoDB.

## Features

- **User Authentication**: Secure registration and login using JWT (JSON Web Tokens).
- **Role-Based Access Control (RBAC)**: Distinguishes between Manager and Member roles.
- **Task Management API**: Full CRUD operations for tasks.
- **Assignment Logic**: Managers can assign tasks to members.
- **Deadline Validation**: Ensures task deadlines are not set before the assignment date.
- **Secure Password Hashing**: Uses bcryptjs for password encryption.

## Tech Stack

- **Node.js**: JavaScript runtime environment.
- **Express.js**: Web framework for Node.js.
- **MongoDB**: NoSQL database for data persistence.
- **Mongoose**: ODM for MongoDB.
- **JWT**: For secure authentication.
- **bcryptjs**: For password hashing.
- **CORS**: Cross-Origin Resource Sharing.

## Getting Started

### Prerequisites

- Node.js installed
- MongoDB (Local or Atlas)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Srinath2607/FSD18_Backend.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRE=7d
NODE_ENV=development
```

### Running the Server

- **Development Mode**:
  ```bash
  npm run dev
  ```
- **Production Mode**:
  ```bash
  npm start
  ```

## API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login and get token

### Tasks
- `GET /api/tasks` - Get all tasks (Manager sees all, Member sees assigned)
- `POST /api/tasks` - Create a new task (Manager only)
- `PUT /api/tasks/:id/status` - Update task status
- `PUT /api/tasks/:id/assign` - Assign task to a member (Manager only)
- `GET /api/tasks/members/list` - Get list of all members

## License

ISC

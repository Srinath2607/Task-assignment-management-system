# API Quick Reference Guide

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require JWT token in Authorization header:
```
Authorization: Bearer <token>
```

### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "MANAGER" // or "MEMBER"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MANAGER"
  }
}
```

### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MANAGER"
  }
}
```

### Get Current User
```http
GET /auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "user_id",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "MANAGER"
  }
}
```

## Tasks

### Get All Tasks
```http
GET /tasks
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 5,
  "tasks": [
    {
      "_id": "task_id",
      "title": "Complete Project",
      "description": "Finish the task management system",
      "startDate": "2026-01-31T00:00:00.000Z",
      "deadline": "2026-02-15T00:00:00.000Z",
      "status": "IN_PROGRESS",
      "createdBy": {
        "_id": "user_id",
        "name": "Manager Name",
        "email": "manager@example.com"
      },
      "assignedTo": {
        "_id": "member_id",
        "name": "Member Name",
        "email": "member@example.com"
      },
      "assignedDate": "2026-01-31T00:00:00.000Z",
      "createdAt": "2026-01-31T00:00:00.000Z",
      "updatedAt": "2026-01-31T00:00:00.000Z"
    }
  ]
}

Note: MANAGER sees all tasks, MEMBER sees only assigned tasks
```

### Create Task (MANAGER only)
```http
POST /tasks
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Complete Project",
  "description": "Finish the task management system",
  "startDate": "2026-01-31",
  "deadline": "2026-02-15",
  "assignedTo": "member_id" // Optional
}

Response:
{
  "success": true,
  "message": "Task created successfully",
  "task": { /* task object */ }
}

Error (Business Rule Violation):
{
  "success": false,
  "message": "Task deadline must not be earlier than assignment date"
}
```

### Get Single Task
```http
GET /tasks/:id
Authorization: Bearer <token>

Response:
{
  "success": true,
  "task": { /* task object */ }
}
```

### Update Task Status
```http
PUT /tasks/:id/status
Authorization: Bearer <token>
Content-Type: application/json

{
  "status": "IN_PROGRESS" // PENDING, IN_PROGRESS, or COMPLETED
}

Response:
{
  "success": true,
  "message": "Task status updated successfully",
  "task": { /* updated task object */ }
}
```

### Assign Task to Member (MANAGER only)
```http
PUT /tasks/:id/assign
Authorization: Bearer <token>
Content-Type: application/json

{
  "memberId": "member_user_id"
}

Response:
{
  "success": true,
  "message": "Task assigned successfully",
  "task": { /* updated task object */ }
}

Error (Business Rule Violation):
{
  "success": false,
  "message": "Task deadline must not be earlier than assignment date"
}
```

### Get All Members (MANAGER only)
```http
GET /tasks/members/list
Authorization: Bearer <token>

Response:
{
  "success": true,
  "count": 3,
  "members": [
    {
      "_id": "member_id",
      "name": "Jane Doe",
      "email": "jane@example.com"
    }
  ]
}
```

## Status Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (validation error)
- `401` - Unauthorized (not logged in or invalid token)
- `403` - Forbidden (insufficient permissions)
- `404` - Not Found
- `500` - Server Error

## Error Response Format

```json
{
  "success": false,
  "message": "Error description here"
}
```

## Testing with cURL

### Register
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Manager","email":"manager@test.com","password":"password123","role":"MANAGER"}'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"manager@test.com","password":"password123"}'
```

### Create Task
```bash
curl -X POST http://localhost:5000/api/tasks \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Task","description":"Test Description","startDate":"2026-01-31","deadline":"2026-02-15"}'
```

### Get Tasks
```bash
curl -X GET http://localhost:5000/api/tasks \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Testing with Postman

1. Import the endpoints above
2. Set up environment variables:
   - `baseUrl`: http://localhost:5000/api
   - `token`: (set after login)
3. Use `{{baseUrl}}` and `{{token}}` in requests
4. Set Authorization header: `Bearer {{token}}`

## Business Rules

### Critical Rule: Deadline Validation
- Task deadline MUST NOT be earlier than assignment date
- Validated when:
  - Creating a task with assignment
  - Assigning an existing task
- Returns 400 error if violated
- Error message: "Task deadline must not be earlier than assignment date"

### Role-Based Access
- **MANAGER**:
  - Can create tasks
  - Can assign tasks
  - Can view all tasks
  - Can get member list
  
- **MEMBER**:
  - Can view assigned tasks only
  - Can update status of assigned tasks
  - Cannot create or assign tasks

## Common Use Cases

### 1. Manager Creates and Assigns Task
```
1. POST /auth/login (as manager)
2. GET /tasks/members/list (get member IDs)
3. POST /tasks (create task with assignedTo)
```

### 2. Manager Assigns Existing Task
```
1. POST /auth/login (as manager)
2. GET /tasks (get task ID)
3. PUT /tasks/:id/assign (assign to member)
```

### 3. Member Updates Task Status
```
1. POST /auth/login (as member)
2. GET /tasks (get assigned tasks)
3. PUT /tasks/:id/status (update status)
```

### 4. View All Tasks (Manager)
```
1. POST /auth/login (as manager)
2. GET /tasks (see all tasks)
```

### 5. View My Tasks (Member)
```
1. POST /auth/login (as member)
2. GET /tasks (see only assigned tasks)
```

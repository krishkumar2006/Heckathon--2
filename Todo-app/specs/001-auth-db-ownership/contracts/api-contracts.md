# API Contracts: Authentication Database Ownership

## Authentication Endpoints (Handled by Better Auth)

Better Auth provides the following authentication endpoints that are managed by the frontend:

- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info

## Backend API Endpoints (Protected with JWT)

All backend endpoints require JWT token in Authorization header: `Authorization: Bearer <JWT_TOKEN>`

### Task Management API

#### GET /api/tasks
**Description**: Get all tasks for the authenticated user
**Authentication**: Required (JWT)
**Authorization**: User can only access their own tasks

**Request**:
```
GET /api/tasks
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```
Status: 200 OK
{
  "tasks": [
    {
      "id": 1,
      "user_id": "user-uuid-from-better-auth",
      "title": "Sample task",
      "description": "Sample description",
      "completed": false,
      "created_at": "2025-12-23T10:00:00Z",
      "updated_at": "2025-12-23T10:00:00Z"
    }
  ]
}
```

#### POST /api/tasks
**Description**: Create a new task for the authenticated user
**Authentication**: Required (JWT)
**Authorization**: Task will be assigned to authenticated user

**Request**:
```
POST /api/tasks
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "New task",
  "description": "Task description",
  "completed": false
}
```

**Response**:
```
Status: 201 Created
{
  "id": 1,
  "user_id": "user-uuid-from-better-auth",
  "title": "New task",
  "description": "Task description",
  "completed": false,
  "created_at": "2025-12-23T10:00:00Z",
  "updated_at": "2025-12-23T10:00:00Z"
}
```

#### GET /api/tasks/{task_id}
**Description**: Get a specific task for the authenticated user
**Authentication**: Required (JWT)
**Authorization**: User can only access their own tasks

**Request**:
```
GET /api/tasks/{task_id}
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```
Status: 200 OK
{
  "id": 1,
  "user_id": "user-uuid-from-better-auth",
  "title": "Sample task",
  "description": "Sample description",
  "completed": false,
  "created_at": "2025-12-23T10:00:00Z",
  "updated_at": "2025-12-23T10:00:00Z"
}
```

**Error Response**:
```
Status: 404 Not Found (if task doesn't exist or doesn't belong to user)
Status: 401 Unauthorized (if JWT is invalid)
```

#### PUT /api/tasks/{task_id}
**Description**: Update a specific task for the authenticated user
**Authentication**: Required (JWT)
**Authorization**: User can only update their own tasks

**Request**:
```
PUT /api/tasks/{task_id}
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json

{
  "title": "Updated task",
  "description": "Updated description",
  "completed": true
}
```

**Response**:
```
Status: 200 OK
{
  "id": 1,
  "user_id": "user-uuid-from-better-auth",
  "title": "Updated task",
  "description": "Updated description",
  "completed": true,
  "created_at": "2025-12-23T10:00:00Z",
  "updated_at": "2025-12-23T11:00:00Z"
}
```

#### DELETE /api/tasks/{task_id}
**Description**: Delete a specific task for the authenticated user
**Authentication**: Required (JWT)
**Authorization**: User can only delete their own tasks

**Request**:
```
DELETE /api/tasks/{task_id}
Authorization: Bearer <JWT_TOKEN>
```

**Response**:
```
Status: 204 No Content
```

## Authentication Validation

### JWT Verification Middleware
All backend endpoints must include JWT verification middleware that:
1. Extracts the JWT token from the Authorization header
2. Verifies the token signature
3. Extracts the user_id from the token payload
4. Ensures the user_id matches the requested resource ownership

### Error Responses
- `401 Unauthorized`: Invalid or missing JWT token
- `403 Forbidden`: Valid token but insufficient permissions
- `404 Not Found`: Resource doesn't exist or doesn't belong to the user
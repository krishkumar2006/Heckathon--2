# Quickstart: Tasks CRUD Verification & Correction

## Overview
This guide provides the essential information to implement and verify the Tasks CRUD functionality with proper JWT authentication and authorization.

## Prerequisites
- Python 3.11+ (backend)
- Node.js 18+ (frontend)
- Neon PostgreSQL database configured
- Better Auth properly set up for JWT issuance
- BACKEND_API_URL configured as http://localhost:8000

## Backend Setup

### 1. Route Configuration
Ensure your FastAPI application has the following route configuration:

```python
from fastapi import APIRouter

router = APIRouter(prefix="/api/tasks", tags=["tasks"])
```

### 2. JWT Middleware
All task endpoints must have JWT verification middleware that:
- Extracts user_id from the JWT token
- Ensures users can only access their own tasks
- Returns 401 for invalid tokens

### 3. Database Models
The Task model should include:
- id (primary key)
- title (required)
- description (optional)
- completed (boolean, default: false)
- user_id (foreign key to users table)
- created_at and updated_at timestamps

## Frontend Setup

### 1. API Client Configuration
Configure your API client in `lib/api.ts` to:
- Use BACKEND_API_URL=http://localhost:8000
- Prefix all task requests with `/api/tasks`
- Include JWT in Authorization header for all requests

### 2. Dashboard Integration
The dashboard page should implement:
- Task listing (GET /api/tasks)
- Task creation form (POST /api/tasks)
- Task editing (PUT /api/tasks/{id})
- Task deletion (DELETE /api/tasks/{id})
- Completion toggle (PATCH /api/tasks/{id}/complete)

## Verification Steps

### 1. Route Verification
1. Print backend registered routes to verify `/api/tasks` prefix is used
2. Confirm all 5 required endpoints are registered:
   - POST /api/tasks
   - GET /api/tasks
   - PUT /api/tasks/{task_id}
   - DELETE /api/tasks/{task_id}
   - PATCH /api/tasks/{task_id}/complete

### 2. API Call Verification
1. Log outgoing frontend requests to verify correct paths
2. Log backend route hits to confirm matching endpoints
3. Verify JWT tokens are being sent with each request

### 3. Authentication Verification
1. Test that unauthorized requests return 401
2. Test that users can only access their own tasks (403 for others)
3. Verify task creation properly assigns user_id from JWT

## Common Issues and Solutions

### Issue: 404 Not Found Errors
**Solution**: Verify that backend routes use `/api/tasks` prefix exactly as specified

### Issue: Authentication Failures
**Solution**: Confirm JWT tokens are properly included in Authorization header

### Issue: Cross-Origin Requests
**Solution**: Ensure proper CORS configuration between frontend and backend

## Testing Checklist

- [ ] POST /api/tasks creates new task with proper user_id assignment
- [ ] GET /api/tasks retrieves only authenticated user's tasks
- [ ] PUT /api/tasks/{id} updates existing task
- [ ] DELETE /api/tasks/{id} removes task from database
- [ ] PATCH /api/tasks/{id}/complete toggles completion status
- [ ] Unauthorized requests return 401
- [ ] Cross-user access attempts return 403
- [ ] UI updates immediately after successful operations
# REST API Specification - Phase II

## 1. API Overview

The FastAPI backend serves as the sole API provider for the Todo Full-Stack Web Application. All API endpoints are served from the backend service and must be accessed directly. Next.js API routes must NOT be used for any backend functionality. The backend provides a secure, authenticated API for all task-related operations.

## 2. Base URLs

- Development: http://localhost:8000
- Production: https://api.example.com

## 3. Authentication Requirements

All API endpoints require a valid JWT token issued by Better Auth. The JWT must be provided in the request header as follows:

```
Authorization: Bearer <token>
```

Requests without a valid token must return HTTP 401 Unauthorized status.

## 4. User Identity & Authorization Model

- User identity is extracted exclusively from the JWT token
- The backend must never trust user identity from request body alone
- All task operations must be scoped to the authenticated user
- Cross-user access is strictly forbidden
- The authenticated user's identity is derived from the `sub` claim in the JWT

## 5. Endpoints Specification

### GET /api/tasks

List all tasks for the authenticated user.

Query Parameters:
- status (optional): "all" | "pending" | "completed"
- sort (optional): "created" | "title" | "due_date"

Behavior:
- Return ONLY tasks belonging to the authenticated user
- Apply filters and sorting safely based on query parameters
- Default behavior returns all tasks when no query parameters are provided
- Tasks are filtered by user_id extracted from the JWT

Response:
- Array of Task objects in JSON format

### POST /api/tasks

Create a new task for the authenticated user.

Request Body:
- title: string (required)
- description: string (optional)

Behavior:
- user_id is derived from the JWT token's `sub` claim
- user_id must NOT be supplied by the client in the request body
- Task is created with `completed` field set to `false` by default
- The authenticated user becomes the owner of the created task

Response:
- Created Task object in JSON format

### PUT /api/tasks/{task_id}

Update an existing task for the authenticated user.

Path Parameter:
- task_id: integer (required) - The ID of the task to update

Request Body:
- title: string (optional)
- description: string (optional)
- completed: boolean (optional)

Behavior:
- Verify that the task belongs to the authenticated user (by checking user_id)
- Update only the fields provided in the request body
- Return 404 if the task does not exist or does not belong to the user
- Preserve original values for fields not included in the request

Response:
- Updated Task object in JSON format

### DELETE /api/tasks/{task_id}

Delete a task for the authenticated user.

Path Parameter:
- task_id: integer (required) - The ID of the task to delete

Behavior:
- Verify that the task belongs to the authenticated user
- Delete the task if it exists and belongs to the user
- Return 404 if the task does not exist or does not belong to the user

Response:
- Empty response with HTTP 204 No Content status

### PATCH /api/tasks/{task_id}/complete

Mark a task as completed or incomplete for the authenticated user.

Path Parameter:
- task_id: integer (required) - The ID of the task to update

Request Body:
- completed: boolean (required) - Whether the task is completed

Behavior:
- Verify that the task belongs to the authenticated user
- Update only the completed status of the task
- Return 404 if the task does not exist or does not belong to the user

Response:
- Updated Task object in JSON format

## 6. Error Handling

- Missing JWT → 401 Unauthorized
- Invalid JWT → 401 Unauthorized
- Expired JWT → 401 Unauthorized
- Validation errors in request body → 400 Bad Request
- Task not found or not owned by user → 404 Not Found
- Attempt to access another user's data → 403 Forbidden
- Server errors → 500 Internal Server Error
- Errors must be explicit and safe, not leaking sensitive information

## 7. Security Guarantees

- Backend remains stateless by relying on JWT verification
- Authorization enforced on every request
- Task ownership verified at query level using user_id from JWT
- No API endpoint exposes cross-user data
- All sensitive operations are protected by authentication middleware
- Input validation is applied to all request parameters and bodies

## 8. API Response Shape

- All responses must be in JSON format
- Use consistent field names across all endpoints
- Follow Pydantic response models for structured data
- Include appropriate HTTP status codes for all responses

### Standard Task Object Format:
```json
{
  "id": integer,
  "user_id": string,
  "title": string,
  "description": string | null,
  "completed": boolean,
  "created_at": string (ISO 8601 datetime),
  "updated_at": string (ISO 8601 datetime)
}
```

### Standard Error Response Format:
```json
{
  "detail": string
}
```

## 9. Explicit Non-Goals

- No unauthenticated endpoints
- No Next.js API routes for backend functionality
- No direct database access from frontend
- No business logic in frontend
- No management of Better Auth tables or user data
- No implementation of authentication flows in the backend
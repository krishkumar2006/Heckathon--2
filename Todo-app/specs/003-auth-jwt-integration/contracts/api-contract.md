# API Contract: Better Auth JWT → Backend Authorization

## Overview
This document defines the API contracts for JWT-based authentication and authorization between the frontend and backend services.

## Authentication Flow

### 1. JWT Token Retrieval
**Frontend Action**: Retrieve JWT token from Better Auth

**Method**: `GET` or internal client call
**Endpoint**: `/api/auth/token` (via Better Auth client)
**Authentication**: Session-based (cookie)
**Response**:
```json
{
  "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### 2. API Request with JWT
**Frontend Action**: Make authenticated API request

**Headers**:
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

## Protected Endpoints

### GET /api/{user_id}/tasks
**Description**: Retrieve tasks for authenticated user

**Path Parameters**:
- `user_id` (string): User ID from JWT token

**Headers**:
- `Authorization`: Bearer token containing JWT

**Success Response (200)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Task title",
      "completed": false,
      "user_id": "user-123"
    }
  ]
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired JWT token
- `403 Forbidden`: User ID in path doesn't match JWT subject

### POST /api/{user_id}/tasks
**Description**: Create a new task for authenticated user

**Path Parameters**:
- `user_id` (string): User ID from JWT token

**Headers**:
- `Authorization`: Bearer token containing JWT
- `Content-Type`: application/json

**Request Body**:
```json
{
  "title": "New task title",
  "completed": false
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "New task title",
    "completed": false,
    "user_id": "user-123"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired JWT token
- `403 Forbidden`: User ID in path doesn't match JWT subject

### PUT /api/{user_id}/tasks/{task_id}
**Description**: Update an existing task for authenticated user

**Path Parameters**:
- `user_id` (string): User ID from JWT token
- `task_id` (integer): Task ID to update

**Headers**:
- `Authorization`: Bearer token containing JWT
- `Content-Type`: application/json

**Request Body**:
```json
{
  "title": "Updated task title",
  "completed": true
}
```

**Success Response (200)**:
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Updated task title",
    "completed": true,
    "user_id": "user-123"
  }
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired JWT token
- `403 Forbidden`: User ID in path doesn't match JWT subject

### DELETE /api/{user_id}/tasks/{task_id}
**Description**: Delete a task for authenticated user

**Path Parameters**:
- `user_id` (string): User ID from JWT token
- `task_id` (integer): Task ID to delete

**Headers**:
- `Authorization`: Bearer token containing JWT

**Success Response (200)**:
```json
{
  "success": true,
  "message": "Task deleted successfully"
}
```

**Error Responses**:
- `401 Unauthorized`: Invalid or expired JWT token
- `403 Forbidden`: User ID in path doesn't match JWT subject

## JWT Token Structure

### Expected Claims
- `sub` (string): User ID (required)
- `email` (string): User email (optional)
- `iat` (number): Issued at timestamp (required)
- `exp` (number): Expiration timestamp (required)
- `iss` (string): Issuer (optional)

### Validation Requirements
- Token signature must be valid against JWKS from Better Auth
- Token must not be expired
- `sub` claim must be present and contain user ID
- Algorithm must be RS256 or EdDSA

## Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Error message"
  }
}
```

## Authorization Rules

1. All API endpoints require valid JWT in Authorization header
2. User ID in JWT subject must match user ID in path parameter
3. Users can only access their own data
4. Invalid or expired tokens result in 401 Unauthorized
5. User ID mismatch results in 403 Forbidden
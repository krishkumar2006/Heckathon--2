# Task API Contracts

## Overview
This document defines the API contracts for task management operations as specified in the feature requirements.

## Base Path
All task endpoints are prefixed with `/api/tasks`

## Authentication
All endpoints require JWT authentication in the Authorization header:
`Authorization: Bearer <JWT_TOKEN>`

## Endpoints

### 1. Create Task
- **Method**: POST
- **Path**: `/api/tasks`
- **Description**: Creates a new task for the authenticated user
- **Authentication Required**: Yes

#### Request
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Body**:
```json
{
  "title": "string",
  "description": "string (optional)"
}
```

#### Response
- **Success (201)**:
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "user_id": "integer",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```
- **Validation Error (422)**: Invalid input
- **Unauthorized (401)**: Invalid JWT
- **Forbidden (403)**: User not authorized

### 2. Get All Tasks
- **Method**: GET
- **Path**: `/api/tasks`
- **Description**: Retrieves all tasks for the authenticated user
- **Authentication Required**: Yes

#### Request
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`

#### Response
- **Success (200)**:
```json
[
  {
    "id": "integer",
    "title": "string",
    "description": "string",
    "completed": "boolean",
    "user_id": "integer",
    "created_at": "datetime",
    "updated_at": "datetime"
  }
]
```
- **Unauthorized (401)**: Invalid JWT
- **Forbidden (403)**: User not authorized

### 3. Update Task
- **Method**: PUT
- **Path**: `/api/tasks/{task_id}`
- **Description**: Updates an existing task for the authenticated user
- **Authentication Required**: Yes

#### Request
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
  - `Content-Type: application/json`
- **Path Parameters**:
  - `task_id: integer`
- **Body**:
```json
{
  "title": "string",
  "description": "string",
  "completed": "boolean"
}
```

#### Response
- **Success (200)**:
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "user_id": "integer",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```
- **Not Found (404)**: Task does not exist
- **Validation Error (422)**: Invalid input
- **Unauthorized (401)**: Invalid JWT
- **Forbidden (403)**: User not authorized

### 4. Delete Task
- **Method**: DELETE
- **Path**: `/api/tasks/{task_id}`
- **Description**: Deletes an existing task for the authenticated user
- **Authentication Required**: Yes

#### Request
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
- **Path Parameters**:
  - `task_id: integer`

#### Response
- **Success (204)**: No content
- **Not Found (404)**: Task does not exist
- **Unauthorized (401)**: Invalid JWT
- **Forbidden (403)**: User not authorized

### 5. Toggle Task Completion
- **Method**: PATCH
- **Path**: `/api/tasks/{task_id}/complete`
- **Description**: Toggles the completion status of a task
- **Authentication Required**: Yes

#### Request
- **Headers**:
  - `Authorization: Bearer <JWT_TOKEN>`
- **Path Parameters**:
  - `task_id: integer`
- **Body**:
```json
{
  "completed": "boolean"
}
```

#### Response
- **Success (200)**:
```json
{
  "id": "integer",
  "title": "string",
  "description": "string",
  "completed": "boolean",
  "user_id": "integer",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```
- **Not Found (404)**: Task does not exist
- **Validation Error (422)**: Invalid input
- **Unauthorized (401)**: Invalid JWT
- **Forbidden (403)**: User not authorized
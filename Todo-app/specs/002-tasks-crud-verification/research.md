# Research: Tasks CRUD Verification & Correction

## Overview

This research addresses the current state of the Tasks CRUD functionality to identify and resolve the 404 errors mentioned in the specification. The goal is to understand the current implementation and identify the mismatch between frontend API calls and backend endpoints.

## Current Known Issues

Based on the feature specification, the known issues are:
- API Error: 404 - {"detail":"Not Found"}
- POST /tasks → 404
- Backend route mismatch
- Incorrect API base URL
- Wrong HTTP path or method
- Frontend calling an endpoint that does not exist

## Research Tasks

### 1. Investigate Current Backend Routes

**Task**: Find all current task-related API routes in the backend

**Findings**:
- Need to examine the backend FastAPI application for existing task routes
- Check if routes follow the required `/api/tasks` pattern
- Verify JWT middleware is properly applied to all task endpoints

### 2. Examine Frontend API Calls

**Task**: Locate all task-related API calls in the frontend

**Findings**:
- Need to find the dashboard page implementation
- Check the API client in `lib/api.ts`
- Verify the base URL and path prefixes being used
- Confirm JWT token is being sent in Authorization header

### 3. Database Schema Verification

**Task**: Verify the tasks table structure and user_id field

**Findings**:
- Confirm tasks table exists with proper structure
- Verify user_id field exists for proper ownership enforcement
- Check if there are any foreign key constraints needed

### 4. Authentication Flow Analysis

**Task**: Understand the current JWT authentication implementation

**Findings**:
- Verify how JWT tokens are issued by Better Auth
- Confirm how user_id is extracted from JWT tokens
- Check if there are any middleware issues

## Research Results

### Backend Route Analysis

After examining the backend structure, I found that the current task routes may not be following the required `/api/tasks` pattern. The specification requires:

- POST `/api/tasks` for task creation
- GET `/api/tasks` for task retrieval
- PUT `/api/tasks/{task_id}` for task updates
- DELETE `/api/tasks/{task_id}` for task deletion
- PATCH `/api/tasks/{task_id}/complete` for toggling completion status

### Frontend Implementation Analysis

The frontend likely has API calls that are either:
1. Using incorrect path prefixes (not `/api/tasks`)
2. Not using the correct base URL (BACKEND_API_URL=http://localhost:8000)
3. Not properly including JWT tokens in requests

### Authentication and Authorization

The system needs to ensure:
1. JWT tokens are properly verified on all endpoints
2. User ID is extracted from the JWT token
3. All queries are scoped by user_id to enforce ownership

## Decision: Backend Route Implementation

**Decision**: Implement FastAPI routes following the exact specification pattern `/api/tasks`

**Rationale**: The specification explicitly states that all routes must be declared under `router = APIRouter(prefix="/api/tasks", tags=["tasks"])` and any deviation causes 404 errors.

**Alternatives considered**:
- Keep existing route patterns: Would not resolve the 404 errors
- Use different route patterns: Would violate the specification requirements

## Decision: Frontend API Client Update

**Decision**: Update the frontend API client to use the correct base URL and path prefixes

**Rationale**: The frontend must match the backend routes exactly to prevent 404 errors.

**Alternatives considered**:
- Keep existing API calls: Would not resolve the routing mismatch
- Change backend to match frontend: Would violate the specification

## Decision: JWT Enforcement

**Decision**: Ensure all task endpoints have proper JWT verification and user ownership enforcement

**Rationale**: Security requirements mandate that users can only access their own tasks.

**Alternatives considered**:
- Skip JWT verification: Would violate security requirements
- Use different authentication method: Would not align with Better Auth integration

## Implementation Approach

Based on this research, the implementation will involve:

1. **Backend**: Create or update FastAPI routes to follow `/api/tasks` prefix pattern
2. **Frontend**: Update API client to use correct base URL and path prefixes
3. **Authentication**: Ensure proper JWT verification and user scoping
4. **Database**: Verify proper user_id field usage for task ownership
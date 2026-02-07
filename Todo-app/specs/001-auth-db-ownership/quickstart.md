# Quickstart Guide: Authentication Database Ownership

## Overview
This guide provides a quick overview of how to implement the authentication database ownership pattern where Better Auth manages authentication data and the backend manages application data.

## Architecture Summary
- **Frontend**: Next.js application with Better Auth integration
- **Backend**: FastAPI API with JWT verification
- **Database**: Neon PostgreSQL with separate ownership
  - Better Auth: users, sessions, accounts tables
  - Backend: tasks table with user_id references

## Implementation Steps

### 1. Frontend Setup (Next.js + Better Auth)
1. Install Better Auth in the frontend
2. Configure Better Auth to handle registration/login
3. Store JWT tokens from Better Auth
4. Include JWT in API requests to backend

### 2. Backend Setup (FastAPI + JWT)
1. Create JWT verification middleware
2. Extract user_id from JWT tokens
3. Implement user_id scoping for all operations
4. Ensure no direct access to Better Auth tables

### 3. Database Configuration
1. Set up Neon PostgreSQL connection
2. Allow Better Auth to create and manage auth tables
3. Create backend tables with user_id foreign key references
4. Never redefine or migrate Better Auth tables

### 4. API Protection
1. Apply JWT middleware to all endpoints
2. Validate user_id matches resource ownership
3. Return 401/403 for unauthorized access

## Key Validation Points
- ✅ Better Auth manages user registration/login
- ✅ JWT tokens contain user_id for backend validation
- ✅ Backend only accesses its own tables
- ✅ All operations are scoped to authenticated user
- ✅ No direct access to Better Auth tables from backend
# Quickstart Guide: Better Auth JWT → Backend Authorization Integration

## Overview
This guide explains how to implement and use the JWT-based authorization between Better Auth and the backend API.

## Frontend Setup

### 1. Configure Better Auth Client with JWT Plugin
```typescript
// frontend/lib/auth-client.ts
import { createAuthClient, jwtClient } from "better-auth/client";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || "http://localhost:3000",
  plugins: [
    jwtClient()  // Enable JWT client plugin
  ]
});
```

### 2. Retrieve JWT Token for API Calls
```typescript
// In your API service
import { authClient } from "@/lib/auth-client";

async function getJwtToken() {
  const { data, error } = await authClient.token();
  if (error) {
    throw new Error("Failed to retrieve JWT token");
  }
  return data.token;
}

// Use in API calls
async function fetchTasks() {
  const token = await getJwtToken();
  const response = await fetch('/api/tasks', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });
  return response.json();
}
```

## Backend Setup

### 1. JWT Validation Middleware
The backend includes middleware that validates JWT tokens using JWKS from Better Auth:

```python
# backend/middleware/jwt_middleware.py
from fastapi import Request, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from jwt import PyJWKClient
from typing import Dict, Optional
import os

security = HTTPBearer()

async def verify_jwt_token(credentials: HTTPAuthorizationCredentials = Security(security)) -> Dict[str, str]:
    token = credentials.credentials

    # Get JWKS client and fetch signing key
    jwks_url = f"{os.getenv('BETTER_AUTH_URL', 'http://localhost:3000')}/.well-known/jwks.json"
    jwk_client = PyJWKClient(jwks_url)
    signing_key = jwk_client.get_signing_key_from_jwt(token)

    # Verify signature and decode payload
    payload = jwt.decode(
        token,
        signing_key.key,
        algorithms=["EdDSA", "RS256"],
        options={"verify_aud": False}
    )

    # Extract user information
    user_id = payload.get("sub") or payload.get("user_id")
    email = payload.get("email", "")

    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing user_id"
        )

    return {"user_id": user_id, "email": email}
```

### 2. Protected API Endpoints
```python
# backend/api/tasks.py
from fastapi import Depends, APIRouter
from typing import Dict

router = APIRouter()

@router.get("/api/{user_id}/tasks")
async def get_tasks(
    user_id: str,
    current_user: Dict[str, str] = Depends(verify_jwt_token)
):
    # Verify user_id matches token
    if current_user["user_id"] != user_id:
        raise HTTPException(
            status_code=403,
            detail="Forbidden: user_id mismatch"
        )

    # Return user's tasks
    # ... implementation details
```

## Environment Variables
Ensure these environment variables are set:
- `BETTER_AUTH_URL`: URL of your Better Auth instance
- `NEON_DATABASE_URL`: Connection string for Neon PostgreSQL database

## Testing
1. Login through the frontend
2. Make API calls with the retrieved JWT token
3. Verify that:
   - Valid tokens allow access to user's own data
   - Invalid tokens return 401 Unauthorized
   - Mismatched user IDs return 403 Forbidden
   - Other users' data cannot be accessed
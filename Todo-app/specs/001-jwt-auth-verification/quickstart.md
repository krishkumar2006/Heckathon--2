# Quickstart: JWT Token Issuance, Verification & Backend Enforcement

## Overview
This quickstart guide helps you understand and implement JWT-based authentication for the todo application using Better Auth and FastAPI.

## Prerequisites
- Better Auth configured in the frontend
- FastAPI backend with SQLModel ORM
- Shared secret for JWT signing/validation
- Neon PostgreSQL database

## Setup Steps

### 1. Configure Better Auth JWT Plugin
```javascript
import { BetterAuth } from "better-auth";
import { jwt } from "better-auth/plugins";

const auth = BetterAuth({
  // ... other config
  plugins: [
    jwt({
      secret: process.env.BETTER_AUTH_SECRET,
    }),
  ],
});
```

### 2. Verify JWT Token in Frontend
```typescript
import { auth } from "./lib/auth";

const verifyJWT = async () => {
  const session = await auth.getSession();
  console.log("JWT present:", !!session?.jwt);
  console.log("JWT value:", session?.jwt);
  return session?.jwt;
};
```

### 3. Create Authenticated API Client
```typescript
// frontend/src/lib/api-client.ts
const createAuthenticatedRequest = async (endpoint: string, options = {}) => {
  const session = await auth.getSession();
  const jwtToken = session?.jwt;

  if (!jwtToken) {
    throw new Error("No JWT token available");
  }

  return fetch(`http://localhost:8000/api${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${jwtToken}`,
      "Content-Type": "application/json",
    },
  });
};
```

### 4. Implement JWT Verification Middleware (FastAPI)
```python
# backend/src/middleware/jwt_middleware.py
from fastapi import HTTPException, Request
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
from typing import Optional

security = HTTPBearer()

def verify_jwt(token: str) -> Optional[dict]:
    try:
        payload = jwt.decode(
            token,
            settings.JWT_SECRET,
            algorithms=["RS256"]
        )
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token has expired")
    except jwt.JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

async def jwt_middleware(request: Request, credentials: HTTPAuthorizationCredentials = security):
    token = credentials.credentials
    user_data = verify_jwt(token)
    request.state.user_id = user_data.get("sub")
    return user_data
```

### 5. Protect Backend Endpoints
```python
# backend/src/api/tasks.py
from fastapi import Depends
from middleware.jwt_middleware import jwt_middleware

@app.get("/api/tasks")
async def get_tasks(user_data: dict = Depends(jwt_middleware)):
    user_id = user_data.get("sub")
    # Query tasks for specific user_id
    return {"tasks": get_user_tasks(user_id)}
```

## Testing the Implementation

### 1. Verify JWT Issuance
- Complete login/signup flow
- Check browser console for JWT token logging
- Confirm JWT is present in session object

### 2. Test API Requests
- Make authenticated requests to backend endpoints
- Verify Authorization header contains Bearer token
- Confirm backend accepts valid JWT and rejects invalid ones

### 3. Validate User Isolation
- Log in as different users
- Verify each user only sees their own data
- Test that users cannot access other users' data
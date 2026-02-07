# JWT Authentication API Contract

## Overview
This contract defines the API endpoints and behaviors for JWT-based authentication and authorization in the todo application.

## Authentication Flow Contract

### JWT Token Issuance
- **Source**: Better Auth frontend library
- **Method**: Upon successful login/signup via Better Auth
- **Result**: JWT token is included in session object
- **Token Format**: Standard JWT with header.payload.signature structure

### JWT Token Structure
```
{
  "header": {
    "alg": "RS256",
    "typ": "JWT"
  },
  "payload": {
    "sub": "<user_id>",        // Required: User identifier
    "email": "<email>",        // Optional: User email
    "exp": <timestamp>,        // Required: Expiration time
    "iat": <timestamp>         // Optional: Issued at time
  }
}
```

## Backend API Contract

### Authorization Header Format
- **Header**: `Authorization: Bearer <JWT_TOKEN>`
- **Required**: For all protected endpoints
- **Validation**: Backend must verify JWT signature and expiration
- **Failure Response**: `401 Unauthorized` with error message

### User Identity Extraction
- **Claim**: `sub` (subject) from JWT payload
- **Usage**: Backend uses this value to scope user-specific operations
- **Validation**: Must match the authenticated user context

## Frontend API Client Contract

### Request Format
```typescript
fetch('/api/endpoint', {
  method: 'GET',
  headers: {
    'Authorization': `Bearer ${jwtToken}`,
    'Content-Type': 'application/json'
  }
})
```

### Session Retrieval
```typescript
const session = await auth.getSession();
const jwtToken = session?.jwt; // JWT token available in session
```

## Error Responses

### 401 Unauthorized
- **Cause**: Missing, invalid, or expired JWT token
- **Response Body**:
```json
{
  "error": "Unauthorized",
  "message": "Valid JWT token required for this endpoint"
}
```

### 403 Forbidden
- **Cause**: JWT is valid but user lacks permission for specific resource
- **Response Body**:
```json
{
  "error": "Forbidden",
  "message": "Access denied for this resource"
}
```
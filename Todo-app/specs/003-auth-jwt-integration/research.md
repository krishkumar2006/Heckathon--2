# Research: Better Auth JWT → Backend Authorization Integration

## Decision: Token Type and Retrieval Method

Better Auth with the JWT plugin enabled issues **actual JWT tokens** that can be validated independently by the backend. However, the JWT token is not automatically included in the standard session object returned by `getSession()`.

## Rationale

Based on analysis of Better Auth documentation and the current codebase:

1. Better Auth's JWT plugin does issue real JWT tokens when properly configured
2. The JWT token must be retrieved using specific methods, not from the standard session object
3. The current frontend code is incorrectly trying to get the token from `sessionData.data.session.token`
4. The correct approach is to use the `jwtClient()` plugin or call the `/api/auth/token` endpoint directly
5. The backend should validate JWT tokens using JWKS without making additional calls to Better Auth

## Current Issue Analysis

**Problem**: The frontend is trying to retrieve a JWT token from the session object, but Better Auth's JWT token needs to be retrieved using specific methods when the JWT plugin is enabled.

**Current Incorrect Approach**:
```typescript
const sessionData: any = await authClient.getSession();
token = sessionData.data.session.token || null;
```

**Correct Approach**:
1. Use the `jwtClient()` plugin in the frontend client configuration
2. Retrieve the JWT token using `authClient.token()` method
3. Backend validates the JWT using JWKS from Better Auth

## Alternatives Considered

1. **Keep using session tokens**: This would require backend to call Better Auth for validation, violating the stateless requirement
2. **Hybrid approach**: Using both session and JWT tokens would add complexity and potential for errors
3. **Custom token handling**: This would go against Better Auth's documented approach and create maintenance overhead

## Token Contract Definition

**Frontend**:
- Use `authClient.token()` to retrieve JWT from Better Auth
- Send as `Authorization: Bearer <JWT_TOKEN>` header

**Backend**:
- Validate JWT using JWKS endpoint from Better Auth
- Extract user ID from `sub` claim
- Use extracted user ID for authorization and data scoping

## Backend Validation Strategy

The backend will use Strategy A (JWT Validation) as recommended:
- Decode JWT using JWKS
- Verify signature
- Extract `sub` (user_id) claim
- Reject expired tokens
- No calls to Better Auth APIs for validation
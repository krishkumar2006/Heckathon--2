# Authentication and Authorization Specification - Phase II

## 1. Authentication Overview

Authentication for the Todo Full-Stack Web Application is handled by Better Auth. Better Auth runs in the frontend (Next.js) and provides the authentication layer for the application. The backend (FastAPI) does not manage login or sessions directly, but instead verifies JWT tokens issued by Better Auth to authenticate users and authorize their access to resources.

## 2. Better Auth Configuration

Better Auth is integrated with Neon PostgreSQL database for storing authentication-related data. Better Auth creates and manages the following tables in the shared database:

- `users`: Stores user account information
- `sessions`: Tracks active user sessions
- `accounts`: Manages third-party authentication providers (if applicable)

The same DATABASE_URL used by the FastAPI backend is also used by Better Auth in the Next.js frontend. Better Auth exclusively owns and manages all authentication-related tables and must not be overridden by the backend.

## 3. JWT Issuance Model

Better Auth is configured to issue JWT tokens upon successful login or signup. The JWT contains the following claims:

- `sub` (subject): The user_id of the authenticated user
- `email`: The user's email address
- `iat` (issued at): Unix timestamp when the token was issued
- `exp` (expiration): Unix timestamp when the token expires

JWT tokens expire after 7 days from issuance. This provides a balance between user convenience and security by requiring periodic re-authentication.

## 4. Shared Secret Configuration

The `BETTER_AUTH_SECRET` environment variable serves as the shared signing key for JWT tokens. This secret is used by:

- The frontend (Next.js) to configure Better Auth for signing JWTs
- The backend (FastAPI) to verify the authenticity of JWTs received from clients

Both frontend and backend must use the same secret value to ensure proper token validation. Secrets are provided exclusively via environment variables and must never be hardcoded in the application code.

## 5. Frontend Authentication Responsibilities

The frontend handles all aspects of the authentication flow:

- Manage signup and signin flows using Better Auth UI/SDK components
- Maintain user session state through Better Auth's session management
- Retrieve JWT token from Better Auth after successful authentication
- Attach JWT token to every backend API request using the header format: `Authorization: Bearer <token>`
- Handle token refresh and expiration gracefully, prompting users to re-authenticate when necessary

## 6. Backend Authentication & Authorization Responsibilities

The backend is responsible for verifying authentication and enforcing authorization:

- Verify JWT token on every protected request using a middleware
- Reject requests without valid tokens with HTTP 401 Unauthorized status
- Extract authenticated user identity from the validated JWT
- Enforce user-level authorization by ensuring users can only access their own data
- Never trust user_id passed in request body or URL parameters alone; always derive the authenticated user from the JWT

## 7. Authorization Enforcement Rules

All backend routes under `/api/` must be protected by JWT verification:

- User identity must be derived exclusively from the verified JWT
- When accessing user-specific resources, the user_id in the URL path must match the authenticated user's ID from the JWT
- The backend must reject any access attempts where the requested resource belongs to a different user (HTTP 403 Forbidden)
- Authorization checks are performed at the API level to prevent unauthorized access to data

## 8. Security Guarantees

The authentication system provides the following security guarantees:

- User data isolation is enforced at both API and database levels
- The backend remains stateless by relying on stateless JWT verification
- No backend calls to frontend for authentication verification (completely decoupled)
- JWT tokens expire automatically after 7 days, requiring re-authentication
- All authentication-related operations are secured against common attacks

## 9. Error Handling

The system handles authentication and authorization errors consistently:

- Requests without tokens → HTTP 401 Unauthorized
- Invalid, malformed, or expired tokens → HTTP 401 Unauthorized
- Authorization mismatches (user trying to access another user's data) → HTTP 403 Forbidden
- All error responses are explicit and do not leak sensitive information about the existence of resources

## 10. Explicit Non-Goals

The following are explicitly out of scope for this authentication specification:

- Password handling or storage in the backend
- Session storage or management in the backend
- Creation of API routes in Next.js for authentication (all auth handled by Better Auth)
- Custom authentication logic outside of Better Auth's established patterns
- Direct database manipulation of authentication tables by the backend
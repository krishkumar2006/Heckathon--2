# Research: JWT Token Issuance, Verification & Backend Enforcement

## Overview
This research document addresses all unknowns and clarifications needed for implementing JWT token issuance, verification, and backend enforcement for the Better Auth + FastAPI integration.

## Decision: JWT Configuration for Better Auth
**Rationale**: Better Auth needs to be configured to issue JWT tokens upon successful authentication. This requires the JWT plugin to be properly registered with the correct secret.

**Implementation**:
- Configure Better Auth with the jwt() plugin
- Ensure the same secret is shared between Better Auth and the FastAPI backend
- Verify that JWT tokens are included in the session object after authentication

**Alternatives considered**:
- Using session cookies instead of JWT tokens (rejected - spec requires JWT-only authentication)
- Custom JWT implementation (rejected - Better Auth provides built-in JWT support)

## Decision: Frontend JWT Retrieval and Propagation
**Rationale**: The frontend must retrieve JWT tokens from the session and include them in the Authorization header for all backend API requests.

**Implementation**:
- Use Better Auth's getSession() method to retrieve the session with JWT
- Create an API client that automatically adds the Authorization: Bearer <JWT> header
- Ensure all authenticated requests use this client

**Alternatives considered**:
- Storing JWT in localStorage (rejected - security concerns, session storage is preferred)
- Passing JWT in URL parameters (rejected - security concerns, headers are the standard approach)

## Decision: Backend JWT Verification Middleware
**Rationale**: The FastAPI backend must verify JWT tokens for all protected endpoints to ensure proper authorization.

**Implementation**:
- Create JWT verification middleware using python-jose or similar library
- Extract user_id from the JWT payload (specifically the 'sub' claim)
- Validate token signature and expiration
- Return 401 Unauthorized for invalid tokens

**Alternatives considered**:
- Using Better Auth's server-side APIs (rejected - backend must only trust JWT tokens as per spec)
- Custom token validation (rejected - standard JWT libraries provide secure validation)

## Decision: User Identity Extraction
**Rationale**: The backend needs to extract user identity from the JWT token to enforce user-level data isolation.

**Implementation**:
- Extract user_id from the 'sub' claim in the JWT payload
- Use this user_id to scope all database queries
- Ensure all endpoints validate that the requesting user can only access their own data

**Alternatives considered**:
- Extracting user_id from other claims (rejected - 'sub' is the standard claim for subject/user ID)
- Using request body for user identification (rejected - violates spec requirement to use JWT only)
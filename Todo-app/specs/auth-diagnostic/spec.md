---
name: "Authentication Diagnostic & Normalization"
description: "Audit, debug, and correct Better Auth authentication so signup, login, session persistence, and protected routing work exactly as required."
version: "1.2.0"
status: "repair"
---

# Authentication Diagnostic & Normalization Spec

## Context

Authentication has already been implemented using:
- Better Auth (frontend)
- FastAPI backend
- JWT-based authentication
- Protected routing using `(authenticated)` layout

However, authentication is not functioning correctly:
- Signup/login redirects occur but auth state is not recognized
- Protected layout reports user is unauthenticated
- Session resolution fails silently
- `/api/auth/get-session` returns 404

This spec exists to **diagnose, correct, and normalize** authentication according to project requirements and official Better Auth documentation.

---

## Documentation Authority (MANDATORY)

Claude Code **MUST** use **Context-7 MCP Server** to reference:

- Official Better Auth documentation
- Session handling behavior
- Recommended Next.js App Router integration patterns

No assumptions or undocumented behavior is allowed.

---

## Canonical Authentication Flow (NON-NEGOTIABLE)

### Signup Flow (New User)

1. User visits `/signup`
2. User submits valid credentials
3. Better Auth creates account
4. Session/JWT is issued
5. User becomes authenticated
6. User is redirected to `/dashboard`

Signup implicitly logs the user in.

---

### Login Flow (Existing User)

1. User visits `/login`
2. User submits valid credentials
3. Session/JWT is issued
4. User becomes authenticated
5. User is redirected to `/dashboard`

---

### Authenticated Navigation Rules

| State | `/login` | `/signup` | `/dashboard` |
|-----|---------|-----------|---------------|
| Unauthenticated | ✅ Allowed | ✅ Allowed | ❌ Redirect to `/login` |
| Authenticated | ❌ Redirect to `/dashboard` | ❌ Redirect to `/dashboard` | ✅ Allowed |

---

### Logout Flow

1. User logs out
2. Session is destroyed
3. JWT becomes invalid
4. User is redirected to `/login`
5. `/dashboard` becomes inaccessible

---

## Goals

- Signup and login work reliably
- Session persists across refresh
- Protected routes work correctly
- No silent auth failures
- Auth state is resolved before route blocking
- Frontend and backend auth contracts align

---

## Constraints

- Do NOT add new auth systems
- Do NOT bypass authentication
- Do NOT add Next.js API routes
- Do NOT expose session internals as features
- Backend remains FastAPI-only
- Better Auth remains sole auth provider

---

## Allowed Skills (AUTH ONLY)

- better_auth_jwt_issuance_frontend_session_configuration.md
- protected_routing_auth_state_session_management.md
- fastapi_jwt_verification_middleware_auth_context.md
- jwt_authentication_authorization_enforcement.md

---

## Diagnostic Process (STRICT ORDER)

1. Verify Better Auth routes and base URLs
2. Verify environment variables consistency
3. Verify session issuance and retrieval
4. Verify frontend auth provider placement
5. Verify protected layout timing and logic
6. Verify redirect rules (login/signup/dashboard)
7. Verify backend JWT validation
8. Remove redundant or conflicting auth logic

---

## Required Outputs

Claude Code MUST deliver:

1. Working signup → dashboard flow
2. Working login → dashboard flow
3. Persistent session across refresh
4. Correct protected routing behavior
5. `AUTH_FLOW.md` documenting final flow
6. Cleaned authentication codebase

---

## Acceptance Criteria

- Signup redirects to `/dashboard`
- Login redirects to `/dashboard`
- Authenticated users cannot access `/login` or `/signup`
- Unauthenticated users cannot access `/dashboard`
- Refresh preserves session
- Backend rejects unauthenticated API calls with 401
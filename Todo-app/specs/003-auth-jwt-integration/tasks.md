# Tasks: Better Auth JWT → Backend Authorization **Verification & Fix**

**Feature**: `003-auth-jwt-integration-fix`  
**Generated**: 2025-12-26  
**Spec**: `specs/003-auth-jwt-integration/spec.md`  
**Plan**: `specs/003-auth-jwt-integration/plan.md`

---

## Implementation Strategy

**Scope**  
This task list is **strictly corrective**.  
All core setup (Better Auth, Neon DB, backend, frontend, dashboard, CRUD UI) **already exists**.
we are not getting 404 not found error in crud we have 401 which means tasks move but authorization is incorrect

The goal is to:
- Identify **why JWT works in frontend but fails in backend**
- Align token **format, validation, and user identity**
- Fix **401 Unauthorized** without rebuilding anything

⚠️ Claude MUST:
- Reuse existing files
- Modify logic only where incorrect
- Never create alternate auth flows

---

## Dependencies

- JWT is already issued by Better Auth
- Tasks table already exists
- Dashboard UI already exists
- API routes already exist
- Errors reproduced and confirmed

---

## Phase 1: Reality Check — Token Type & Contract (NO CODE)

### Goal  
Confirm **what token is actually being issued and sent**

- [x] T001 Inspect existing Better Auth configuration in `frontend/lib/auth.ts`
- [x] T002 Log the **exact token value** sent in `Authorization` header
- [x] T003 Confirm whether token:
  - Is a real JWT (`header.payload.signature`)
  - OR is a session token (opaque string)
- [x] T004 Compare token behavior against Better Auth docs using **Context-7 MCP server**
- [x] T005 Document final conclusion inside spec (no guessing allowed)

🚫 Do NOT modify backend until token type is confirmed.

---

## Phase 2: Frontend Token Usage Verification (NO NEW FILES)

### Goal  
Ensure frontend sends the **correct token field**, not just “a token”

- [ ] T006 Verify token extraction logic in existing `frontend/lib/api.ts`
- [x] T007 Ensure token source matches Better Auth docs (NOT assumptions)
- [x] T008 Confirm `Authorization: Bearer <token>` format exactly
- [ ] T009 Remove any fallback or mixed token usage logic
- [ ] T010 Add inline comment explaining token source and purpose

---

## Phase 3: Backend Validation Strategy Alignment (CRITICAL)

### Goal  
Backend must validate **exactly one token type**, correctly

- [ ] T011 Inspect existing backend auth middleware (do NOT replace)
- [ ] T012 Confirm backend expects:
  - JWT → local verification  
  - OR session token → external validation  
- [ ] T013 Remove **hybrid validation logic** (JWT + session fallback)
- [ ] T014 Match backend validation method to **actual token type**
- [ ] T015 Ensure middleware:
  - Rejects invalid tokens with `401`
  - Injects `request.state.user_id`
  - Does NOT call Better Auth randomly

⚠️ If token is NOT JWT → backend must NOT try `jwt.decode()`.

---

## Phase 4: User Identity Mapping Fix

### Goal  
Ensure user identity is consistent across auth & tasks

- [x] T016 Confirm which field represents user identity (`sub`, `user.id`, etc.)
- [x] T017 Ensure backend uses **only injected user_id**
- [x] T018 Remove any reliance on path params like `/api/{user_id}/tasks`
- [ ] T019 Ensure tasks are always scoped internally by token user_id
- [x] T020 Verify cross-user access is impossible

---

## Phase 5: CRUD Authorization Verification (NO NEW ROUTES)

### Goal  
Fix 401 errors during task operations

- [ ] T021 Verify GET `/api/tasks` works with valid token
- [ ] T022 Verify POST `/api/tasks` works after login
- [ ] T023 Verify PUT/PATCH `/api/tasks/{id}` respects ownership
- [ ] T024 Verify DELETE `/api/tasks/{id}` respects ownership
- [ ] T025 Ensure errors are:
  - 401 → unauthenticated
  - 403 → wrong user
  - NOT mixed

---

## Phase 6: Debug Logging & Cleanup

### Goal  
Make failures understandable, not silent

- [ ] T026 Improve backend auth debug logs (no sensitive data)
- [ ] T027 Log token rejection reasons clearly
- [ ] T028 Remove misleading logs (e.g. “Session validation succeeded” when user is rejected)
- [ ] T029 Verify frontend error messages match backend responses

---

## Phase 7: Final Validation Checklist

### Goal  
Ensure problem is **actually solved**

- [ ] T030 Login → dashboard loads without auth warning
- [ ] T031 Tasks load without 401
- [ ] T032 Task creation works
- [ ] T033 Task update works
- [ ] T034 Task delete works
- [ ] T035 Token expiration produces clean 401
- [ ] T036 No hybrid auth remains
- [ ] T037 Spec reflects final correct workflow

---

## Explicit Constraints (Must Follow)

- ❌ Do NOT create new auth files
- ❌ Do NOT rename folders
- ❌ Do NOT re-install auth
- ❌ Do NOT add cookies unless documented
- ❌ Do NOT guess token format
- ✅ Use **existing files only**
- ✅ Fix logic, not architecture

---

## Outcome

When these tasks are complete:

- Better Auth works ✔️  
- JWT/session contract is clear ✔️  
- Backend validates correctly ✔️  
- CRUD works without 401 ✔️  
- Claude stops “thinking differently” ✔️  

---

### ✅ Final Confirmation

This task file is:
- **Accurate**
- **Non-destructive**
- **Aligned with your real project**
- **Safe to give to Claude Code**
- **Impossible to misinterpret if followed**

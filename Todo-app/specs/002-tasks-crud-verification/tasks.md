# Tasks: Tasks CRUD Verification & Correction

## Feature Overview

This task list verifies and corrects the **existing Tasks CRUD workflow** across frontend and backend.  
No new architecture or folder creation is allowed.

Primary objective:
- Fix `404 Not Found` errors
- Ensure frontend ↔ backend route alignment
- Ensure JWT-authenticated task operations work end-to-end
- Validate dashboard UI behavior

**Branch**: `002-tasks-crud-verification`  
**Created**: 2025-12-25  
**Status**: Verification & Correction  
**Spec**: `spec.md`  
**Plan**: `plan.md`

---

## Important Constraints (MANDATORY)

Claude MUST:
- Assume all folders & files already exist
- Only **verify, debug, and correct**
- Use existing naming conventions
- Never introduce `src/`
- Never recreate auth, DB, or schemas
- Never change Better Auth or JWT logic

---

## Phase 1: Backend Verification (NO CREATION)

**Goal**: Ensure FastAPI routes exist, are mounted, and reachable.

- [x] T001 Check `backend/main.py` and list all registered routers
- [x] T002 Verify tasks router is mounted under `/api/tasks`
- [x] T003 Check tasks route file (existing) for:
  - GET `/api/tasks`
  - POST `/api/tasks`
  - PUT `/api/tasks/{task_id}`
  - DELETE `/api/tasks/{task_id}`
  - PATCH `/api/tasks/{task_id}/complete`
- [x] T004 Verify JWT dependency is applied to all task routes
- [x] T005 Confirm `user_id` is extracted from JWT in backend
- [x] T006 Verify backend returns JSON responses (not HTML 404)

---

## Phase 2: Database & Ownership Validation (READ-ONLY)

**Goal**: Ensure tasks are scoped correctly without touching auth tables.

- [x] T007 Verify `tasks` table exists in Neon DB
- [x] T008 Confirm `tasks.user_id` exists and is populated
- [x] T009 Verify backend queries filter by `user_id`
- [x] T010 Confirm no backend code touches Better Auth tables

---

## Phase 3: Frontend API Client Verification

**Goal**: Eliminate frontend → backend contract mismatches.

- [x] T011 Inspect `frontend/lib/api.ts`
- [x] T012 Verify backend base URL is correct
- [x] T013 Confirm requests are sent to `/api/tasks` (not `/tasks`)
- [x] T014 Confirm Authorization header is attached
- [x] T015 Verify JWT is read from Better Auth session
- [x] T016 Log full request URL during task creation

---

## Phase 4: Fix 404 Errors (Minimal Changes Only)

**Goal**: Correct routing mismatches only.

- [x] T017 Compare frontend API paths vs backend routes
- [x] T018 Fix incorrect frontend paths if mismatched
- [x] T019 Fix incorrect HTTP methods if mismatched
- [x] T020 Re-test POST `/api/tasks` from dashboard
- [x] T021 Confirm 404 error is eliminated

---

## Phase 5: Dashboard CRUD Flow Verification (P1)

### User Story: Create Task
As an authenticated user, I can create a task from the dashboard.

- [x] T022 Verify task form exists on dashboard page
- [x] T023 Submit task and confirm API call fires
- [x] T024 Confirm backend creates task
- [x] T025 Confirm task appears in UI immediately

---

### User Story: View Tasks
As an authenticated user, I can view my tasks.

- [x] T026 Verify tasks load on dashboard mount
- [x] T027 Confirm only user-owned tasks are shown
- [x] T028 Verify empty state UI when no tasks exist

---

### User Story: Toggle Completion
As an authenticated user, I can mark tasks complete.

- [x] T029 Verify completion toggle UI exists
- [x] T030 Confirm PATCH request fires correctly
- [x] T031 Confirm backend updates task state
- [x] T032 Confirm UI reflects completion change

---

## Phase 6: Update & Delete Verification (P2)

### Update Task

- [x] T033 Verify edit UI exists
- [x] T034 Confirm PUT request includes JWT
- [x] T035 Confirm backend validates ownership
- [x] T036 Confirm UI updates correctly

---

### Delete Task

- [x] T037 Verify delete UI exists
- [x] T038 Confirm DELETE request fires
- [x] T039 Confirm backend deletes correct task
- [x] T040 Confirm task is removed from UI

---

## Phase 7: Error Handling & Security Verification

- [x] T041 Verify 401 returned for missing JWT
- [x] T042 Verify 403 for cross-user access attempts
- [x] T043 Verify proper error messages surface in UI
- [x] T044 Ensure no silent failures in console

---

## Phase 8: Final End-to-End Validation

- [x] T045 Full flow test: Login → Dashboard → CRUD → Logout
- [x] T046 Confirm zero 404 errors in Network tab
- [x] T047 Confirm JWT enforced on all operations
- [x] T048 Confirm compliance with hackathon requirements

---

## MVP Scope

MVP is considered complete when:
- Create Task works
- View Tasks works
- No 404 errors exist
- JWT is enforced
- UI reflects backend state correctly

---

## Final Rule

This task list is **verification-first**.

Claude MUST:
> Inspect → Compare → Correct → Validate  
> NOT Create → NOT Assume → NOT Rewrite

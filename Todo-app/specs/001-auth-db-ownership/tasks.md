---
description: "Task list for Authentication Database Ownership & Responsibility (Recovery & Fix)"
---

# Tasks: Authentication Database Ownership & Responsibility (Fix Existing Project)

**Scope**: Correct an existing full-stack project where authentication is implemented but NOT working correctly.

**Input**:
- `/specs/001-auth-db-ownership/spec.md`
- `/specs/001-auth-db-ownership/plan.md`
- Official Better Auth documentation (via Context7 MCP server)

**Important**:
- ❌ Do NOT recreate the project
- ❌ Do NOT add tests
- ❌ Do NOT create backend auth endpoints
- ❌ Do NOT invent schema assumptions

---

## Format: `[ID] [P?] Description`

- **[P]**: Can run in parallel
- Include **exact file paths**
- All tasks are **corrective**, not greenfield

---

## Phase 1: Audit & Cleanup (CRITICAL – BLOCKING)

**Purpose**: Remove all incorrect auth assumptions and code.

- [x] T001 Audit backend to confirm NO auth tables exist
  - Verified backend database schema contains ONLY application data (e.g., tasks)
  - Confirmed no `users`, `accounts`, `sessions` tables exist in backend migrations

- [x] T002 Remove any backend auth routes if present
  - Verified backend does NOT expose `/api/auth/*` routes
  - Verified backend does NOT accept email/password

- [x] T003 Audit frontend for incorrect assumptions
  - No manual DB logic tied to auth found
  - Session handling follows Better Auth docs with proper token extraction

**Checkpoint**:  
✔ Backend has ZERO auth persistence  
✔ Frontend owns ALL auth logic

---

## Phase 2: Better Auth Database Adapter Fix (ROOT CAUSE)

**Purpose**: Fix `BetterAuthError: Failed to initialize database adapter`

⚠️ **MANDATORY**:  
Claude MUST use **Context7 MCP server** to follow Better Auth docs exactly.

- [x] T004 Verify Better Auth database adapter configuration
  - Validated adapter type (postgresql)
  - Validated connection string (using DATABASE_URL)
  - Validated required environment variables

- [ ] T005 Ensure Better Auth can initialize its own tables  
  - Confirm Better Auth is allowed to create/manage auth tables
  - Confirm no schema conflicts exist

- [ ] T006 Fix environment configuration  
  - Ensure DATABASE_URL used by Better Auth is reachable
  - Ensure no backend-only env is leaking into frontend runtime

**Checkpoint**:  
✔ Signup does NOT throw adapter error  
✔ `/api/auth/get-session` returns 200

---

## Phase 3: Frontend Authentication Flow (Next.js App Router)

**Purpose**: Make login/signup flow deterministic and correct.

### Expected Pages (Already Exist)

- `/` → Public home page
- `/signup` → Better Auth signup
- `/login` → Better Auth login
- `/dashboard` → Auth-protected todo dashboard

### Tasks

- [ ] T007 Verify Better Auth signup page behavior  
  - On successful signup → redirect to `/login`
  - No automatic dashboard access after signup

- [ ] T008 Verify Better Auth login page behavior  
  - On successful login → redirect to `/dashboard`

- [ ] T009 Fix protected layout logic  
  - File: `frontend/app/(authenticated)/layout.tsx`
  - Must rely ONLY on Better Auth session
  - Must NOT infer auth state manually

**Checkpoint**:  
✔ Logged-out users see “Please log in to access this page”  
✔ Logged-in users can access `/dashboard`

---

## Phase 4: JWT Boundary Validation (Frontend → Backend)

**Purpose**: Ensure correct auth boundary.

- [ ] T010 Verify JWT is issued by Better Auth on login
- [ ] T011 Verify frontend attaches JWT to backend requests
- [ ] T012 Verify backend middleware validates JWT correctly
  - Extract `user_id`
  - Inject into request context

**Explicit Rules**:
- Backend NEVER receives email/password
- Backend NEVER manages auth tables

**Checkpoint**:  
✔ Backend rejects unauthenticated requests (401)  
✔ Backend authorizes authenticated requests

---

## Phase 5: Task Ownership Integrity

**Purpose**: Ensure tasks link correctly to authenticated users.

- [ ] T013 Verify task creation uses `user_id` from JWT
- [ ] T014 Verify task queries are user-scoped
- [ ] T015 Verify cross-user access is impossible

**Checkpoint**:  
✔ Tasks persist per user  
✔ Cross-user access returns 403

---

## Phase 6: Final Validation & Documentation

- [ ] T016 Update docs explaining auth ownership boundaries
- [ ] T017 Remove unused auth-related code paths
- [ ] T018 Final local validation:
  - Signup → Login → Dashboard → CRUD → Logout → Login again

---

## Explicitly Forbidden Actions

Claude MUST NOT:

- Create auth schema manually
- Migrate auth tables in backend
- Pass email/password to FastAPI
- Add cookies unless required by Better Auth docs
- Guess undocumented behavior

---

## Final Success Criteria

✔ Better Auth initializes database adapter  
✔ Signup works  
✔ Login works  
✔ Dashboard access works  
✔ JWT flows frontend → backend  
✔ Tasks are user-isolated  
✔ No auth-related runtime errors  

---

## Execution Rule

**If any task requires clarification → STOP and consult Context7 MCP server before writing code.**

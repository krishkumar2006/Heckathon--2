# Implementation Plan: Advanced Intelligent Task Features

**Feature ID**: 005-advanced-intelligent-task-features
**Branch**: `feature/advanced-intelligent-tasks`
**Input Spec**: `/specs/005-advanced-intelligent-task-features-spec/spec.md`
**Project State**:
- Authentication (Better Auth + JWT) → ✅ Working
- Backend (FastAPI + Neon + SQLModel) → ✅ Connected
- Tasks CRUD → ⚠️ Exists but extended here
- No new services or infra required

---

## Technical Context

### Architecture Overview
- Frontend: Next.js 16+ App Router with TypeScript
- Backend: FastAPI with SQLModel ORM
- Database: Neon Serverless PostgreSQL
- Authentication: Better Auth with JWT

### Current State
- Existing task model and CRUD operations are functional
- Authentication and user scoping are working
- Need to extend task model with intelligent features

### Technology Stack
- Python 3.11 (Backend)
- TypeScript/JavaScript (Frontend)
- Next.js 16+ (Frontend)
- FastAPI (Backend)
- SQLModel (ORM)
- Neon PostgreSQL (Database)
- Better Auth (Authentication)
- JWT (Authentication)

### Known Dependencies
- `backend/models/task.py` - existing task model
- `backend/crud/task.py` - existing CRUD operations
- `backend/routes/tasks.py` - existing API endpoints
- `frontend/components/task/TaskItem.tsx` - existing task UI component
- `frontend/app/dashboard/page.tsx` - task management interface

### Integration Points
- Task model needs extension with new fields
- CRUD operations need to handle new fields
- API endpoints need to accept new parameters
- Frontend forms need new UI elements
- Browser notifications API for reminders

---

## Constitution Check

### Compliance Verification
- ✅ Follows spec-first development approach
- ✅ Respects phase boundaries (no chatbot features in Phase II)
- ✅ Uses existing auth system (Better Auth + JWT)
- ✅ Uses existing database (Neon PostgreSQL)
- ✅ Maintains user data isolation
- ✅ No breaking changes to existing functionality

### Architectural Alignment
- ✅ Single Neon PostgreSQL database
- ✅ Better Auth manages users/sessions/accounts
- ✅ Backend owns tasks table
- ✅ JWT-based authentication
- ✅ Stateless architecture

---

## Phase 0: Pre-Check (MANDATORY)

> Claude MUST verify these before proceeding

- [x] Confirm `models/task.py` already exists
- [x] Confirm tasks table exists in Neon DB
- [x] Confirm JWT auth middleware is already enforced
- [x] Confirm CRUD endpoints already work without these features

All pre-checks verified successfully.

---

## Phase 1: Data Model Extension (Blocking)

### Goal
Extend the existing Task model with new intelligent fields.

### Tasks

- [x] P001 Open `backend/models/task.py`
- [x] P002 Add the following fields **without removing existing ones**:

  ```python
  due_date: Optional[datetime]
  is_recurring: bool = False
  recurrence_type: Optional[str]  # daily | weekly | monthly
  recurrence_interval: int = 1
  next_run_at: Optional[datetime]
  reminder_at: Optional[datetime]
  ```

- [x] P003 Ensure all new fields are nullable and backward-compatible
- [x] P004 Update SQLModel metadata only (no table rename)

---

## Phase 2: Database Migration (Blocking)

### Goal
Apply schema changes safely to Neon PostgreSQL.

### Tasks
- [x] P005 Generate migration using the existing Neon + SQLModel workflow
- [x] P006 Review migration to ensure:
  - No table drops
  - Only column additions
- [x] P007 Apply migration to Neon DB
- [x] P008 Verify new columns exist using a SELECT query

---

## Phase 3: Backend Logic — Due Dates

### Goal
Enable due date storage and usage.

### Tasks
- [x] P009 Update task create endpoint to accept due_date
- [x] P010 Update task update endpoint to allow modifying due_date
- [x] P011 Ensure due_date is validated as datetime
- [x] P012 Ensure overdue logic is NOT enforced server-side (UI only)

---

## Phase 4: Backend Logic — Recurring Tasks (Core Intelligence)

### Goal
Auto-generate next task instance on completion.

### Tasks
- [x] P013 Update task completion logic (existing endpoint)
- [x] P014 On completion:
  - Check is_recurring == true
  - Calculate next due date based on recurrence_type
- [x] P015 Create new task with:
  - Same title & description
  - New due_date
  - Same recurrence rules
  - is_completed = false
- [x] P016 Ensure:
  - Only ONE new task is created
  - Completed task remains unchanged

---

## Phase 5: Frontend — Due Date UI

### Goal
Allow users to set and view due dates.

### Tasks
- [x] P017 Add date picker to task form
- [x] P018 Display due date in task list
- [x] P019 Highlight overdue tasks visually
- [x] P020 Ensure due date sorting works visually (no backend sort yet)

---

## Phase 6: Frontend — Recurring UI

### Goal
Allow users to configure recurrence.

### Tasks
- [x] P021 Add recurrence toggle to task form
- [x] P022 Add recurrence type dropdown
- [x] P023 Disable recurrence inputs when toggle is off
- [x] P024 Display recurrence badge on task cards

---

## Phase 7: Frontend — Time Reminders (Browser Only)

### Goal
Trigger reminders using browser notifications.

### Tasks
- [x] P025 Add reminder time picker
- [x] P026 Request Notification permission once
- [x] P027 On task load:
  - Schedule reminders using setTimeout
- [x] P028 Ensure reminder fires only once
- [x] P029 Do NOT persist reminder timers in backend

---

## Phase 8: Integration Verification

### Goal
Ensure everything works together.

### Tasks
- [x] P030 Create task with due date → verify storage
- [x] P031 Complete recurring task → verify next task created
- [x] P032 Reload page → reminders still work
- [x] P033 Verify no duplicate recurring tasks
- [x] P034 Verify no JWT or CRUD regression

---

## Phase 9: UX & Edge Case Handling

### Tasks
- [x] P035 Handle timezone safely (use ISO timestamps)
- [x] P036 Prevent reminder scheduling for past dates
- [x] P037 Show friendly UI messages for invalid inputs
- [x] P038 Ensure tasks remain user-isolated

---

## Implementation Notes

The implementation plan has been successfully applied to the existing codebase. All features for Advanced Intelligent Task Features have been implemented:

1. Due dates for tasks
2. Recurring tasks functionality
3. Browser-based reminders
4. Proper loading states for all operations
5. Professional UI with dark theme
6. Full integration with existing authentication system
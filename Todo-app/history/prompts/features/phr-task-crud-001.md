---
id: phr-task-crud-001
title: task-crud-spec
stage: spec
date: 2025-12-21
surface: /sp.specify
model: claude-sonnet-4-5-20250929
feature: task-crud
branch:
user: basharsheikh
command: /sp.specify read prompt.md for new spec
labels: [specification, crud, task-management]
links:
  spec: specs/features/task-crud.md
  ticket:
  adr:
  pr:
files:
- path: specs/features/task-crud.md
  action: created
  summary: Task CRUD operations specification
tests:

---

## Prompt

Create specs/features/task-crud.md for Phase II of the Todo Full-Stack Web Application.

This spec defines the business-level behavior, rules, and acceptance criteria
for task creation, retrieval, updating, deletion, and completion.

Follow the Phase II constitution strictly.
This spec depends on:
- @specs/database/schema.md
- @specs/features/authentication.md
- @specs/api/rest-endpoints.md

================================================================================
MANDATORY IMPLEMENTATION SKILLS (MUST BE USED)
================================================================================

Claude Code MUST apply the following skills when implementing this spec:

- frontend_api_integration_authenticated_data_flow.md
- protected_routing_auth_state_session_management.md
- secure_rest_api_implementation_user_scoped_task_operations

These skills are authoritative and must not be redefined or bypassed.

================================================================================
REQUIRED CONTENT OF THE TASK CRUD FEATURE SPEC
================================================================================

The spec MUST include the following sections and details:

---

## 1. Feature Overview
- Describe task CRUD as the core functionality of the application
- Clarify that all task operations are user-scoped and authenticated
- State that all task actions require a valid JWT

---

## 2. User Stories
Include the following user stories exactly:

- As a user, I can create a new task
- As a user, I can view all my tasks
- As a user, I can update a task
- As a user, I can delete a task
- As a user, I can mark a task complete

---

## 3. Task Creation Rules

### Create Task Acceptance Criteria
- Title is required
- Title length must be between 1 and 200 characters
- Description is optional
- Description length must not exceed 1000 characters
- Task is automatically associated with the authenticated user
- New tasks are created as incomplete by default

Explain:
- user_id is derived from JWT, not client input
- Backend enforces all validation rules

---

## 4. View Tasks Rules

### View Tasks Acceptance Criteria
- Only tasks belonging to the authenticated user are returned
- Tasks display at minimum:
  - title
  - completion status
  - created_at timestamp
- Support filtering by status:
  - all
  - pending
  - completed

Explain:
- Filtering is enforced server-side
- No cross-user task visibility is allowed

---

## 5. Update Task Rules
- A user may update:
  - title
  - description
- Validation rules apply on update
- Only the task owner may update a task
- Attempts to update non-owned tasks must be rejected

---

## 6. Delete Task Rules
- A user may delete their own tasks
- Deleting a task permanently removes it
- Only the task owner may delete a task

---

## 7. Mark Task Complete Rules
- A user may mark a task as complete or incomplete
- Completion status is a boolean toggle
- Only the task owner may change completion status

---

## 8. Authorization Enforcement
- All task operations require authentication
- Backend must enforce ownership at query level
- Authorization failures must not leak task existence

---

## 9. Error Handling
- Invalid input → 400 Bad Request
- Unauthorized request → 401 Unauthorized
- Forbidden access → 403 Forbidden
- Task not found (owned by another user) → 404 Not Found
- Errors must be explicit and safe

---

## 10. Frontend Interaction Expectations (Non-UI)
- Frontend must use authenticated API client
- JWT must be attached to all task-related requests
- Frontend must not attempt to manage task ownership
- Frontend must rely on backend responses as source of truth

---

## 11. Explicit Non-Goals
- No unauthenticated task access
- No shared tasks between users
- No client-side task ownership enforcement
- No UI layout or styling definitions
- No database schema definitions

---

This task CRUD feature spec must be:
- Precise and implementation-ready
- Fully aligned with authentication and API specs
- Focused on behavior and rules
- Free of UI and backend implementation details

Do NOT include implementation code.
Do NOT redefine API endpoints.
Do NOT reference other project phases.

## Response snapshot

Created the task-crud specification file in specs/features/task-crud.md with all required sections. The specification includes:

1. Feature Overview - Describing task CRUD as core functionality with JWT authentication
2. User Stories - All 5 required user stories
3. Task Creation Rules - With validation criteria and JWT-based user association
4. View Tasks Rules - With filtering and server-side enforcement
5. Update Task Rules - With ownership validation
6. Delete Task Rules - With ownership validation
7. Mark Task Complete Rules - With completion toggle functionality
8. Authorization Enforcement - With backend enforcement
9. Error Handling - With specific HTTP status codes
10. Frontend Interaction Expectations - With authenticated API requirements
11. Explicit Non-Goals - With clear boundaries

The specification follows all requirements and includes user scenarios, functional requirements, key entities, and success criteria.

## Outcome

- ✅ Impact: Created comprehensive task CRUD specification ready for implementation
- 🧪 Tests:
- 📁 Files: Created specs/features/task-crud.md, specs/features/checklists/task-crud-requirements.md
- 🔁 Next prompts: /sp.plan to create implementation plan
- 🧠 Reflection: Specification follows all required sections and constraints

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL):
- Prompt variant (if applicable):
- Next experiment (smallest change to try):
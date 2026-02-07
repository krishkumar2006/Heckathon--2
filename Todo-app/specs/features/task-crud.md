# Feature Specification: Task CRUD Operations

**Feature File**: `task-crud.md`
**Created**: 2025-12-21
**Status**: Draft
**Input**: User description: "Create specs/features/task-crud.md for Phase II of the Todo Full-Stack Web Application. This spec defines the business-level behavior, rules, and acceptance criteria for task creation, retrieval, updating, deletion, and completion. Follow the Phase II constitution strictly. This spec depends on: @specs/database/schema.md, @specs/features/authentication.md, @specs/api/rest-endpoints.md"

## 1. Feature Overview

Task CRUD operations form the core functionality of the Todo application. All task operations are user-scoped and authenticated, requiring a valid JWT for access. The system ensures that users can only interact with their own tasks, maintaining data isolation and security.

## 2. User Stories

- As a user, I can create a new task
- As a user, I can view all my tasks
- As a user, I can update a task
- As a user, I can delete a task
- As a user, I can mark a task complete

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

## 5. Update Task Rules
- A user may update:
  - title
  - description
- Validation rules apply on update
- Only the task owner may update a task
- Attempts to update non-owned tasks must be rejected

## 6. Delete Task Rules
- A user may delete their own tasks
- Deleting a task permanently removes it
- Only the task owner may delete a task

## 7. Mark Task Complete Rules
- A user may mark a task as complete or incomplete
- Completion status is a boolean toggle
- Only the task owner may change completion status

## 8. Authorization Enforcement
- All task operations require authentication
- Backend must enforce ownership at query level
- Authorization failures must not leak task existence

## 9. Error Handling
- Invalid input → 400 Bad Request
- Unauthorized request → 401 Unauthorized
- Forbidden access → 403 Forbidden
- Task not found (owned by another user) → 404 Not Found
- Errors must be explicit and safe

## 10. Frontend Interaction Expectations (Non-UI)
- Frontend must use authenticated API client
- JWT must be attached to all task-related requests
- Frontend must not attempt to manage task ownership
- Frontend must rely on backend responses as source of truth

## 11. Explicit Non-Goals
- No unauthenticated task access
- No shared tasks between users
- No client-side task ownership enforcement
- No UI layout or styling definitions
- No database schema definitions

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Create New Task (Priority: P1)

As a user, I can create a new task with a title and optional description.

**Why this priority**: This is the foundational functionality that enables all other task operations - without the ability to create tasks, the application has no value.

**Independent Test**: Can be fully tested by submitting a new task with valid title and verifying it appears in the user's task list, delivering the core value of task tracking.

**Acceptance Scenarios**:

1. **Given** user is authenticated, **When** user submits a task with valid title (1-200 chars), **Then** new task is created as incomplete with current timestamp
2. **Given** user is authenticated, **When** user submits a task with invalid title (empty or >200 chars), **Then** system returns validation error

---

### User Story 2 - View My Tasks (Priority: P1)

As a user, I can view all my tasks with filtering options.

**Why this priority**: Essential for users to access and manage their tasks, enabling the core use case of task management.

**Independent Test**: Can be fully tested by creating tasks and viewing them with different filters, delivering visibility into user's tasks.

**Acceptance Scenarios**:

1. **Given** user has created tasks, **When** user requests all tasks, **Then** only user's tasks are returned with title, status, and timestamp
2. **Given** user has mixed completed/pending tasks, **When** user filters by status, **Then** only matching tasks are returned

---

### User Story 3 - Update Existing Task (Priority: P2)

As a user, I can update my task's title and description.

**Why this priority**: Enables users to refine and modify their tasks as circumstances change, improving task management flexibility.

**Independent Test**: Can be fully tested by updating an existing task and verifying changes persist, delivering task maintenance capabilities.

**Acceptance Scenarios**:

1. **Given** user owns a task, **When** user updates task title/description, **Then** changes are saved with validation applied
2. **Given** user attempts to update non-owned task, **When** user makes update request, **Then** system returns 404 Not Found

---

### User Story 4 - Mark Task Complete (Priority: P2)

As a user, I can mark a task as complete or incomplete.

**Why this priority**: Critical for task management workflow, allowing users to track progress and mark accomplishments.

**Independent Test**: Can be fully tested by toggling task completion status and verifying the change, delivering task lifecycle management.

**Acceptance Scenarios**:

1. **Given** user owns a task, **When** user marks task complete/incomplete, **Then** task status is updated
2. **Given** user attempts to update non-owned task status, **When** user makes request, **Then** system returns 404 Not Found

---

### User Story 5 - Delete Task (Priority: P3)

As a user, I can delete my tasks permanently.

**Why this priority**: Allows users to clean up unwanted tasks, maintaining a relevant task list.

**Independent Test**: Can be fully tested by deleting a task and verifying it no longer appears in the list, delivering task cleanup functionality.

**Acceptance Scenarios**:

1. **Given** user owns a task, **When** user deletes task, **Then** task is permanently removed
2. **Given** user attempts to delete non-owned task, **When** user makes delete request, **Then** system returns 404 Not Found

---

### Edge Cases

- What happens when user tries to create a task with exactly 201 characters in title?
- How does system handle attempts to access tasks owned by other users?
- What occurs when user tries to update a task that was deleted by another session?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST require valid JWT authentication for all task operations
- **FR-002**: System MUST associate all created tasks with the authenticated user's ID derived from JWT
- **FR-003**: System MUST validate task titles are between 1 and 200 characters when creating/updating
- **FR-004**: System MUST validate task descriptions do not exceed 1000 characters when creating/updating
- **FR-005**: System MUST create new tasks with completion status set to false by default
- **FR-006**: System MUST return only tasks owned by the authenticated user when retrieving tasks
- **FR-007**: System MUST support filtering retrieved tasks by completion status (all, pending, completed)
- **FR-008**: System MUST allow users to update their own tasks' title and description with validation
- **FR-009**: System MUST allow users to update their own tasks' completion status
- **FR-010**: System MUST allow users to permanently delete their own tasks
- **FR-011**: System MUST reject operations on tasks not owned by the authenticated user with 404 status
- **FR-012**: System MUST return appropriate error codes (400, 401, 403, 404) based on error type
- **FR-013**: System MUST ensure server-side enforcement of all authorization and filtering rules
- **FR-014**: System MUST prevent cross-user task visibility at the query level
- **FR-015**: System MUST provide explicit but safe error messages that don't leak sensitive information

### Key Entities

- **Task**: Represents a user's task with title, description, completion status, and creation timestamp
- **User**: Identity represented by JWT token that owns tasks and performs operations

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create a new task in under 3 seconds with valid input
- **SC-002**: Users can view their complete task list in under 2 seconds for collections up to 1000 tasks
- **SC-003**: 95% of task operations succeed when performed by authenticated users on their own tasks
- **SC-004**: 100% of unauthorized cross-user task access attempts are properly rejected
- **SC-005**: Users can update task completion status with immediate reflection in subsequent views
- **SC-006**: System maintains data integrity with zero instances of task ownership violations
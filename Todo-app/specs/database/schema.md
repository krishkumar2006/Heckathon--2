# Feature Specification: Database Schema

**Feature Branch**: `5-database-schema`
**Created**: 2025-12-20
**Status**: Draft
**Input**: User description: "Create specs/database/schema.md for Phase II of the Todo Full-Stack Web Application. This spec defines the complete database schema for the backend using Neon Serverless PostgreSQL and SQLModel. Follow the Phase II constitution strictly. This project uses Better Auth for authentication and FastAPI for backend logic."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Secure Multi-User Task Storage (Priority: P1)

A user creates, updates, and manages their todo tasks, with the system ensuring their data is securely stored and isolated from other users' data.

**Why this priority**: This is the core functionality that enables the persistent todo system with proper user data isolation.

**Independent Test**: Can be fully tested by having multiple users create tasks and verifying that each user only sees their own tasks, delivering the fundamental value of secure, isolated data storage.

**Acceptance Scenarios**:

1. **Given** a logged-in user, **When** they create a task, **Then** the task is stored with their user identity and only accessible to them
2. **Given** multiple users with tasks, **When** each user accesses their tasks, **Then** they only see their own tasks and never others' data

---

### User Story 2 - Reliable Task Data Persistence (Priority: P1)

A user's tasks persist reliably across sessions and application restarts, maintaining data integrity and availability.

**Why this priority**: Essential for a todo application to maintain user trust and provide value - tasks must not be lost.

**Independent Test**: Can be fully tested by creating tasks, logging out, and verifying the tasks persist when the user user logs back in.

**Acceptance Scenarios**:

1. **Given** a user with created tasks, **When** they log out and log back in, **Then** their tasks are still available
2. **Given** the application has been restarted, **When** a user logs in, **Then** their previously created tasks remain intact

---

### User Story 3 - Performant Task Access (Priority: P2)

A user accesses their tasks quickly, with the system providing responsive query performance even as their task list grows.

**Why this priority**: Important for user experience as task lists grow over time.

**Independent Test**: Can be fully tested by creating multiple tasks and verifying responsive access times.

**Acceptance Scenarios**:

1. **Given** a user with many tasks, **When** they access their task list, **Then** the results return within acceptable time limits

---

### Edge Cases

- What happens when a user attempts to access tasks that don't belong to them?
- How does the system handle attempts to create tasks without a valid user identity?
- What occurs when database connection is temporarily unavailable during task operations?
- How does the system handle concurrent access to the same user's tasks from different sessions?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST use Neon Serverless PostgreSQL as the persistent storage layer
- **FR-002**: System MUST support a multi-user, authenticated application
- **FR-003**: System MUST allow both authentication data and application data to exist in the same database but be owned and managed by different systems
- **FR-004**: System MUST NOT redefine, migrate, or duplicate Better Auth tables
- **FR-005**: System MUST ONLY reference users via user_id extracted from JWT tokens
- **FR-006**: System MUST support strict user isolation in the database schema
- **FR-007**: System MUST create a users table (managed by Better Auth) with fields: id (string, primary key), email (string, unique), name (string), created_at (timestamp)
- **FR-008**: System MUST NOT define SQLModel models for Better Auth's users table
- **FR-009**: System MUST NOT write to or modify Better Auth's users table directly
- **FR-010**: System MUST identify users ONLY through JWT tokens issued by Better Auth
- **FR-011**: System MUST define a tasks table with the following fields: id (integer, primary key), user_id (string, foreign key → users.id), title (string, not null), description (text, nullable), completed (boolean, default false), created_at (timestamp), updated_at (timestamp)
- **FR-012**: System MUST ensure user_id references users.id managed by Better Auth
- **FR-013**: System MUST require user_id for every task record
- **FR-014**: System MUST use user_id to enforce per-user data isolation
- **FR-015**: System MUST ensure a user can only create, view, update, or delete their own tasks
- **FR-016**: System MUST filter all task queries by user_id
- **FR-017**: System MUST create an index on tasks.user_id for efficient filtering of tasks by authenticated user
- **FR-018**: System MUST create an index on tasks.completed for efficient filtering by completion status
- **FR-019**: System MUST ensure tasks cannot exist without a valid user_id
- **FR-020**: System MUST enforce task ownership at the database query level
- **FR-021**: System MUST ensure cross-user access is strictly forbidden
- **FR-022**: System MUST ensure backend authorization logic aligns with the database schema
- **FR-023**: System MUST use SQLModel for backend ORM mapping
- **FR-024**: System MUST create a SQLModel model only for the tasks table
- **FR-025**: System MUST NOT create SQLModel models for Better Auth tables
- **FR-026**: System MUST use DATABASE_URL environment variable for database connection string
- **FR-027**: System MUST ensure Better Auth is responsible for its own database migrations
- **FR-028**: System MUST ensure backend migrations apply ONLY to application-owned tables (tasks)
- **FR-029**: System MUST ensure migrations never alter or depend on Better Auth tables
- **FR-030**: System MUST ensure to use this skill for database schema work accurately present inside .claude folder (**database_schema_implementation_neon_postgresql_integration.md**)

### Key Entities

- **Task**: Represents a todo item belonging to a specific user, contains id (integer primary key), user_id (string foreign key referencing users.id), title (string, not null), description (text, nullable), completed (boolean with default false), created_at (timestamp), updated_at (timestamp)
- **User Identity**: Represents authenticated user identity extracted from JWT tokens, used to enforce task ownership and access control, referencing users.id from Better Auth
- **Database Connection**: Represents the connection to Neon Serverless PostgreSQL database using environment-provided DATABASE_URL

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Database schema supports multi-user task storage with proper data isolation between users
- **SC-002**: Task creation, retrieval, update, and deletion operations work reliably for authenticated users
- **SC-003**: Performance requirements are met with appropriate indexing on user_id and completed fields
- **SC-004**: Data integrity rules prevent orphaned tasks and enforce user ownership
- **SC-005**: The database schema aligns with the Phase II constitution and architecture requirements
- **SC-006**: Authentication and application data coexist in the same database but are properly separated by ownership
- **SC-007**: All task queries are properly filtered by user_id to ensure data isolation
---
description: "Task list for Phase II Full-Stack Todo Application Implementation"
---

# Tasks: Phase II Full-Stack Todo Application

**Input**: Design documents from `/specs/` and implementation skills from `/.claude/skills/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), database/schema.md, features/authentication.md, api/rest-endpoints.md, ui/pages.md, and all skills in .claude/skills/

**Tests**: No explicit test requirements in the feature specification - tests are NOT included.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `backend/`, `frontend/`

## Phase 1: Setup (Shared Infrastructure using skills)

**Purpose**: Project initialization and basic structure using the full_stack_project_initialization_monorepo_setup.md skill

- [X] T001 [P] Apply full_stack_project_initialization_monorepo_setup.md skill to create monorepo structure with backend/ and frontend/ directories
- [X] T002 [P] Initialize backend with FastAPI dependencies using uv in backend/pyproject.toml
- [X] T003 [P] Initialize frontend with Next.js dependencies in frontend/package.json
- [X] T004 [P] Configure environment variables in root .env and .env.example files
- [X] T005 Apply docker_compose_local_to_cloud_deployment_enablement.md skill to set up Docker Compose for local development in docker-compose.yml
- [X] T006 Apply environment_configuration_cors_production_readiness.md skill to configure CORS settings for frontend-backend communication in backend/main.py
 - [X] T006.1 Explicitly forbid use of Next.js API routes and document backend-only API usage in frontend/CLAUDE.md
 - [X] T006.2 Define shared environment variables contract (.env.example) including BETTER_AUTH_SECRET, DATABASE_URL, FRONTEND_URL

---

## Phase 2: Foundational (Blocking Prerequisites using skills)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T007 Apply database_schema_implementation_neon_postgresql_integration.md skill to set up database connection framework using SQLModel in backend/db.py
- [X] T008 [P] Apply better_auth_jwt_issuance_frontend_session_configuration.md skill to configure Better Auth in frontend for JWT issuance in frontend/lib/auth.ts
- [X] T009 [P] Apply fastapi_jwt_verification_middleware_auth_context.md skill to implement JWT verification middleware in backend/middleware/jwt.py
 - [X] T009.1 Enforce JWT validation failure returns 401 Unauthorized globally
 - [X] T009.2 Decode JWT and inject authenticated user context (user_id, email) into request.state
- [X] T010 Apply database_schema_implementation_neon_postgresql_integration.md skill to create Task model in backend/models/task.py following database schema requirements
- [X] T011 Set up FastAPI application structure with proper routing in backend/main.py
- [X] T012 Apply monorepo_structure_spec_kit_compatible_project_layout.md skill to configure environment variables management in both frontend and backend
- [X] T013 Apply jwt_authentication_authorization_enforcement.md skill to implement authentication context for backend API routes in backend/auth.py
 - [X] T013.1 Enforce user_id matching: JWT user_id MUST match task ownership on every operation
 - [X] T013.2 Explicitly document that Better Auth manages users table and backend must not create it



**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Access Multi-User Todo Application (Priority: P1) 🎯 MVP

**Goal**: Enable users to register, log in, and persist tasks across sessions with secure authentication using skills

**Independent Test**: Register a new user account, create tasks, verify they persist across browser sessions and device access, delivering the fundamental value of a web-based todo system.

### Implementation for User Story 1

- [X] T014 [P] [US1] Apply protected_routing_auth_state_session_management.md skill to create protected routing system in frontend for auth state management in frontend/app/(authenticated)/layout.tsx
- [X] T015 [P] [US1] Apply frontend_api_integration_authenticated_data_flow.md skill to create frontend API integration service for authenticated data flow in frontend/lib/api.ts
- [X] T016 [US1] Apply responsive_todo_ui_rendering_interaction.md skill to implement home page UI with hero section and CTA in frontend/app/page.tsx
- [X] T017 [US1] Apply better_auth_jwt_issuance_frontend_session_configuration.md skill to create authentication pages integration using Better Auth in frontend/app/(auth)/login/page.tsx and frontend/app/(auth)/signup/page.tsx
- [X] T018 [US1] Implement user registration and login functionality in frontend using Better Auth in frontend/components/auth/AuthForm.tsx
- [X] T019 [US1] Apply protected_routing_auth_state_session_management.md skill to create session management system in frontend for JWT handling in frontend/contexts/AuthContext.tsx
- [X] T020 [US1] Apply secure_rest_api_implementation_user_scoped_task_operations.md skill to implement task creation endpoint POST /api/tasks in backend/routes/tasks.py
 - [X] T020.1 Enforce user scoping internally via JWT; do NOT accept user_id from client body
- [X] T021 [US1] Apply secure_rest_api_implementation_user_scoped_task_operations.md skill to implement task listing endpoint GET /api/tasks in backend/routes/tasks.py
- [X] T022 [US1] Apply jwt_authentication_authorization_enforcement.md skill to add user authentication validation to all task endpoints in backend/routes/tasks.py
- [X] T023 [US1] Apply responsive_todo_ui_rendering_interaction.md skill to implement frontend task creation UI in frontend/app/(authenticated)/dashboard/page.tsx
- [X] T024 [US1] Apply frontend_api_integration_authenticated_data_flow.md skill to connect frontend task creation to backend API with proper authentication in frontend/services/task-service.ts
- [X] T025 [US1] Apply database_schema_implementation_neon_postgresql_integration.md skill to implement task persistence and retrieval with user isolation in backend/crud/task.py
- [X] T026 [US1] Add error handling for authentication and task operations in both frontend and backend
 - [X] T026.1 Implement JWT expiration handling and automatic re-authentication flow in frontend

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Secure Task Management (Priority: P1)

**Goal**: Enable users to perform all standard todo operations (create, read, update, delete) on their tasks while maintaining data security and user isolation using skills

**Independent Test**: Log in as a user, perform all CRUD operations on tasks, verify operations work correctly and securely.

### Implementation for User Story 2

- [X] T027 [P] [US2] Apply secure_rest_api_implementation_user_scoped_task_operations.md skill to implement task update endpoint PUT /api/tasks/{task_id} in backend/routes/tasks.py
- [X] T028 [P] [US2] Apply secure_rest_api_implementation_user_scoped_task_operations.md skill to implement task delete endpoint DELETE /api/tasks/{task_id} in backend/routes/tasks.py
- [X] T029 [P] [US2] Apply secure_rest_api_implementation_user_scoped_task_operations.md skill to implement task completion endpoint PATCH /api/tasks/{task_id}/complete in backend/routes/tasks.py
- [X] T030 [US2] Apply jwt_authentication_authorization_enforcement.md skill to add authorization checks to ensure users can only access their own tasks in backend/routes/tasks.py
 - [X] T030.1 Return 403 Forbidden when user attempts to access tasks they do not own
- [X] T031 [US2] Apply responsive_todo_ui_rendering_interaction.md skill to implement frontend task update UI functionality in frontend/components/task/TaskItem.tsx
- [X] T032 [US2] Apply responsive_todo_ui_rendering_interaction.md skill to implement frontend task deletion UI functionality in frontend/components/task/TaskItem.tsx
- [X] T033 [US2] Apply responsive_todo_ui_rendering_interaction.md skill to implement frontend task completion toggle in frontend/components/task/TaskItem.tsx
- [X] T034 [US2] Apply frontend_api_integration_authenticated_data_flow.md skill to connect frontend CRUD operations to backend API with proper authentication in frontend/services/task-service.ts
- [X] T035 [US2] Add validation and error handling for all CRUD operations in both frontend and backend
- [X] T036 [US2] Apply database_schema_implementation_neon_postgresql_integration.md skill to implement user-level data isolation enforcement in backend/crud/task.py

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Cross-Device Task Access (Priority: P2)

**Goal**: Enable users to access their todo list from multiple devices and browsers, maintaining consistent task data across all platforms using skills

**Independent Test**: Log in from different devices/browsers and verify task synchronization and consistency.

### Implementation for User Story 3

- [X] T037 [P] [US3] Apply responsive_todo_ui_rendering_interaction.md skill to implement responsive UI components for task display in frontend/components/
- [X] T038 [P] [US3] Apply responsive_todo_ui_rendering_interaction.md skill to enforce consistent responsive UI using Tailwind CSS in frontend according to specs/ui/styling.md
- [X] T039 [US3] Enhance task listing with proper filtering and sorting options in backend/routes/tasks.py and frontend/services/task-service.ts
- [X] T040 [US3] Apply protected_routing_auth_state_session_management.md skill to implement proper session management across devices in frontend
- [X] T041 [US3] Add loading states and error boundaries for network operations in frontend/components/
- [X] T042 [US3] Optimize task data fetching for consistent cross-device experience in frontend/services/task-service.ts
- [X] T043 [US3] Apply better_auth_jwt_issuance_frontend_session_configuration.md skill to implement proper JWT token refresh and expiration handling in frontend/contexts/AuthContext.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T044 [P] Apply jwt_authentication_authorization_enforcement.md skill to add comprehensive error handling across frontend and backend
- [X] T045 [P] Add proper logging and monitoring infrastructure in backend/utils/logger.py
- [X] T046 Apply jwt_authentication_authorization_enforcement.md skill to add security hardening for all API endpoints and frontend
- [X] T047 [P] Apply environment_configuration_cors_production_readiness.md skill to add proper environment configuration for production readiness
- [X] T048 Apply database_schema_implementation_neon_postgresql_integration.md skill to add proper database indexing based on schema requirements
- [X] T049 Apply docker_compose_local_to_cloud_deployment_enablement.md skill to implement proper deployment configuration with Docker Compose
- [X] T050 Run end-to-end validation of all user stories
 - [X] T050.1 Verify backend rejects all unauthenticated requests with 401
 - [X] T050.2 Verify cross-user task access is impossible
 - [X] T050.3 Verify JWT secret mismatch breaks authentication (security test)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Builds on US1 functionality
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Builds on US1/US2 functionality

### Within Each User Story

- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all parallel tasks for User Story 1 together:
Task: "Apply protected_routing_auth_state_session_management.md skill to create protected routing system in frontend for auth state management"
Task: "Apply frontend_api_integration_authenticated_data_flow.md skill to create frontend API integration service for authenticated data flow"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Apply implementation skills as specified in each task
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence


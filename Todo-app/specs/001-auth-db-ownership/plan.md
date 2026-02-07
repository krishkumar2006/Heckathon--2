# Implementation Plan: Authentication Database Ownership & Responsibility

**Branch**: `001-auth-db-ownership` | **Date**: 2025-12-23 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/001-auth-db-ownership/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement clear separation of responsibilities between Better Auth (handling authentication data) and the backend (handling application data). This feature ensures authentication data (users, sessions, accounts) is managed exclusively by Better Auth in Neon PostgreSQL, while application data (tasks) is managed by the backend with proper user_id scoping from JWT tokens. The implementation will enforce data isolation and prevent direct backend access to authentication tables.

## Technical Context

**Language/Version**: Python 3.11 (Backend), TypeScript/JavaScript (Frontend), Next.js 16+
**Primary Dependencies**: Better Auth, FastAPI, SQLModel, Neon PostgreSQL, JWT
**Storage**: Neon PostgreSQL (shared database instance with separate ownership)
**Testing**: pytest (backend), Jest/React Testing Library (frontend)
**Target Platform**: Web application (Linux server deployment)
**Project Type**: Web (frontend + backend monorepo)
**Performance Goals**: <2 second registration/login completion, <100ms JWT verification
**Constraints**: Must not access Better Auth tables directly, must enforce user data isolation
**Scale/Scope**: Multi-user application supporting thousands of users with isolated data

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

**Architecture Compliance Check:**
- ✅ **Database Ownership Rule (6.118-6.131)**: Better Auth will own users/sessions/accounts tables; backend will own tasks table only
- ✅ **Authentication Rule (7.133-7.148)**: Authentication via Better Auth frontend, authorization via backend JWT verification
- ✅ **REST API Rule (8.150-8.163)**: All endpoints will be under `/api/` and protected with JWT tokens
- ✅ **Stateless Backend Rule (9.165-9.176)**: Backend will be stateless with JWT tokens and database records for state
- ✅ **Frontend/Backend Separation (5.58-5.89)**: Frontend handles UI and sessions, backend handles API and data persistence
- ✅ **Spec-Driven Development (4.90-4.99)**: Implementation follows the defined specification
- ✅ **Forbidden Actions Check**: Backend will NOT redefine/migrate Better Auth tables, NOT store credentials, NOT query auth tables directly

## Project Structure

### Documentation (this feature)

```text
specs/001-auth-db-ownership/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
backend/
├── src/
│   ├── models/
│   │   ├── user.py          # Better Auth user reference model
│   │   └── task.py          # Task model with user_id reference
│   ├── services/
│   │   ├── auth.py          # JWT verification service
│   │   └── task_service.py  # Task operations with user scoping
│   ├── api/
│   │   ├── auth.py          # Auth middleware
│   │   └── tasks.py         # Task endpoints with user_id validation
│   └── main.py              # FastAPI app entry point
└── tests/
    ├── unit/
    └── integration/

frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   │   └── api.js           # Authenticated API client
│   └── lib/
│       └── auth.js          # Better Auth integration
└── tests/
    ├── unit/
    └── integration/
```

**Structure Decision**: Web application structure selected with separate frontend (Next.js) and backend (FastAPI) services as defined in constitution sections 5.58-5.89. The frontend handles UI and Better Auth sessions, while the backend provides protected API endpoints and manages task data with proper user scoping.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| Shared database instance | Performance and cost optimization | Separate databases would increase complexity and costs |

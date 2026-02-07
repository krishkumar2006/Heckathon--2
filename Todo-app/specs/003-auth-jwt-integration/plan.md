# Implementation Plan: Better Auth JWT → Backend Authorization Integration

**Branch**: `003-auth-jwt-integration` | **Date**: 2025-12-26 | **Spec**: [specs/003-auth-jwt-integration/spec.md](spec.md)
**Input**: Feature specification from `/specs/003-auth-jwt-integration/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implementation of proper JWT token handling between Better Auth and the backend API to resolve 401 Unauthorized errors during task CRUD operations. The frontend will correctly retrieve JWT tokens from Better Auth using the jwtClient plugin, and the backend will validate these tokens using JWKS without making additional calls to Better Auth. This ensures secure, stateless authentication with proper user isolation.

## Technical Context

**Language/Version**: Python 3.11 (Backend), TypeScript/JavaScript (Frontend)
**Primary Dependencies**: Better Auth, FastAPI, SQLModel, Next.js 16+, Neon PostgreSQL, JWT
**Storage**: Neon PostgreSQL database with tasks table (user-owned data)
**Testing**: pytest (Backend), Jest/React Testing Library (Frontend)
**Target Platform**: Linux server (Backend), Web browser (Frontend)
**Project Type**: Web application (Full-stack with separate frontend and backend)
**Performance Goals**: <500ms token validation, 200ms p95 for task CRUD operations
**Constraints**: Stateless backend, no additional calls to Better Auth for token validation, user-specific data access only
**Scale/Scope**: Multi-user task management system, secure user isolation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

1. **Architecture Compliance**: ✅ Plan follows the required monorepo architecture with clear separation of frontend and backend.
2. **Spec-Driven Development**: ✅ Implementation is based on the existing feature specification.
3. **Database Constitution**: ✅ Plan respects the separation of database ownership (Better Auth owns user/session tables, backend owns tasks).
4. **Authentication & Authorization Rules**: ✅ Plan implements frontend authentication via Better Auth and backend authorization via JWT validation.
5. **REST API Enforcement**: ✅ Plan ensures all endpoints are protected and user identity comes from JWT.
6. **Stateless Backend Requirement**: ✅ Plan ensures the backend validates JWTs locally without maintaining server-side state.

## Project Structure

### Documentation (this feature)

```text
specs/003-auth-jwt-integration/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```


**Structure Decision**: Web application structure selected with separate backend and frontend directories as required by the constitution.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| [e.g., 4th project] | [current need] | [why 3 projects insufficient] |
| [e.g., Repository pattern] | [specific problem] | [why direct DB access insufficient] |

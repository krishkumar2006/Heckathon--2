<!-- SYNC IMPACT REPORT
Version change: N/A (initial) → 1.0.0
Modified principles: N/A
Added sections: All principles and sections (initial creation based on prompt.md)
Removed sections: N/A
Templates requiring updates:
  - .specify/templates/plan-template.md ✅ updated
  - .specify/templates/spec-template.md ✅ updated
  - .specify/templates/tasks-template.md ✅ updated
  - .specify/templates/commands/*.md ⚠ pending
Follow-up TODOs: None
-->

# Todo Full-Stack Web Application — Phase II Constitution

## 1. Purpose & Scope

This constitution governs the Phase II Todo Full-Stack Web Application, whose objective is to transform the existing todo system into a multi-user, authenticated, persistent web application using Spec-Kit Plus and Claude Code.

This constitution applies exclusively to Phase II and must be followed by:
- All specifications
- All backend implementations
- All frontend implementations
- All database and authentication work

No Phase I or Phase III concerns are permitted under this constitution.

## 2. Architecture Overview (Non-Negotiable)

Phase II follows a strict monorepo architecture with clear separation of concerns.

```
hackathon-todo/
├── .spec-kit/
│   └── config.yaml
├── specs/
│   ├── overview.md
│   ├── architecture.md
│   ├── database/
│   │   └── schema.md
│   ├── features/
│   │   ├── task-crud.md
│   │   └── authentication.md
│   ├── api/
│   │   └── rest-endpoints.md
│   └── ui/
│       ├── pages.md
│       └── components.md
├── frontend/        # Next.js application (UI only)
│   └── CLAUDE.md
├── backend/         # FastAPI application (API only)
│   └── CLAUDE.md
├── CLAUDE.md        # Root Claude instructions
├── constitution.md
└── README.md
```

## 3. Separation of Frontend and Backend

### Frontend (Next.js)
**Purpose:** User Interface only

**Responsibilities:**
- Rendering UI
- Handling user interaction
- Managing authentication sessions via Better Auth
- Sending authenticated requests to backend

**Forbidden:**
- Business logic
- Database access
- Server-side task processing

🚫 Next.js API routes must NOT be used. All REST APIs live in the backend FastAPI service.

### Backend (FastAPI)
**Purpose:** Business logic & persistence

**Responsibilities:**
- REST API implementation
- JWT verification
- Authorization enforcement
- Database operations

**Forbidden:**
- UI rendering
- Session state storage
- Authentication UI flows

## 4. Spec-Driven Development (Absolute Rule)

All Phase II development must follow spec-driven development.

**Rules:**
- No code without a spec
- Specs must be written before implementation
- Claude Code must implement only the referenced spec
- Specs may be incremental and interdependent
- Specs are the single source of truth.

## 5. Specification Dependency Order

Specs must be created and implemented in the following logical order to ensure correctness:
1. Overview & Architecture
2. Database Schema
3. Authentication
4. JWT Authorization & Middleware
5. REST API Endpoints
6. Frontend API Integration
7. Frontend UI Rendering

Claude Code must not implement a spec whose dependencies are missing.

## 6. Database Constitution (Neon PostgreSQL)

A single Neon PostgreSQL database is used. Database responsibilities are shared but isolated by ownership:

### Ownership Rules
**Better Auth owns:**
- users
- sessions
- accounts

**Backend application owns:**
- tasks table

**Backend must:**
- Reference user_id from JWT
- Never redefine or migrate Better Auth tables
- Never duplicate user data

## 7. Authentication & Authorization Rules

### Authentication
- Implemented exclusively via Better Auth
- Runs in the frontend
- Issues JWT tokens upon login/signup

### Authorization
- Enforced exclusively in the backend
- Every API request must include: `Authorization: Bearer <JWT>`

**Backend must:**
- Verify JWT signature
- Extract authenticated user identity
- Enforce user-level data isolation

Requests without valid JWT must return 401 Unauthorized.

## 8. REST API Enforcement Rules

- All endpoints must live under `/api/`
- All endpoints must be protected
- User identity comes only from JWT, not request body
- Task ownership must be enforced on every operation

**Example:**
```
GET /api/{user_id}/tasks
→ user_id must match JWT subject
```

No endpoint may expose or operate on data outside the authenticated user's scope.

## 9. Stateless Backend Requirement

The backend must be fully stateless:
- No in-memory sessions
- No cached user context
- No server-held state

All state must live in:
- JWT tokens
- Database records

This ensures scalability and reliability.

## 10. Skill-Based Implementation Standard

This project relies on predefined reusable skills present in .claude.skills folder . Specifications may implicitly or explicitly depend on these skills, including:
- Full-stack monorepo initialization
- Neon PostgreSQL schema implementation
- Better Auth JWT issuance & validation
- Secure REST API with user scoping
- Frontend authenticated API integration
- Responsive UI rendering
- Environment & CORS configuration

Claude Code must apply these skills, not redefine them.

## 11. Error Handling & Quality Standards

- All errors must be handled gracefully
- API responses must be predictable and documented
- No unhandled exceptions
- Validation errors must be explicit and user-safe
- Clean code, maintainability, and clarity are mandatory.

## 12. Governance & Compliance

- This constitution supersedes all implementation decisions
- Any architectural change requires a spec update
- Non-compliance is considered a defect
- All Phase II specs and implementations must be verifiable against this constitution.

**Version**: 1.0.0 | **Ratified**: 2025-12-20 | **Last Amended**: 2025-12-20

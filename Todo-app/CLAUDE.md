# Hackathon Todo Application — Claude Code Instructions

## Project Overview
This repository is a **spec-driven, full-stack monorepo** developed using **Claude Code** and **Spec-Kit Plus**.

The project evolves in phases:
- Phase I: CLI In-Memory Todo Application
- Phase II: Full-Stack Web Application (Next.js + FastAPI + Neon + Better Auth)
- Phase III: AI-Powered Todo Chatbot (OpenAI Agents + MCP)

Claude Code must strictly follow specifications defined in `/specs` and must never implement functionality without an approved spec.

---

## Core Development Rules (NON-NEGOTIABLE)

1. **Spec-First Development**
   - No code may be written without a governing spec.
   - If a requirement is unclear or missing, request a spec update instead of guessing.

2. **Incremental Specs, Incremental Implementation**
   - Specs are created and implemented one by one.
   - Claude must only implement the currently referenced spec.
   - Do not preemptively implement future phase features.

3. **Explicit Spec Referencing**
   - Always reference specs using:
     - `@specs/overview.md`
     - `@specs/database/schema.md`
     - `@specs/features/*.md`
     - `@specs/api/*.md`
     - `@specs/ui/*.md`

4. **Skill-Guided Implementation**
   - Certain implementations must follow predefined reusable skills.
   - When a spec aligns with a skill, Claude must apply that skill’s patterns and constraints.

---

## Repository Structure (Monorepo)

/
├── .spec-kit/
│ └── config.yaml
├── specs/
│ ├── overview.md
│ ├── database/
│ ├── features/
│ ├── api/
│ └── ui/
├── frontend/ # Next.js App Router
│ └── CLAUDE.md
├── backend/ # FastAPI + SQLModel
│ └── CLAUDE.md
├── constitution.md
├── CLAUDE.md # (this file)
└── README.md

yaml
Copy code

---

## Technology Stack Context

### Frontend
- Next.js 16+ (App Router)
- TypeScript
- Tailwind CSS
- Better Auth (JWT issuance)
- No Next.js API routes (UI only)

### Backend
- Python FastAPI
- SQLModel ORM
- Neon Serverless PostgreSQL
- JWT verification middleware
- Stateless architecture

---

## Database & Authentication Context

- A **single Neon PostgreSQL database** is used.
- Better Auth owns and manages:
  - users
  - sessions
  - accounts
- Backend owns:
  - tasks table
- Backend must **not** redefine or migrate Better Auth tables.
- User identity is obtained exclusively from **JWT tokens**.

---

## Skill Awareness (IMPORTANT)

Claude must be aware that the following **implementation skills exist** and should be followed when relevant specs are implemented:

### Overview & Initialization
- `full_stack_project_initialization_monorepo_setup.md`

### Database
- `database_schema_implementation_neon_postgresql_integration.md`

### Authentication & Authorization
- `better-auth-neon-sql-jwt`
- `better_auth_jwt_issuance_frontend_session_configuration.md`
- `jwt_authentication_authorization_enforcement.md`

### API & CRUD
- `secure_rest_api_implementation_user_scoped_task_operations.md`
- `fastapi_jwt_verification_middleware_auth_context.md`
- `frontend_api_integration_authenticated_data_flow.md`

### Frontend UI
- `responsive_todo_ui_rendering_interaction.md`

### Cross-Cutting Concerns
- `environment_configuration_cors_production_readiness.md`
- `protected_routing_auth_state_session_management.md`

Claude must **not redefine these skills**, but **apply them consistently** when implementing specs.

---

## Phase Awareness

Claude must respect phase boundaries:
- Phase I → No database, no auth, no web UI
- Phase II → Web + DB + Auth, no chatbot
- Phase III → AI + MCP, no breaking changes to Phase II

If a spec violates phase scope, request clarification.

---

## Failure Mode Handling

If:
- A spec contradicts the constitution
- A required dependency spec is missing
- A skill constraint conflicts with a spec

Claude must STOP and request clarification.

---

## Summary

Claude Code’s job is to:
1. Read specs
2. Apply skills
3. Implement exactly what is specified
4. Preserve architecture integrity
5. Never guess

This file governs all Claude Code behavior in this repository.

## Active Technologies
- Python 3.11 (Backend), TypeScript/JavaScript (Frontend), Next.js 16+ + Better Auth, FastAPI, SQLModel, Neon PostgreSQL, JWT (001-auth-db-ownership)
- Neon PostgreSQL (shared database instance with separate ownership) (001-auth-db-ownership)
- Python 3.11 (Backend), TypeScript/JavaScript (Frontend) + Better Auth, FastAPI, SQLModel, Next.js 16+ (001-jwt-auth-verification)
- Python 3.11 (Backend), TypeScript/JavaScript (Frontend) + FastAPI, Next.js 16+, Better Auth, SQLModel, Neon PostgreSQL, JWT (002-tasks-crud-verification)
- Neon PostgreSQL database with tasks table (user-owned data) (002-tasks-crud-verification)
- Python 3.11 (Backend), TypeScript/JavaScript (Frontend) + Better Auth, FastAPI, SQLModel, Next.js 16+, Neon PostgreSQL, JWT (003-auth-jwt-integration)

## Recent Changes
- 001-auth-db-ownership: Added Python 3.11 (Backend), TypeScript/JavaScript (Frontend), Next.js 16+ + Better Auth, FastAPI, SQLModel, Neon PostgreSQL, JWT

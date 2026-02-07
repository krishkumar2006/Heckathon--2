---
id: phr-ui-pages-001
title: ui-pages-spec
stage: spec
date: 2025-12-21
surface: /sp.specify
model: claude-sonnet-4-5-20250929
feature: ui-pages
branch:
user: basharsheikh
command: /sp.specify read prompt.md for new spec for ui and keep it in ui folder inside pages.md
labels: [specification, ui, pages, routing]
links:
  spec: specs/ui/pages.md
  ticket:
  adr:
  pr:
files:
- path: specs/ui/pages.md
  action: created
  summary: UI pages specification for frontend application
- path: specs/ui/checklists/pages-requirements.md
  action: created
  summary: Quality checklist for UI pages spec
tests:

---

## Prompt

read prompt.md for new spec for ui and keep it in ui folder inside pages.md

Create specs/ui/pages.md for Phase II of the Todo Full-Stack Web Application.

This spec defines all frontend application pages, routing behavior,
authentication boundaries, and navigation flows.

This spec depends on:
- @specs/features/authentication.md
- @specs/features/task-crud.md
- @specs/api/rest-endpoints.md

================================================================================
MANDATORY IMPLEMENTATION SKILLS
================================================================================

Claude Code MUST use:
- protected_routing_auth_state_session_management.md
- responsive_todo_ui_rendering_interaction.md

================================================================================
REQUIRED CONTENT OF PAGES SPEC
================================================================================

---

## 1. Pages Overview
Describe the frontend as a multi-page application with:
- A public marketing-style home page
- A protected todo dashboard area
- Auth-controlled navigation

---

## 2. Public Pages

### Home Page (`/`)
Purpose:
- Landing page for the application
- Explains value proposition
- Introduces features

Required Sections:
- Hero section (headline + CTA)
- Features overview section
- Call-to-action button (e.g. "Get Started" or "Manage Todos")

Behavior:
- Accessible to all users
- No authentication required
- CTA navigates user to authentication or dashboard based on auth state

---

## 3. Authentication Pages
(Handled by Better Auth UI flow)

Rules:
- Authentication UI is rendered via Better Auth
- No custom credential handling in pages
- Successful login redirects user to dashboard

---

## 4. Protected Pages

### Todo Dashboard Page (`/todos` or `/dashboard`)
Purpose:
- Central workspace for authenticated users
- Displays and manages all task-related features

Access Rules:
- Requires active authenticated session
- Redirect unauthenticated users to login

Dashboard Sections:
- Header (user context + logout)
- Task creation section
- Task list section
- Filtering controls
- Task completion and management actions

Behavior:
- Page fetches tasks via authenticated API client
- UI reflects backend state only
- No task data is stored globally without auth

---

## 5. Navigation Flow
Define navigation rules:
- Home → CTA → Auth → Dashboard
- Authenticated users clicking CTA go directly to dashboard
- Logout redirects user to home page

---

## 6. Routing & Auth Guards
Rules:
- Protected routes enforce authentication before rendering
- Auth state is checked before page load
- No protected content flashes for unauthenticated users

---

## 7. Explicit Non-Goals
- No UI styling or CSS definitions
- No component-level details
- No API implementation
- No authentication logic
- No Phase III features

---

This pages spec must:
- Clearly separate public and protected routes
- Enforce auth-driven navigation
- Prepare for dashboard-based task management
- Remain implementation-agnostic

## Response snapshot

Created the UI pages specification as pages.md in the specs/ui/ folder with all required sections. The specification includes:

1. Pages Overview - Describing the multi-page application structure
2. Public Pages - With Home Page details and behavior
3. Authentication Pages - With Better Auth integration rules
4. Protected Pages - With Todo Dashboard details and access rules
5. Navigation Flow - With routing rules between pages
6. Routing & Auth Guards - With authentication enforcement rules
7. Explicit Non-Goals - With clear boundaries

The specification follows all requirements and includes user scenarios, functional requirements, key entities, and success criteria.

## Outcome

- ✅ Impact: Created comprehensive UI pages specification ready for implementation
- 🧪 Tests:
- 📁 Files: Created specs/ui/pages.md, specs/ui/checklists/pages-requirements.md
- 🔁 Next prompts: /sp.plan to create implementation plan
- 🧠 Reflection: Specification follows all required sections and constraints

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL):
- Prompt variant (if applicable):
- Next experiment (smallest change to try):
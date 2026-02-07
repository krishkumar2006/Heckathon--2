---
id: phr-ui-auth-pages-001
title: ui-auth-pages-spec
stage: spec
date: 2025-12-21
surface: /sp.specify
model: claude-sonnet-4-5-20250929
feature: ui-auth-pages
branch:
user: basharsheikh
command: /sp.specify read prompt.md for new spec for ui and keep it in ui folder
labels: [specification, ui, auth, frontend]
links:
  spec: specs/ui/auth-pages.md
  ticket:
  adr:
  pr:
files:
- path: specs/ui/auth-pages.md
  action: created
  summary: UI authentication pages specification for auth-related UI behavior
- path: specs/ui/checklists/auth-pages-requirements.md
  action: created
  summary: Quality checklist for UI auth pages spec
tests:

---

## Prompt

read prompt.md for new spec for ui and keep it in ui folder

Create specs/ui/auth-pages.md for Phase II of the Todo Full-Stack Web Application.

This spec defines authentication-related pages and UI behavior,
integrated with Better Auth.

This spec depends on:
- @specs/features/authentication.md
- @specs/ui/pages.md

================================================================================
MANDATORY IMPLEMENTATION SKILLS
================================================================================

Claude Code MUST use:
- better_auth_jwt_issuance_frontend_session_configuration.md
- protected_routing_auth_state_session_management.md

================================================================================
REQUIRED CONTENT OF AUTH PAGES SPEC
================================================================================

---

## 1. Authentication Pages Overview
Define authentication pages as part of the frontend routing layer,
while actual authentication logic is handled by Better Auth.

---

## 2. Login Page (`/login`)
Purpose:
- Allow existing users to sign in
- Establish authenticated session
- Receive JWT token via Better Auth

Behavior:
- Renders Better Auth login UI
- Does not handle credentials manually
- On successful login:
  - Session is established
  - User is redirected to dashboard

Access Rules:
- Accessible only to unauthenticated users
- Authenticated users are redirected to dashboard

---

## 3. Signup Page (`/signup`)
Purpose:
- Allow new users to register
- Create user record via Better Auth
- Establish initial authenticated session

Behavior:
- Renders Better Auth signup UI
- No backend user creation logic here
- On success:
  - JWT is issued
  - User is redirected to dashboard

---

## 4. Redirect & Guard Rules
- Auth pages redirect authenticated users away
- Protected pages redirect unauthenticated users to login
- No page renders before auth state is resolved

---

## 5. Explicit Non-Goals
- No custom auth forms
- No password validation logic
- No backend auth endpoints
- No token decoding in UI

---

This spec ensures authentication UX is:
- Professional
- Predictable
- Secure
- Fully aligned with Better Auth architecture

## Response snapshot

Created the UI authentication pages specification as auth-pages.md in the specs/ui/ folder with all required sections. The specification includes:

1. Authentication Pages Overview - Describing auth pages as frontend routing layer
2. Login Page - With purpose, behavior, and access rules
3. Signup Page - With purpose, behavior, and success flow
4. Redirect & Guard Rules - With auth state management
5. Explicit Non-Goals - With clear boundaries
6. User Scenarios & Testing - With priority-based user stories
7. Functional Requirements - With testable requirements
8. Key Entities - With relevant data models
9. Success Criteria - With measurable outcomes

The specification follows all requirements and dependencies.

## Outcome

- ✅ Impact: Created comprehensive UI auth pages specification ready for implementation
- 🧪 Tests:
- 📁 Files: Created specs/ui/auth-pages.md, specs/ui/checklists/auth-pages-requirements.md
- 🔁 Next prompts: /sp.plan to create implementation plan
- 🧠 Reflection: Specification follows all required sections and constraints

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL):
- Prompt variant (if applicable):
- Next experiment (smallest change to try):
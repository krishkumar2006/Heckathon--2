---
id: phr-ui-components-001
title: ui-components-spec
stage: spec
date: 2025-12-21
surface: /sp.specify
model: claude-sonnet-4-5-20250929
feature: ui-components
branch:
user: basharsheikh
command: /sp.specify read prompt.md for new spec for ui and keep it in ui folder inside components.md
labels: [specification, ui, components, frontend]
links:
  spec: specs/ui/components.md
  ticket:
  adr:
  pr:
files:
- path: specs/ui/components.md
  action: created
  summary: UI components specification for frontend reusable components
- path: specs/ui/checklists/components-requirements.md
  action: created
  summary: Quality checklist for UI components spec
tests:

---

## Prompt

read prompt.md for new spec for ui and keep it in ui folder inside components.md

Create specs/ui/components.md for Phase II of the Todo Full-Stack Web Application.

This spec defines reusable frontend UI components and their responsibilities.

This spec depends on:
- @specs/ui/pages.md
- @specs/features/task-crud.md
- @specs/features/authentication.md

================================================================================
MANDATORY IMPLEMENTATION SKILLS
================================================================================

Claude Code MUST use:
- responsive_todo_ui_rendering_interaction.md
- frontend_api_integration_authenticated_data_flow.md

================================================================================
REQUIRED CONTENT OF COMPONENTS SPEC
================================================================================

---

## 1. Component Architecture Overview
Explain that components are:
- Modular
- Reusable
- Auth-aware where required
- Focused on behavior, not styling

---

## 2. Layout Components

### AppLayout
Purpose:
- Shared layout wrapper for protected pages
- Provides consistent structure

Responsibilities:
- Render header
- Render page content
- Manage authenticated layout boundaries

---

## 3. Navigation Components

### Header / Navbar
Responsibilities:
- Display app title
- Show authentication state
- Provide logout action

Rules:
- Logout clears session and redirects to home
- No direct token handling in component

---

## 4. Task Components

### TaskForm
Purpose:
- Create new tasks

Rules:
- Requires title input
- Submits via authenticated API
- Does not manage user_id

---

### TaskList
Purpose:
- Display list of user tasks

Rules:
- Renders tasks provided by backend
- Handles empty states
- Does not fetch data directly

---

### TaskItem
Purpose:
- Display a single task

Capabilities:
- Toggle completion
- Trigger update
- Trigger delete

Rules:
- All actions call authenticated API
- UI reflects backend response only

---

## 5. Filtering Components

### TaskFilter
Purpose:
- Filter tasks by status

Rules:
- Filtering state is sent to backend
- No client-only filtering of unauthorized data

---

## 6. State & Data Flow Rules
- Components do not own authentication logic
- API calls go through shared API client
- JWT is attached automatically
- Backend is the source of truth

---

## 7. Responsiveness & Interaction
Rules:
- Components must support responsive layouts
- Interactions provide feedback (loading, error, success)
- UI adapts to different screen sizes

---

## 8. Explicit Non-Goals
- No CSS definitions
- No API implementation
- No database logic
- No auth token parsing
- No chatbot or Phase III features

---

This components spec must:
- Enable clean dashboard implementation
- Support secure task management
- Enforce authenticated data flow
- Remain reusable and scalable

## Response snapshot

Created the UI components specification as components.md in the specs/ui/ folder with all required sections. The specification includes:

1. Component Architecture Overview - Describing modular and reusable components
2. Layout Components - With AppLayout details
3. Navigation Components - With Header/Navbar responsibilities
4. Task Components - With TaskForm, TaskList, and TaskItem specifications
5. Filtering Components - With TaskFilter details
6. State & Data Flow Rules - With API and auth guidelines
7. Responsiveness & Interaction - With responsive behavior rules
8. Explicit Non-Goals - With clear boundaries

The specification follows all requirements and includes user scenarios, functional requirements, key entities, and success criteria.

## Outcome

- ✅ Impact: Created comprehensive UI components specification ready for implementation
- 🧪 Tests:
- 📁 Files: Created specs/ui/components.md, specs/ui/checklists/components-requirements.md
- 🔁 Next prompts: /sp.plan to create implementation plan
- 🧠 Reflection: Specification follows all required sections and constraints

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL):
- Prompt variant (if applicable):
- Next experiment (smallest change to try):
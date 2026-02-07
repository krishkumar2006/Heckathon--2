# UI Components Specification: Frontend Reusable Components

**Feature File**: `components.md`
**Created**: 2025-12-21
**Status**: Draft
**Input**: User description: "Create specs/ui/components.md for Phase II of the Todo Full-Stack Web Application. This spec defines reusable frontend UI components and their responsibilities. This spec depends on: @specs/ui/pages.md, @specs/features/task-crud.md, @specs/features/authentication.md"

## 1. Component Architecture Overview

Components are designed to be:
- Modular
- Reusable
- Auth-aware where required
- Focused on behavior, not styling

## 2. Layout Components

### AppLayout
Purpose:
- Shared layout wrapper for protected pages
- Provides consistent structure

Responsibilities:
- Render header
- Render page content
- Manage authenticated layout boundaries

## 3. Navigation Components

### Header / Navbar
Responsibilities:
- Display app title
- Show authentication state
- Provide logout action

Rules:
- Logout clears session and redirects to home
- No direct token handling in component

## 4. Task Components

### TaskForm
Purpose:
- Create new tasks

Rules:
- Requires title input
- Submits via authenticated API
- Does not manage user_id

### TaskList
Purpose:
- Display list of user tasks

Rules:
- Renders tasks provided by backend
- Handles empty states
- Does not fetch data directly

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

## 5. Filtering Components

### TaskFilter
Purpose:
- Filter tasks by status

Rules:
- Filtering state is sent to backend
- No client-only filtering of unauthorized data

## 6. State & Data Flow Rules
- Components do not own authentication logic
- API calls go through shared API client
- JWT is attached automatically
- Backend is the source of truth

## 7. Responsiveness & Interaction
Rules:
- Components must support responsive layouts
- Interactions provide feedback (loading, error, success)
- UI adapts to different screen sizes

## 8. Explicit Non-Goals
- No CSS definitions
- No API implementation
- No database logic
- No auth token parsing
- No chatbot or Phase III features

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Use TaskForm Component (Priority: P1)

As an authenticated user, I can use the TaskForm component to create new tasks.

**Why this priority**: This is the primary way users add tasks to their list, enabling the core functionality of the application.

**Independent Test**: Can be fully tested by using the form to create a task and verifying it appears in the task list, delivering the core task creation capability.

**Acceptance Scenarios**:

1. **Given** user is authenticated and on dashboard, **When** user fills TaskForm with valid title and submits, **Then** new task is created via authenticated API
2. **Given** user enters invalid input in TaskForm, **When** user submits, **Then** validation errors are displayed without API call

---

### User Story 2 - View Task List with TaskList Component (Priority: P1)

As an authenticated user, I can view my tasks through the TaskList component.

**Why this priority**: Essential for users to see and manage their tasks, providing the core value of task visibility.

**Independent Test**: Can be fully tested by loading the component with tasks data and verifying proper display, delivering task visibility functionality.

**Acceptance Scenarios**:

1. **Given** user has tasks, **When** TaskList receives tasks data, **Then** tasks are displayed with proper formatting
2. **Given** user has no tasks, **When** TaskList receives empty data, **Then** appropriate empty state is shown

---

### User Story 3 - Interact with Individual Tasks via TaskItem (Priority: P2)

As an authenticated user, I can manage individual tasks through the TaskItem component.

**Why this priority**: Enables users to perform specific actions on tasks, supporting the full task management lifecycle.

**Independent Test**: Can be fully tested by interacting with task items to complete, update, or delete tasks, delivering task management capabilities.

**Acceptance Scenarios**:

1. **Given** user sees a task item, **When** user toggles completion, **Then** task status updates via authenticated API
2. **Given** user wants to delete a task, **When** user triggers delete on TaskItem, **Then** task is removed via authenticated API

---

### User Story 4 - Filter Tasks with TaskFilter Component (Priority: P2)

As an authenticated user, I can filter my tasks using the TaskFilter component.

**Why this priority**: Enhances task management efficiency by allowing users to focus on specific task types.

**Independent Test**: Can be fully tested by applying filters and verifying the backend returns appropriately filtered results, delivering task organization capability.

**Acceptance Scenarios**:

1. **Given** user has mixed task statuses, **When** user applies filter, **Then** filtered tasks are returned from backend
2. **Given** user changes filter criteria, **When** filter is applied, **Then** task list updates to match new criteria

---

### Edge Cases

- What happens when API calls fail during component interactions?
- How do components handle slow network conditions or loading states?
- What occurs when authentication expires during component usage?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: AppLayout component MUST provide consistent structure for protected pages
- **FR-002**: AppLayout component MUST render header and page content areas
- **FR-003**: Header/Navbar component MUST display app title and authentication state
- **FR-004**: Header/Navbar component MUST provide logout functionality that clears session and redirects to home
- **FR-005**: TaskForm component MUST require title input and submit via authenticated API
- **FR-006**: TaskForm component MUST not manage user_id (derived from JWT)
- **FR-007**: TaskList component MUST render tasks provided by backend and handle empty states
- **FR-008**: TaskList component MUST not fetch data directly (data provided by parent)
- **FR-009**: TaskItem component MUST provide capabilities to toggle completion, trigger updates, and trigger deletes
- **FR-010**: TaskItem component MUST call authenticated API for all actions and reflect backend response only
- **FR-011**: TaskFilter component MUST send filtering state to backend and not filter client-side
- **FR-012**: All components MUST route API calls through shared authenticated client
- **FR-013**: All components MUST have JWT attached automatically to API calls
- **FR-014**: All components MUST treat backend as source of truth for data
- **FR-015**: All components MUST support responsive layouts and adapt to different screen sizes
- **FR-016**: All components MUST provide feedback during loading, error, and success states
- **FR-017**: Components MUST not handle authentication logic directly
- **FR-018**: Components MUST not implement CSS or styling definitions
- **FR-019**: Components MUST not implement API or database logic

### Key Entities

- **Component**: Reusable UI element with specific purpose and responsibilities
- **Layout Component**: Structural component that provides consistent page structure
- **Data Component**: Component that displays or manages data with API integration
- **Interaction Component**: Component that handles user input and triggers actions

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can create tasks via TaskForm component in under 3 seconds with valid input
- **SC-002**: TaskList component renders 100 tasks in under 2 seconds without performance degradation
- **SC-003**: TaskItem component interactions (complete, delete) complete in under 2 seconds
- **SC-004**: TaskFilter component applies filters and updates display in under 2 seconds
- **SC-005**: 95% of component interactions result in successful backend operations
- **SC-006**: Components maintain responsive behavior across mobile, tablet, and desktop viewports
- **SC-007**: 100% of unauthorized data access attempts through components are properly prevented
- **SC-008**: Users experience consistent component behavior and interface across all application pages
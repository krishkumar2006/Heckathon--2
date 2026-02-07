# Implementation Plan: Tasks Advanced Features

## Feature Specification
@specs/004-tasks-advanced-features/spec.md

## Technical Context

- **Frontend**: Next.js 16+ application with App Router
- **Backend**: FastAPI with SQLModel ORM
- **Database**: Neon Serverless PostgreSQL
- **Authentication**: Better Auth with JWT tokens
- **Current Task Model**: Basic task model with title, description, is_completed
- **Required Extensions**: Add priority, tags, due_date fields
- **Frontend Requirements**: Search, filtering, sorting capabilities
- **Database Migration**: Schema changes to existing tasks table
- **Auth Integration**: Maintain existing JWT-based authentication

## Constitution Check

- All code changes must follow the spec-first development approach
- No functionality may be implemented without an approved spec
- Database schema changes must follow Neon PostgreSQL integration patterns
- Authentication must be preserved during implementation
- Frontend must continue to work with existing authentication flow
- Changes must be backward compatible with existing data

## Gates

- [ ] Spec alignment: Implementation matches feature specification requirements
- [ ] Architecture compliance: Follows established patterns for auth, db, and UI
- [ ] Database safety: Migration preserves existing data integrity
- [ ] Auth preservation: No regression in authentication functionality
- [ ] Frontend compatibility: Existing UI continues to work with new schema

---

## Phase 0: Outline & Research

### 0.1 Research Tasks

For each unknown in Technical Context:

1. **Task**: Research SQLModel migration patterns for Neon PostgreSQL for adding new fields to existing table
   - Current task model structure
   - Migration best practices for SQLModel/Neon
   - Default value handling for existing records

2. **Task**: Research Next.js App Router patterns for search/filter/sort functionality
   - Query parameter handling
   - Client-side vs server-side filtering
   - State management approaches

3. **Task**: Research Better Auth JWT integration patterns with task filtering
   - Maintaining authentication context during API calls
   - User-scoped filtering requirements

### 0.2 Best Practices Tasks

1. **Task**: Find best practices for task priority field implementation
   - Priority enum values (low/medium/high vs numeric)
   - Default priority assignment
   - Frontend display patterns

2. **Task**: Find best practices for tags field implementation in PostgreSQL
   - Array field vs JSON field vs text field with delimiter
   - Tag validation and sanitization
   - Querying patterns for tag filtering

3. **Task**: Find best practices for datetime field handling in SQLModel
   - Timezone considerations
   - Due date validation
   - Frontend date picker integration

### 0.3 Patterns Tasks

1. **Task**: Find patterns for implementing search functionality in FastAPI
   - Full-text search vs simple LIKE queries
   - Performance considerations
   - Combining search with filters

2. **Task**: Find patterns for query parameter handling in FastAPI endpoints
   - Optional parameters for filtering
   - Type validation for query parameters
   - Combining multiple filters

## Phase 1: Design & Contracts

### 1.1 Data Model Design

Based on feature spec, design the extended Task model:

```
Task Model:
- id: int (primary key)
- title: str (required)
- description: str (optional)
- is_completed: bool (default: false)
- priority: str (enum: "low", "medium", "high"; default: "medium")
- tags: List[str] (default: [])
- due_date: datetime (optional)
- user_id: str (foreign key from auth)
- created_at: datetime (default: now)
- updated_at: datetime (default: now)
```

### 1.2 API Contracts

#### Task Creation Endpoint
```
POST /api/tasks
Request Body:
{
  "title": "string",
  "description": "string",
  "priority": "low|medium|high",
  "tags": ["string"],
  "due_date": "datetime"
}

Response:
{
  "id": "int",
  "title": "string",
  "description": "string",
  "is_completed": "bool",
  "priority": "string",
  "tags": ["string"],
  "due_date": "datetime",
  "user_id": "string",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

#### Task List Endpoint with Filtering
```
GET /api/tasks
Query Parameters:
- search: string (search in title/description)
- priority: string (filter by priority)
- status: string (filter by completion status)
- sort: string (sort by: created_at, due_date, priority)
- order: string (asc/desc)

Response:
{
  "tasks": [Task objects],
  "total": "int"
}
```

### 1.3 Quickstart Guide

1. Update backend models with new fields
2. Generate and apply database migration
3. Update backend API endpoints to support new functionality
4. Update frontend UI with search/filter/sort controls
5. Test functionality with existing and new data

## Phase 2: Implementation Planning

### 2.1 Backend Implementation Tasks

- [ ] Update Task model in backend/models/task.py with priority, tags, due_date fields
- [ ] Generate database migration for schema changes
- [ ] Update task creation endpoint to handle new fields
- [ ] Implement filtering logic in GET /tasks endpoint
- [ ] Add search functionality (title + description)
- [ ] Implement priority-based ordering
- [ ] Implement due_date ordering
- [ ] Ensure JWT authentication remains intact

### 2.2 Frontend Implementation Tasks

- [ ] Add search input field to dashboard
- [ ] Add priority filter dropdown
- [ ] Add status filter dropdown
- [ ] Add sort selector with multiple options
- [ ] Update API calls to pass query parameters
- [ ] Update task display to show priority and due date
- [ ] Ensure responsive design for new controls

### 2.3 Testing Tasks

- [ ] Test creating tasks with priority, tags, and due_date
- [ ] Test filtering by priority
- [ ] Test filtering by status
- [ ] Test sorting by due date
- [ ] Verify authentication still works properly
- [ ] Test with existing data to ensure no data loss

## Phase 3: Integration & Verification

### 3.1 Integration Tasks

- [ ] End-to-end testing of new features
- [ ] Verify all filters work together
- [ ] Test database migration on sample data
- [ ] Performance testing with larger datasets
- [ ] Cross-browser compatibility testing

### 3.2 Verification Gates

- [ ] All new features work together seamlessly
- [ ] No authentication errors occur
- [ ] No schema conflicts exist
- [ ] Existing data remains intact after migration
- [ ] Frontend UI is responsive and user-friendly
- [ ] API endpoints return correct data with filters

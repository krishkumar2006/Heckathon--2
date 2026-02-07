# Quickstart Guide: Tasks Advanced Features

## Overview
This guide provides a quick overview of how to implement the advanced task features including priority levels, tags, due dates, search, filtering, and sorting capabilities.

## Prerequisites
- Better Auth configured for JWT authentication
- Neon PostgreSQL database connected
- SQLModel ORM configured
- FastAPI backend running
- Next.js frontend with App Router

## Implementation Steps

### 1. Backend Implementation

#### 1.1 Update Task Model
1. Modify the Task model in `backend/models/task.py`:
   - Add `priority` field with default "medium"
   - Add `tags` field as List[str] with default empty array
   - Add `due_date` field as optional datetime
   - Ensure `is_completed` field exists with default false

#### 1.2 Generate Database Migration
1. Use Alembic to generate migration for schema changes:
   ```bash
   # Follow the pattern from neon-postgresql-integration-sqlmodel.md skill
   alembic revision --autogenerate -m "Add priority, tags, due_date to tasks"
   alembic upgrade head
   ```

#### 1.3 Update API Endpoints
1. Extend `POST /api/tasks` to accept new fields
2. Update `GET /api/tasks` to support query parameters:
   - `search`: for searching in title/description
   - `priority`: for filtering by priority
   - `status`: for filtering by completion status
   - `sort`: for sorting (created_at, due_date, priority, title)
   - `order`: for sort direction (asc, desc)

### 2. Frontend Implementation

#### 2.1 Update Task Creation Form
1. Add priority selection dropdown (low, medium, high)
2. Add tags input with multi-select capability
3. Add due date picker component
4. Update form validation

#### 2.2 Update Task Dashboard
1. Add search input field at the top
2. Add filter controls:
   - Priority dropdown filter
   - Status (completed/pending) filter
3. Add sort controls with multiple options
4. Update task list to display new fields (priority, due date, tags)

#### 2.3 API Integration
1. Update API calls to pass query parameters for filtering/sorting
2. Handle new fields in task creation and update operations
3. Update task display components to show priority and due date

### 3. Testing

#### 3.1 Backend Tests
1. Test task creation with all new fields
2. Test filtering endpoints with various parameters
3. Test search functionality
4. Test sorting with different criteria
5. Verify authentication still works

#### 3.2 Frontend Tests
1. Test form validation for new fields
2. Test filter functionality
3. Test search functionality
4. Test sort functionality
5. Verify responsive design

## Key Features

### Priority Management
- Tasks can have priority levels: low, medium, high
- Default priority is "medium" for new tasks
- Used for filtering and sorting

### Tagging System
- Tasks can have multiple tags
- Tags are stored as an array of strings
- Used for categorization and filtering

### Due Dates
- Optional due date field for tasks
- Used for sorting and time-based organization
- Displayed in the task list

### Search Functionality
- Search across title and description fields
- Case-insensitive matching
- Real-time filtering as user types

### Advanced Filtering
- Filter by priority level
- Filter by completion status
- Combine multiple filters

### Sorting Options
- Sort by creation date
- Sort by due date
- Sort by priority
- Sort by title
- Ascending or descending order

## API Usage Examples

### Creating a Task with Advanced Fields
```javascript
fetch('/api/tasks', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer ' + jwtToken,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    title: 'New task',
    description: 'Task description',
    priority: 'high',
    tags: ['work', 'urgent'],
    due_date: '2025-12-31T23:59:59Z'
  })
})
```

### Getting Tasks with Filters
```javascript
// Get high priority tasks, sorted by due date
fetch('/api/tasks?priority=high&sort=due_date&order=asc', {
  headers: {
    'Authorization': 'Bearer ' + jwtToken
  }
})
```

### Searching Tasks
```javascript
// Search for tasks containing "meeting"
fetch('/api/tasks?search=meeting', {
  headers: {
    'Authorization': 'Bearer ' + jwtToken
  }
})
```
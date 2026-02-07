# Quickstart: Advanced Intelligent Task Features

## Setup

1. Ensure your database migration for new task fields is applied:
   ```bash
   # Apply migrations to add new columns to tasks table
   cd backend
   python -m alembic upgrade head
   ```

2. Verify new fields exist in the tasks table:
   ```sql
   -- Check that these columns exist:
   -- due_date, is_recurring, recurrence_type, recurrence_interval, next_run_at, reminder_at
   ```

## Usage

### Creating Tasks with Due Dates
```javascript
// Create a task with a due date
await api.tasks.createTask({
  title: "Submit report",
  description: "Monthly report for Q4",
  due_date: "2025-01-15T10:00:00Z",  // ISO format
  completed: false
});
```

### Creating Recurring Tasks
```javascript
// Create a recurring task
await api.tasks.createTask({
  title: "Weekly team meeting",
  description: "Regular team sync",
  is_recurring: true,
  recurrence_type: "weekly",  // daily | weekly | monthly
  recurrence_interval: 1,
  due_date: "2025-01-20T10:00:00Z"
});
```

### Setting Reminders
```javascript
// Create a task with a reminder
await api.tasks.createTask({
  title: "Doctor appointment",
  reminder_at: "2025-01-10T09:00:00Z",  // Reminder time
  due_date: "2025-01-10T10:00:00Z"      // Due time
});
```

## Key Endpoints

- `POST /api/tasks` - Create tasks with due dates, recurrence, and reminders
- `PUT /api/tasks/{id}` - Update task with intelligent features
- `PATCH /api/tasks/{id}/complete` - Complete task (triggers recurrence if applicable)

## Frontend Integration

The dashboard page (`/app/dashboard/page.tsx`) includes:
- Date pickers for due dates
- Recurrence toggle and pattern selector
- Reminder time picker
- Visual indicators for due dates and recurring tasks
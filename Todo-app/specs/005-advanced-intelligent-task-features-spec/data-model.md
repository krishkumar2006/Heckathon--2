# Data Model: Advanced Intelligent Task Features

## Entity: Task
**Description**: Extended task entity with intelligent features

### Fields:
- **id**: int (Primary Key) - Unique identifier
- **title**: str - Task title
- **description**: Optional[str] - Task description
- **completed**: bool - Completion status
- **user_id**: str - Owner identifier
- **created_at**: datetime - Creation timestamp
- **updated_at**: datetime - Last update timestamp
- **priority**: str - Task priority (low/medium/high)
- **tags**: str - JSON string of tags list
- **due_date**: Optional[datetime] - Deadline for task
- **is_recurring**: bool - Whether task repeats (default: False)
- **recurrence_type**: Optional[str] - Recurrence pattern (daily/weekly/monthly)
- **recurrence_interval**: int - Interval for recurrence (default: 1)
- **next_run_at**: Optional[datetime] - Next occurrence date
- **reminder_at**: Optional[datetime] - Time to trigger reminder

### Relationships:
- **user_id** → User (from Better Auth)

### Validation Rules:
- due_date must be a valid datetime if provided
- recurrence_type must be one of: daily, weekly, monthly if is_recurring is True
- recurrence_interval must be positive integer
- reminder_at must be in the future if provided

### State Transitions:
- When completed=True and is_recurring=True → create new task with next_run_at as due_date
- When is_recurring=True → next_run_at is calculated based on recurrence pattern
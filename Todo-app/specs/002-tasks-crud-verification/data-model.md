# Data Model: Tasks CRUD Verification & Correction

## Task Entity

### Attributes
- **id**: Integer (Primary Key, Auto-increment)
- **title**: String (Required, Max length: 255)
- **description**: String (Optional, Max length: 1000)
- **completed**: Boolean (Default: false)
- **user_id**: Integer (Foreign Key to Better Auth users, Required)
- **created_at**: DateTime (Auto-generated)
- **updated_at**: DateTime (Auto-generated, Updates on modification)

### Validation Rules
- **title**: Required field, minimum length of 1 character
- **user_id**: Required field, must reference an existing user
- **completed**: Boolean value, defaults to false

### Relationships
- **One-to-Many**: User → Tasks (One user can have many tasks)
- **Ownership**: Each task belongs to exactly one user

### State Transitions
- **Initial State**: `completed = false` when created
- **Toggle State**: `completed` can transition from `false` to `true` or `true` to `false`

## User Entity (Reference Only)

### Attributes
- **id**: Integer (Primary Key, from Better Auth)
- **tasks**: List of Task entities (relationship)

### Notes
- User entity is managed by Better Auth
- Backend only references user_id from JWT token
- No direct manipulation of user data in backend

## Constraints

### Data Integrity
- Foreign key constraint: tasks.user_id references users.id
- Not null constraints on required fields (title, user_id)
- Check constraint: title length > 0

### Business Rules
- Users can only access tasks where user_id matches their authenticated user_id
- Task creation requires a valid user_id from JWT token
- Task modification is restricted to the task owner
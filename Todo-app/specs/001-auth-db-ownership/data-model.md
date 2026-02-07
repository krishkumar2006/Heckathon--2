# Data Model: Authentication Database Ownership

## Better Auth Managed Entities

### User
**Owner**: Better Auth
**Storage**: Neon PostgreSQL (auth schema)

- `id`: string (primary key, managed by Better Auth)
- `email`: string (unique, required)
- `email_verified`: boolean (default: false)
- `name`: string (optional)
- `image`: string (optional, avatar URL)
- `password`: string (hashed, managed by Better Auth)
- `created_at`: timestamp (auto-generated)
- `updated_at`: timestamp (auto-generated)

**Constraints**:
- Email must be unique
- Email format validation required
- Password strength validation handled by Better Auth

### Session
**Owner**: Better Auth
**Storage**: Neon PostgreSQL (auth schema)

- `id`: string (primary key, managed by Better Auth)
- `user_id`: string (foreign key to users.id)
- `expires_at`: timestamp (session expiration)
- `created_at`: timestamp (auto-generated)
- `updated_at`: timestamp (auto-generated)

**Constraints**:
- user_id must reference valid user
- Session must not be expired for valid access

### Account
**Owner**: Better Auth
**Storage**: Neon PostgreSQL (auth schema)

- `id`: string (primary key, managed by Better Auth)
- `user_id`: string (foreign key to users.id)
- `provider_id`: string (e.g., "credentials", "google", etc.)
- `provider_user_id`: string (user ID from provider)
- `created_at`: timestamp (auto-generated)
- `updated_at`: timestamp (auto-generated)

**Constraints**:
- user_id must reference valid user

## Backend Managed Entities

### Task
**Owner**: Backend Application
**Storage**: Neon PostgreSQL (app schema)

- `id`: integer (primary key, auto-increment)
- `user_id`: string (foreign key to Better Auth users.id)
- `title`: string (required, max 255 chars)
- `description`: text (optional)
- `completed`: boolean (default: false)
- `created_at`: timestamp (auto-generated)
- `updated_at`: timestamp (auto-generated)

**Constraints**:
- user_id must reference valid Better Auth user
- All operations must be scoped to authenticated user_id
- No direct access to user details from Better Auth tables

## Relationships

- **User → Task**: One-to-Many (one user can have many tasks)
  - `Better Auth users.id` → `tasks.user_id`
  - Backend enforces this relationship through JWT token validation

## Validation Rules

### From Functional Requirements
- **FR-005**: Backend MUST NOT store or manage authentication credentials
- **FR-006**: Backend MUST scope all application data (tasks) to user_id extracted from JWT token
- **FR-007**: Backend MUST NOT redefine or migrate Better Auth database tables
- **FR-008**: System MUST prevent direct querying of authentication tables from backend

### Business Rules
- Users can only access their own tasks
- Task creation requires valid JWT with user identity
- Task modification requires JWT user_id to match task owner
- Task deletion requires JWT user_id to match task owner
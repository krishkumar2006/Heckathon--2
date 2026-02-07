# Research Findings: Tasks Advanced Features

## Decision: SQLModel Migration Patterns for Neon PostgreSQL
**Rationale**: Using SQLModel's migration capabilities with Alembic to safely add new fields to existing tasks table
**Alternatives considered**:
- Direct SQL ALTER TABLE commands (risky without rollback capabilities)
- Manual schema management (not maintainable)

Based on the skill documentation in neon-postgresql-integration-sqlmodel.md, we'll use Alembic for safe database migrations that include:
- Adding priority field with default "medium"
- Adding tags field as JSONB array in PostgreSQL
- Adding due_date field as timestamp
- Ensuring is_completed field exists with default false

## Decision: Next.js App Router Search/Filter/Sort Patterns
**Rationale**: Using URL query parameters to maintain state and enable bookmarking of filtered views
**Alternatives considered**:
- Client-side state management only (loses state on refresh)
- Full page reloads for each filter change (poor UX)

Implementation approach:
- Use searchParams in page components to read filter/sort parameters
- Update URL query parameters when filters change using router.push
- Server-side filtering in API routes to reduce data transfer

## Decision: Better Auth JWT Integration Patterns
**Rationale**: Maintaining existing JWT middleware pattern to preserve authentication flow
**Alternatives considered**:
- Changing to session-based auth (would break existing implementation)
- Adding new auth layer (unnecessary complexity)

Continue using the existing JWT verification middleware that:
- Extracts and validates JWT from Authorization header
- Provides user context to endpoints
- Maintains user scoping for task operations

## Decision: Task Priority Field Implementation
**Rationale**: Using string enum values ("low", "medium", "high") for clarity and frontend display
**Alternatives considered**:
- Numeric values (1, 2, 3) (less readable)
- Single character codes (L, M, H) (less intuitive)

The string values provide clear semantics and are easily translatable in the UI.

## Decision: Tags Field Implementation in PostgreSQL
**Rationale**: Using JSONB field type for tags array to enable efficient querying and indexing
**Alternatives considered**:
- Text field with comma-separated values (harder to query)
- Separate tags and task_tags junction table (over-engineering for this use case)

JSONB provides flexibility for storing the array while allowing PostgreSQL to query within the array when needed.

## Decision: Datetime Field Handling in SQLModel
**Rationale**: Using datetime with timezone awareness for due_date field
**Alternatives considered**:
- String field (no validation or querying capabilities)
- Date only (loses time precision if needed)

SQLModel supports datetime fields that map to PostgreSQL timestamps, with proper timezone handling.

## Decision: Search Functionality Implementation
**Rationale**: Using PostgreSQL's ILIKE operator for case-insensitive search across title and description
**Alternatives considered**:
- Full-text search with tsvector (more complex setup)
- Application-level search (performance issues with large datasets)

ILIKE provides good performance for basic search functionality while being simple to implement.

## Decision: Query Parameter Handling in FastAPI
**Rationale**: Using FastAPI's built-in query parameter validation and optional parameters
**Alternatives considered**:
- Manual parsing from request object (more error-prone)
- Third-party query parsing libraries (unnecessary complexity)

FastAPI's Pydantic-based validation provides type safety and automatic documentation for query parameters.
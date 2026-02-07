# Data Model: JWT Token Issuance, Verification & Backend Enforcement

## Entities

### JWT Token
- **Description**: Digital authentication token containing user identity information
- **Fields**:
  - header: Contains token type and signing algorithm (automatically generated)
  - payload: Contains user identity claims (user_id, email, expiration)
  - signature: Cryptographically signed token verification (automatically generated)
- **Validation**:
  - Must have valid signature matching shared secret
  - Must not be expired (exp claim must be in the future)
  - Must contain required claims (sub/user_id)
- **Relationships**: Issued by Better Auth, consumed by FastAPI backend

### User Identity
- **Description**: Represents the authenticated user extracted from JWT token
- **Fields**:
  - user_id: Unique identifier from JWT payload (typically the 'sub' claim)
  - email: User email from JWT payload (for reference only)
  - expiration: Token expiration timestamp from JWT payload
- **Validation**:
  - user_id must match the 'sub' claim in JWT
  - Must be present in all authenticated requests
- **Relationships**: Used to scope all user-specific operations in the backend

## State Transitions

### JWT Token Lifecycle
1. **Unauthenticated State**: No JWT token exists
2. **Issuance State**: Better Auth issues JWT token after successful login/signup
3. **Propagation State**: Frontend retrieves JWT and includes in Authorization header
4. **Verification State**: Backend validates JWT signature and extracts user identity
5. **Authorization State**: Backend enforces user-level data isolation using extracted user_id
6. **Expiration State**: JWT token expires and becomes invalid
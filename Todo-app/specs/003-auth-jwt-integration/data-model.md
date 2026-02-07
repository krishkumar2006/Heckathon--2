# Data Model: Better Auth JWT → Backend Authorization Integration

## JWT Token Entity

**JWT Token**: Contains user identity information issued by Better Auth and validated by backend

- **Fields**:
  - `token`: String - The complete JWT string in format header.payload.signature
  - `user_id`: String - Extracted from the 'sub' claim in the JWT payload
  - `email`: String - User's email address from JWT payload
  - `issuer`: String - Token issuer (from JWT payload)
  - `audience`: String - Token audience (from JWT payload)
  - `expires_at`: DateTime - Token expiration time (from JWT payload)
  - `issued_at`: DateTime - Token issue time (from JWT payload)

**Validation Rules**:
- Token must be in valid JWT format (header.payload.signature)
- Signature must be valid against JWKS from Better Auth
- Token must not be expired at time of validation
- User_id must be present in 'sub' claim

## Authorization Header Entity

**Authorization Header**: HTTP header format for transmitting JWT tokens from frontend to backend

- **Fields**:
  - `scheme`: String - Always "Bearer" for JWT tokens
  - `token`: String - The JWT token value

**Validation Rules**:
- Format must be "Bearer [token]"
- Token must not be empty
- Token must be a valid JWT

## User Session Entity (Reference)

**User Session**: Established by Better Auth upon successful authentication, provides access to JWT tokens

- **Fields**:
  - `user_id`: String - Unique identifier for the authenticated user
  - `email`: String - User's email address
  - `expires_at`: DateTime - Session expiration time
  - `created_at`: DateTime - Session creation time

**Validation Rules**:
- Session must be active at time of token request
- User must be authenticated to retrieve JWT tokens
# Feature Specification: Better Auth JWT → Backend Authorization Integration

**Feature Branch**: `003-auth-jwt-integration`
**Created**: 2025-12-26
**Status**: Draft
**Input**: User description: "read prompt.md for new specs create inside spec folder"


## User Scenarios & Testing *(mandatory)*

### User Story 1 - Successful Task Access with JWT Authentication (Priority: P1)

User signs up or logs in via Better Auth, then navigates to the dashboard where they can view, create, update, and delete their tasks. The frontend securely retrieves a JWT from Better Auth and sends it to the backend API, which validates the token and authorizes the user to access only their own tasks.

**Why this priority**: This is the core functionality of the application - users must be able to access their tasks after authentication. Without this working, the application is fundamentally broken.

**Independent Test**: Can be fully tested by logging in as a user, attempting to access their tasks via the API with proper JWT authentication, and confirming that tasks are returned successfully without 401 errors.

**Acceptance Scenarios**:

1. **Given** user is authenticated with Better Auth, **When** user requests their tasks via the backend API with a valid JWT in the Authorization header, **Then** the backend successfully validates the token and returns the user's tasks
2. **Given** user is authenticated with Better Auth, **When** user creates a new task via the backend API with a valid JWT in the Authorization header, **Then** the backend successfully validates the token and creates the task associated with the user's ID

---

### User Story 2 - Proper JWT Token Retrieval and Transmission (Priority: P2)

Authenticated user's frontend application retrieves the correct JWT token from Better Auth and properly transmits it to the backend API in the Authorization header. The token contains the necessary claims to identify the user and is in the correct JWT format (header.payload.signature).

**Why this priority**: Without the correct token being sent, the backend cannot validate the user's identity, leading to 401 errors.

**Independent Test**: Can be tested by inspecting network requests to confirm that the Authorization header contains a properly formatted JWT token when making API calls to the backend.

**Acceptance Scenarios**:

1. **Given** user is authenticated in the frontend, **When** frontend retrieves the authentication token, **Then** it retrieves a properly formatted JWT token from Better Auth
2. **Given** frontend has retrieved a JWT token, **When** frontend makes an API call to the backend, **Then** the Authorization header contains "Bearer [valid-JWT-token]"

---

### User Story 3 - Secure Backend Token Validation (Priority: P3)

Backend receives JWT tokens from the frontend and validates them using the proper JWKS endpoint from Better Auth. The backend extracts the user ID from the token claims and enforces proper authorization to ensure users can only access their own data.

**Why this priority**: This ensures the security model works correctly and users cannot access other users' data.

**Independent Test**: Can be tested by attempting to access another user's tasks with a valid JWT from a different user, and confirming that access is properly denied.

**Acceptance Scenarios**:

1. **Given** backend receives a valid JWT token, **When** backend validates the token using JWKS, **Then** the token is successfully validated and user ID is extracted
2. **Given** backend has extracted user ID from JWT, **When** user attempts to access another user's data, **Then** access is denied with appropriate error response

---

### Edge Cases

- What happens when a JWT token is expired?
- How does system handle malformed or tampered JWT tokens?
- What occurs when the JWKS endpoint is temporarily unavailable?
- How does the system handle tokens from different authentication providers?
- What happens when user is deleted but JWT token is still valid?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: Frontend MUST retrieve a properly formatted JWT token from Better Auth using the JWT plugin
- **FR-002**: Frontend MUST include the JWT token in the Authorization header as "Bearer [token]" for all API requests
- **FR-003**: Backend MUST validate JWT tokens using the JWKS endpoint from Better Auth
- **FR-004**: Backend MUST extract user ID from the JWT token's 'sub' claim
- **FR-005**: Backend MUST enforce user-specific data access based on the extracted user ID
- **FR-006**: Backend MUST return 401 Unauthorized for invalid or expired JWT tokens
- **FR-007**: Backend MUST NOT make additional calls to Better Auth for token validation once JWT is validated locally
- **FR-008**: System MUST handle token expiration gracefully with appropriate error messages
- **FR-009**: Frontend and backend MUST use the same issuer and audience for JWT validation
- **FR-010**: JWT tokens MUST be signed using RS256 or EdDSA algorithms as configured in Better Auth

### Key Entities

- **JWT Token**: Contains user identity information (user ID in 'sub' claim), issued by Better Auth, validated by backend
- **User Session**: Established by Better Auth upon successful authentication, provides access to JWT tokens
- **Authorization Header**: HTTP header format "Authorization: Bearer [JWT-token]" used to transmit tokens from frontend to backend

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Users can access their tasks via backend API without receiving 401 Unauthorized errors after successful authentication
- **SC-002**: JWT tokens are validated locally by backend without making additional calls to Better Auth API
- **SC-003**: Task CRUD operations return 200 status codes for authenticated users with valid JWT tokens
- **SC-004**: User ID is reliably extracted from JWT token 'sub' claim for proper data scoping
- **SC-005**: Invalid or expired JWT tokens result in 401 Unauthorized responses within 500ms
- **SC-006**: Users can only access and modify their own tasks, with 403 errors for other users' data

## Final Token Contract Documentation

Based on investigation of the current implementation:

- **Token Type**: Better Auth with the JWT plugin enabled issues real JWT tokens in the format `header.payload.signature`
- **Token Retrieval**: Frontend must use `authClient.token()` with the `jwtClient` plugin to retrieve JWT tokens
- **Token Validation**: Backend validates JWT tokens using the shared secret and supported algorithms (HS256, etc.)
- **User Identity**: User ID is extracted from the `sub` claim in the JWT payload
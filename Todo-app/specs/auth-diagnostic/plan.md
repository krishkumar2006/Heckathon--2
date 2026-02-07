# Authentication Diagnostic & Normalization Plan

## Diagnostic Process (Following STRICT ORDER from spec)

### Step 1: Verify Better Auth routes and base URLs
- Check current Better Auth configuration in frontend
- Verify base URLs and API endpoints
- Ensure consistency between frontend and backend URLs

### Step 2: Verify environment variables consistency
- Check that BETTER_AUTH_SECRET is consistent between frontend and backend
- Verify DATABASE_URL is properly configured for Better Auth
- Confirm all auth-related environment variables are set correctly

### Step 3: Verify session issuance and retrieval
- Test JWT token creation during signup/login
- Verify session persistence across page refreshes
- Check `/api/auth/get-session` endpoint functionality

### Step 4: Verify frontend auth provider placement
- Ensure Better Auth provider is properly wrapped around the app
- Verify session context is available where needed
- Check for proper placement in Next.js App Router

### Step 5: Verify protected layout timing and logic
- Examine `(authenticated)` layout implementation
- Verify auth state resolution happens before route blocking
- Check redirect logic in protected routes

### Step 6: Verify redirect rules (login/signup/dashboard)
- Test navigation flow between auth routes
- Ensure proper redirect behavior based on auth state
- Verify signup and login redirect to `/dashboard`

### Step 7: Verify backend JWT validation
- Check FastAPI middleware for JWT verification
- Validate JWT token parsing and validation logic
- Ensure backend properly rejects invalid tokens

### Step 8: Remove redundant or conflicting auth logic
- Identify and remove duplicate auth implementations
- Clean up conflicting authentication code
- Ensure single source of truth for auth state
// constants/env.ts - Centralized environment configuration
export const ENV_CONFIG = {
  // Backend configuration
  BACKEND_URL: 
    process.env.NEXT_PUBLIC_BACKEND_URL || 
    process.env.BACKEND_URL || 
    'http://localhost:8000',
  
  // Frontend configuration
  FRONTEND_URL: 
    process.env.NEXT_PUBLIC_FRONTEND_URL || 
    process.env.FRONTEND_URL || 
    'http://localhost:3000',
  
  // Better Auth configuration
  BETTER_AUTH_URL: 
    process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 
    process.env.BETTER_AUTH_URL || 
    process.env.FRONTEND_URL || 
    'http://localhost:3000',
  
  // API endpoints
  API_BASE_URL: 
    process.env.NEXT_PUBLIC_BACKEND_URL || 
    process.env.BACKEND_URL || 
    'http://localhost:8000/api',
  
  // Secrets
  BETTER_AUTH_SECRET: 
    process.env.NEXT_PUBLIC_BETTER_AUTH_SECRET || 
    process.env.BETTER_AUTH_SECRET,
};
// app/api/health/route.ts - Next.js API route for health checks
import { NextRequest } from 'next/server';
import { healthCheckService } from '@/lib/health-check';
import { ENV_CONFIG } from '@/constants/env';

export async function GET(request: NextRequest) {
  try {
    // Get full stack health status
    const healthStatus = await healthCheckService.getFullStackHealth();
    
    // Return health status with appropriate status code
    const statusCode = healthStatus.overall === 'healthy' ? 200 : 
                      healthStatus.overall === 'degraded' ? 207 : 503;
    
    return new Response(JSON.stringify(healthStatus), {
      status: statusCode,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache', // Prevent caching of health checks
      },
    });
  } catch (error) {
    console.error('Health check error:', error);
    
    return new Response(
      JSON.stringify({
        error: 'Health check failed',
        timestamp: Date.now(),
      }),
      {
        status: 503,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}

// Allow HEAD requests as well for lightweight health checks
export async function HEAD(request: NextRequest) {
  try {
    const healthStatus = await healthCheckService.getFullStackHealth();
    const statusCode = healthStatus.overall === 'healthy' ? 200 : 
                      healthStatus.overall === 'degraded' ? 207 : 503;
    
    return new Response(null, {
      status: statusCode,
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
  } catch (error) {
    return new Response(null, { status: 503 });
  }
}
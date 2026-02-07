// __tests__/integration/health-check-integration.test.ts
import { describe, it, expect, jest } from '@jest/globals';
import { healthCheckService } from '../../lib/health-check';

// Mock fetch for testing
global.fetch = jest.fn();

describe('Health Check Integration Tests', () => {
  beforeEach(() => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  it('should return frontend health status', () => {
    const frontendHealth = healthCheckService.getFrontendHealth();
    
    expect(frontendHealth).toBeDefined();
    expect(frontendHealth.status).toBe('healthy');
    expect(frontendHealth.timestamp).toBeGreaterThan(0);
    expect(frontendHealth.uptime).toBeGreaterThanOrEqual(0);
    expect(frontendHealth.version).toBe('1.0.0');
    expect(frontendHealth.userAgent).toBeDefined();
    expect(typeof frontendHealth.online).toBe('boolean');
  });

  it('should handle backend health check when backend is reachable', async () => {
    // Mock successful backend response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'healthy',
        timestamp: Date.now(),
        uptime: 1000,
        version: '1.0.0'
      })
    } as Response);

    const backendHealth = await healthCheckService.getBackendHealth();
    
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/health'));
    expect(backendHealth).toBeDefined();
    if (backendHealth) {
      expect(backendHealth.status).toBe('healthy');
      expect(backendHealth.version).toBe('1.0.0');
    }
  });

  it('should handle backend health check when backend is unreachable', async () => {
    // Mock failed backend response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error'));

    const backendHealth = await healthCheckService.getBackendHealth();
    
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/health'));
    expect(backendHealth).toBeNull();
  });

  it('should return full stack health status', async () => {
    // Mock successful backend response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'healthy',
        timestamp: Date.now(),
        uptime: 1000,
        version: '1.0.0'
      })
    } as Response);

    const fullStackHealth = await healthCheckService.getFullStackHealth();
    
    expect(fullStackHealth).toBeDefined();
    expect(fullStackHealth.frontend).toBeDefined();
    expect(fullStackHealth.backend).toBeDefined();
    expect(fullStackHealth.overall).toBe('healthy');
  });

  it('should return degraded status when backend is unhealthy', async () => {
    // Mock unhealthy backend response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        status: 'unhealthy', // Backend reports unhealthy
        timestamp: Date.now(),
        uptime: 1000,
        version: '1.0.0'
      })
    } as Response);

    const fullStackHealth = await healthCheckService.getFullStackHealth();
    
    expect(fullStackHealth.overall).toBe('degraded');
  });

  it('should ping the backend successfully', async () => {
    // Mock successful ping response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
      ok: true,
    } as Response);

    const pingResult = await healthCheckService.pingBackend();
    
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/health'), { method: 'HEAD' });
    expect(pingResult).toBe(true);
  });

  it('should handle ping failure', async () => {
    // Mock failed ping response
    (global.fetch as jest.MockedFunction<typeof fetch>).mockRejectedValueOnce(new Error('Network error'));

    const pingResult = await healthCheckService.pingBackend();
    
    expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/health'), { method: 'HEAD' });
    expect(pingResult).toBe(false);
  });
});
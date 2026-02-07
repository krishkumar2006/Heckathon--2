// __tests__/integration/e2e-workflow.test.ts
import { describe, it, expect, beforeEach, afterEach, jest } from '@jest/globals';
import { taskService } from '../../services/task-service';
import { healthCheckService } from '../../lib/health-check';

// Mock authentication and API calls
jest.mock('../../lib/auth-client', () => ({
  authClient: {
    token: jest.fn().mockResolvedValue({ 
      data: { token: 'mock-jwt-token' } 
    }),
  },
}));

// Mock fetch globally
global.fetch = jest.fn();

describe('End-to-End Workflow Integration Tests', () => {
  const sampleTask = {
    title: 'E2E Test Task',
    description: 'This task is for end-to-end workflow testing',
    completed: false,
    priority: 'medium' as const,
    tags: ['e2e', 'workflow'],
  };

  let createdTaskId: number | null = null;

  beforeEach(() => {
    (global.fetch as jest.MockedFunction<typeof fetch>).mockClear();
  });

  afterEach(async () => {
    if (createdTaskId) {
      // Mock successful deletion
      (global.fetch as jest.MockedFunction<typeof fetch>).mockResolvedValueOnce({
        ok: true,
        status: 200,
      } as Response);

      try {
        await taskService.deleteTask(createdTaskId);
        console.log(`Cleaned up task with ID: ${createdTaskId}`);
      } catch (error) {
        console.warn(`Failed to clean up task with ID: ${createdTaskId}`, error);
      }
      createdTaskId = null;
    }
  });

  it('should complete a full task management workflow', async () => {
    // Step 1: Check system health before starting
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ // For frontend health check
        ok: true,
        json: async () => ({ status: 'healthy', timestamp: Date.now(), uptime: 1000, version: '1.0.0' })
      } as Response)
      .mockResolvedValueOnce({ // For backend health check
        ok: true,
        json: async () => ({ status: 'healthy', timestamp: Date.now(), uptime: 1000, version: '1.0.0' })
      } as Response);

    const healthStatus = await healthCheckService.getFullStackHealth();
    expect(healthStatus.overall).toBe('healthy');

    // Step 2: Create a task
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ // For create task
        ok: true,
        json: async () => ({
          id: 1,
          ...sampleTask,
          user_id: 'test-user-id',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      } as Response);

    const createdTask = await taskService.createTask(sampleTask);
    expect(createdTask).toBeDefined();
    expect(createdTask.id).toBeDefined();
    expect(createdTask.title).toBe(sampleTask.title);
    createdTaskId = createdTask.id;

    // Step 3: Retrieve all tasks
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ // For get tasks
        ok: true,
        json: async () => [createdTask]
      } as Response);

    const tasks = await taskService.getTasks();
    expect(tasks).toBeDefined();
    expect(tasks.length).toBeGreaterThan(0);
    expect(tasks.some(task => task.id === createdTask.id)).toBe(true);

    // Step 4: Update the task
    const updatedTitle = 'Updated E2E Test Task';
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ // For update task
        ok: true,
        json: async () => ({
          ...createdTask,
          title: updatedTitle,
          updated_at: new Date().toISOString(),
        })
      } as Response);

    const updatedTask = await taskService.updateTask(createdTask.id, {
      title: updatedTitle,
      priority: 'high',
    });
    expect(updatedTask.id).toBe(createdTask.id);
    expect(updatedTask.title).toBe(updatedTitle);
    expect(updatedTask.priority).toBe('high');

    // Step 5: Toggle task completion
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ // For toggle completion
        ok: true,
        json: async () => ({
          ...updatedTask,
          completed: true,
          updated_at: new Date().toISOString(),
        })
      } as Response);

    const completedTask = await taskService.toggleTaskCompletion(createdTask.id);
    expect(completedTask.id).toBe(createdTask.id);
    expect(completedTask.completed).toBe(true);

    // Step 6: Delete the task
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ // For delete task
        ok: true,
        status: 200,
      } as Response);

    await taskService.deleteTask(createdTask.id);
    expect(createdTaskId).toBeNull(); // Cleanup happened in afterEach

    console.log('Full workflow completed successfully!');
  });

  it('should handle errors gracefully during workflow', async () => {
    // Mock an error during task creation
    (global.fetch as jest.MockedFunction<typeof fetch>)
      .mockResolvedValueOnce({ // For health check
        ok: true,
        json: async () => ({ status: 'healthy', timestamp: Date.now(), uptime: 1000, version: '1.0.0' })
      } as Response)
      .mockResolvedValueOnce({ // For backend health check
        ok: true,
        json: async () => ({ status: 'healthy', timestamp: Date.now(), uptime: 1000, version: '1.0.0' })
      } as Response)
      .mockRejectedValueOnce(new Error('Network error')); // For create task

    await expect(taskService.createTask(sampleTask))
      .rejects
      .toThrow('Network error');
  });
});
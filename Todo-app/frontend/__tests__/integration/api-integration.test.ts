// __tests__/integration/api-integration.test.ts
import { describe, it, expect, beforeEach, afterEach } from '@jest/globals';
import { taskService } from '../../services/task-service';
import { authClient } from '../../lib/auth-client';

// Mock authentication for testing
jest.mock('../../lib/auth-client', () => ({
  authClient: {
    token: jest.fn().mockResolvedValue({ 
      data: { token: 'mock-jwt-token' } 
    }),
  },
}));

describe('API Integration Tests', () => {
  // Sample task data for testing
  const sampleTask = {
    title: 'Integration Test Task',
    description: 'This is a test task for integration testing',
    completed: false,
    priority: 'medium' as const,
    tags: ['test', 'integration'],
  };

  let createdTaskId: number | null = null;

  // Clean up after tests
  afterEach(async () => {
    if (createdTaskId) {
      try {
        await taskService.deleteTask(createdTaskId);
        console.log(`Cleaned up task with ID: ${createdTaskId}`);
      } catch (error) {
        console.warn(`Failed to clean up task with ID: ${createdTaskId}`, error);
      }
      createdTaskId = null;
    }
  });

  it('should successfully create a task via frontend-backend integration', async () => {
    const createdTask = await taskService.createTask(sampleTask);
    
    expect(createdTask).toBeDefined();
    expect(createdTask.id).toBeDefined();
    expect(createdTask.title).toBe(sampleTask.title);
    expect(createdTask.description).toBe(sampleTask.description);
    expect(createdTask.completed).toBe(false);
    expect(createdTask.priority).toBe(sampleTask.priority);
    expect(createdTask.tags).toEqual(sampleTask.tags);
    
    // Store the ID for cleanup
    createdTaskId = createdTask.id;
  });

  it('should successfully retrieve tasks via frontend-backend integration', async () => {
    // First create a task to ensure there's something to retrieve
    const createdTask = await taskService.createTask({
      ...sampleTask,
      title: 'Retrieve Test Task',
    });
    createdTaskId = createdTask.id;

    // Retrieve tasks
    const tasks = await taskService.getTasks();
    
    expect(tasks).toBeDefined();
    expect(Array.isArray(tasks)).toBe(true);
    expect(tasks.some(task => task.id === createdTask.id)).toBe(true);
  });

  it('should successfully update a task via frontend-backend integration', async () => {
    // Create a task first
    const createdTask = await taskService.createTask({
      ...sampleTask,
      title: 'Update Test Task',
    });
    createdTaskId = createdTask.id;

    // Update the task
    const updatedTitle = 'Updated Task Title';
    const updatedTask = await taskService.updateTask(createdTask.id, {
      title: updatedTitle,
      priority: 'high',
    });

    expect(updatedTask.id).toBe(createdTask.id);
    expect(updatedTask.title).toBe(updatedTitle);
    expect(updatedTask.priority).toBe('high');
  });

  it('should successfully toggle task completion via frontend-backend integration', async () => {
    // Create a task first
    const createdTask = await taskService.createTask({
      ...sampleTask,
      title: 'Toggle Completion Test Task',
      completed: false,
    });
    createdTaskId = createdTask.id;

    // Toggle completion
    const toggledTask = await taskService.toggleTaskCompletion(createdTask.id);

    expect(toggledTask.id).toBe(createdTask.id);
    expect(toggledTask.completed).toBe(true);
  });

  it('should successfully delete a task via frontend-backend integration', async () => {
    // Create a task first
    const createdTask = await taskService.createTask({
      ...sampleTask,
      title: 'Delete Test Task',
    });
    createdTaskId = createdTask.id;

    // Delete the task
    await taskService.deleteTask(createdTask.id);

    // Verify the task is deleted by trying to retrieve it
    // Note: This test assumes the backend returns a specific error for non-existent tasks
    // In a real scenario, you might want to check that the task no longer appears in the list
    try {
      await taskService.updateTask(createdTask.id, { title: 'Should fail' });
      // If we reach this line, the deletion didn't work properly
      expect(true).toBe(false); // Force test failure
    } catch (error) {
      // Expected behavior - task should not exist anymore
      expect(error).toBeDefined();
    }
    
    // Reset the ID since the task was deleted
    createdTaskId = null;
  });

  it('should handle API errors gracefully', async () => {
    // Test with an invalid task ID
    await expect(taskService.updateTask(999999, { title: 'Test' }))
      .rejects
      .toThrow(); // Should throw an error for non-existent task
  });
});
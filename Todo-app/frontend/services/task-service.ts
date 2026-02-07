// Frontend task service for authenticated data flow
import { api, Task } from '@/lib/api';

export const taskService = {
  // Get all tasks
  getTasks: async (
    completed?: 'all' | 'pending' | 'completed',
    priority?: 'low' | 'medium' | 'high',
    search?: string,
    sort?: 'created_at' | 'due_date' | 'priority' | 'title',
    order?: 'asc' | 'desc',
    tags?: string,
    retries: number = 3,
    timeout: number = 10000
  ): Promise<Task[]> => {
    return await api.tasks.getTasks(completed, priority, search, sort, order, tags, retries, timeout);
  },

  // Create a new task
  createTask: async (
    taskData: Omit<Task, 'id' | 'user_id' | 'created_at' | 'updated_at'>,
    retries: number = 3,
    timeout: number = 10000
  ): Promise<Task> => {
    return await api.tasks.createTask(taskData, retries, timeout);
  },

  // Update a task
  updateTask: async (
    taskId: number,
    taskData: Partial<Task>,
    retries: number = 3,
    timeout: number = 10000
  ): Promise<Task> => {
    return await api.tasks.updateTask(taskId, taskData, retries, timeout);
  },

  // Toggle task completion
  toggleTaskCompletion: async (
    taskId: number,
    retries: number = 3,
    timeout: number = 10000
  ): Promise<Task> => {
    return await api.tasks.toggleTaskCompletion(taskId, retries, timeout);
  },

  // Delete a task
  deleteTask: async (
    taskId: number,
    retries: number = 3,
    timeout: number = 10000
  ): Promise<void> => {
    await api.tasks.deleteTask(taskId, retries, timeout);
  },
};

// Export individual functions for direct use
export const {
  getTasks,
  createTask,
  updateTask,
  toggleTaskCompletion,
  deleteTask,
} = taskService;
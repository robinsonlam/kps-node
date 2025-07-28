import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskRequest, TaskQueryParams, TaskPriority } from '../types/task';

/**
 * Task Service - Business Logic Layer
 * 
 * This service manages the in-memory task storage and business logic.
 * In a real application, this would interface with a database.
 * 
 * TODO: Implement the service methods
 */

// In-memory storage (for this interview - normally you'd use a database)
const tasks: Task[] = [];

// * priority order, high to low (by array index)
const priorityOrder: TaskPriority[] = ['high', 'medium', 'low'];

export class TaskService {
  
  static async getAllTasks(queryParams?: TaskQueryParams): Promise<Task[]> {
    // * TODO: Possibly make this nicer
    const filteredTasks = tasks.filter((t) => {
      const isPriority = t.priority === (queryParams?.priority || t.priority);
      const isStatus = t.status === (queryParams?.status || t.status);
      return isPriority && isStatus;
    });

    const sortedTasks = filteredTasks.sort(this.sortTasksByPriority);
    return sortedTasks;
  }

  static async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const newTask: Task = {
      id: uuidv4(),
      ...taskData,
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    tasks.push(newTask);

    return newTask;
  }

  // Test helper method - clears all tasks for testing
  static async clearAllTasks(): Promise<void> {
    tasks.length = 0;
  }

  // * Helper Methods for Tasks
  static sortTasksByPriority(a: Task, b: Task) {
    const indexA = priorityOrder.indexOf(a?.priority);
    const indexB = priorityOrder.indexOf(b?.priority);
    return indexA - indexB
  }
} 
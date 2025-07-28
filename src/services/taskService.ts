import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskRequest, TaskQueryParams, TaskPriority } from '../types/task';
import { exist } from 'joi';

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
      const isPriority = t.priority.toLowerCase() === (queryParams?.priority || t.priority).toLowerCase();
      const isStatus = t.status.toLowerCase() === (queryParams?.status || t.status).toLowerCase();
      return isPriority && isStatus;
    });

    const sortedTasks = filteredTasks.sort(this.sortTasksByPriority);
    return sortedTasks;
  }

  static async createTask(taskData: CreateTaskRequest): Promise<Task> {
    const existingTask = tasks.find(t => t.title.toLowerCase() === taskData.title.toLowerCase());

    if (existingTask) {
      throw new Error(`Task exists with title ${taskData.title}`)
    }

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
import { v4 as uuidv4 } from 'uuid';
import { Task, CreateTaskRequest, TaskQueryParams } from '../types/task';

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

export class TaskService {
  
  static async getAllTasks(queryParams?: TaskQueryParams): Promise<Task[]> {
    // TODO: Implement getting all tasks with filtering
    // - Filter by status if provided
    // - Filter by priority if provided  
    // - Sort by priority (high -> medium -> low) then by createdAt
    // - Return filtered and sorted tasks
    
    throw new Error('Not implemented yet');
  }

  static async createTask(taskData: CreateTaskRequest): Promise<Task> {
    // TODO: Implement creating a new task
    // - Generate UUID for id
    // - Set default status to 'pending'
    // - Set createdAt and updatedAt to current time
    // - Add to tasks array
    // - Return created task
    
    throw new Error('Not implemented yet');
  }

  // Test helper method - clears all tasks for testing
  static async clearAllTasks(): Promise<void> {
    tasks.length = 0;
  }
} 
/**
 * Task Management Types
 * 
 * TODO: Complete the Task interface based on the requirements in README.md
 */

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Task {
  id: string;              // UUID
  title: string;           // Required, max 100 chars
  description?: string;    // Optional, max 500 chars
  priority: TaskPriority;
  status: TaskStatus;
  createdAt: Date;
  updatedAt: Date;
  dueDate?: Date;         // Optional
}

export interface CreateTaskRequest {
  title: string;
  description?: string;
  priority: TaskPriority;
  dueDate?: Date;
}

export interface TaskQueryParams {
  status?: TaskStatus;
  priority?: TaskPriority;
} 
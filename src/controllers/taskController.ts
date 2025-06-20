import { Request, Response, NextFunction } from 'express';
import { Task, CreateTaskRequest, TaskQueryParams } from '../types/task';
// Import your validation schemas when ready
// import { createTaskSchema } from '../validation/taskValidation';

/**
 * Task Controller
 * 
 * TODO: Implement the controller methods for basic task operations
 * Remember to:
 * - Use proper TypeScript types
 * - Validate input data  
 * - Handle errors appropriately
 * - Return proper HTTP status codes
 * - Use the task service for business logic
 */

export const getAllTasks = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // TODO: Implement get all tasks
    // - Extract query parameters for filtering (status, priority)
    // - Call task service method
    // - Sort by priority then by createdAt
    // - Return filtered and sorted tasks
    
    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // TODO: Implement create task
    // - Validate request body using Joi schema
    // - Call task service to create task
    // - Return 201 with created task
    
    res.status(501).json({ message: 'Not implemented yet' });
  } catch (error) {
    next(error);
  }
}; 
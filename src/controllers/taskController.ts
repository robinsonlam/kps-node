import { Request, Response, NextFunction } from 'express';
import { Task, CreateTaskRequest, TaskQueryParams } from '../types/task';
import { TaskService } from '../services/taskService';
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
    // - Sort by priority then by createdAt
    // - Return filtered and sorted tasks

    const { status, priority }: TaskQueryParams = req.query;
    const tasks = await TaskService.getAllTasks({ status, priority });
    res.send(tasks);

  } catch (error) {
    next(error);
  }
};

export const createTask = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // TODO: Implement create task
    // - Validate request body using Joi schema

    const taskData: Task = {
      ...req.body
    };

    const newTask = await TaskService.createTask(taskData);

    res.status(201).send(newTask);
  } catch (error) {
    next(error);
  }
}; 
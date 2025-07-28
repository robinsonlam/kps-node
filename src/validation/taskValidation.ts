import Joi from 'joi';
import { CreateTaskRequest, TaskQueryParams } from '../types/task';

/**
 * Task Validation Schemas
 * 
 * TODO: Implement Joi validation schemas for task operations
 * Reference the task requirements in README.md
 */

export const createTaskSchema = Joi.object<CreateTaskRequest>({
  // TODO: Define validation schema for creating a task
  // Remember the requirements:
  // - title: required, string, max 100 characters
  // - description: optional, string, max 500 characters  
  // - priority: required, one of 'low', 'medium', 'high'
  // - dueDate: optional, valid date
  // Note: status, id, and timestamps are set automatically

  title: Joi.string().min(1).max(100).required().messages({
    'string.required': "Missing 'title' value",
  }),
  description: Joi.string().max(500).optional(),
  priority: Joi.string().valid('high', 'medium', 'low').required().messages({
    'string.required': "Missing 'priority' value",
  }),
  dueDate: Joi.string().isoDate().optional().messages({
    'string.isoDate': "'dueDate' must be a valid date isostring value"
  }),
}).unknown(false); // Reject unknown fields

export const taskQuerySchema = Joi.object<TaskQueryParams>({
  // TODO: Define validation schema for query parameters
  // - status: optional, valid task status
  // - priority: optional, valid task priority

  status: Joi.string().valid('pending', 'in-progress', 'completed').optional(),
  priority: Joi.string().valid('high', 'medium', 'low').optional(),
}).unknown(false); // Reject unknown query params

// Validation helper functions
export const validateCreateTask = (data: unknown) => {
  return createTaskSchema.validate(data);
};

export const validateTaskQuery = (data: unknown) => {
  return taskQuerySchema.validate(data);
}; 
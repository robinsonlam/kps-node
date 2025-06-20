import Joi from 'joi';

/**
 * Task Validation Schemas
 * 
 * TODO: Implement Joi validation schemas for task operations
 * Reference the task requirements in README.md
 */

export const createTaskSchema = Joi.object({
  // TODO: Define validation schema for creating a task
  // Remember the requirements:
  // - title: required, string, max 100 characters
  // - description: optional, string, max 500 characters  
  // - priority: required, one of 'low', 'medium', 'high'
  // - dueDate: optional, valid date
  // Note: status, id, and timestamps are set automatically
}).unknown(false); // Reject unknown fields

export const taskQuerySchema = Joi.object({
  // TODO: Define validation schema for query parameters
  // - status: optional, valid task status
  // - priority: optional, valid task priority
}).unknown(false); // Reject unknown query params

// Validation helper functions
export const validateCreateTask = (data: unknown) => {
  return createTaskSchema.validate(data);
};

export const validateTaskQuery = (data: unknown) => {
  return taskQuerySchema.validate(data);
}; 
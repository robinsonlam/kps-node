import { Router } from 'express';
import * as taskController from '../controllers/taskController';

const router = Router();

// TODO: Define your routes here based on the requirements

// GET /api/tasks - Get all tasks (with query params for filtering)
router.get('/tasks', taskController.getAllTasks);

// POST /api/tasks - Create new task
router.post('/tasks', taskController.createTask);

// Test helper endpoint - only for clearing test data
if (process.env.NODE_ENV === 'test') {
  router.delete('/tasks/test-clear-all', async (req, res) => {
    const { TaskService } = await import('../services/taskService');
    await TaskService.clearAllTasks();
    res.status(204).send();
  });
}

export { router as taskRoutes }; 
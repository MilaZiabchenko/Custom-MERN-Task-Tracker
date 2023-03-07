import express from 'express';
import {
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  createTask,
} from '../controllers/tasksController.js';

const router = express.Router();

router.use(express.json());

router.get('/', getTasks);
router.get('/:id', getTask);
router.put('/:id', updateTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/', createTask);

export default router;

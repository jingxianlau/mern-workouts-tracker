import express from 'express';

const router = express.Router();

import {
  getAllWorkouts,
  getSingleWorkout,
  createWorkout,
  updateWorkout,
  deleteWorkout
} from '../controllers/workoutController';
import requireAuth from '../middleware/requireAuth';

router.use(requireAuth);

router.get('/', getAllWorkouts);

router.get('/:id', getSingleWorkout);

router.post('/', createWorkout);

router.patch('/:id', updateWorkout);

router.delete('/:id', deleteWorkout);

export default router;

import { RequestHandler } from 'express';
import Workout from '../models/Workout';
import mongoose from 'mongoose';

export const getAllWorkouts: RequestHandler = async (req, res) => {
  const workouts = await Workout.find({});
  res.json(workouts);
};

export const getSingleWorkout: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ err: 'Workout does not exist' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    res.status(404).json({ err: 'Workout could not be found' });
  }

  res.json(workout);
};

export const createWorkout: RequestHandler = async (req, res) => {
  const { title, reps, load } = req.body;

  try {
    const workout = await Workout.create({ title, reps, load });

    res.json(workout);
  } catch (err) {
    res.status(400).json({ err });
  }
};

export const updateWorkout: RequestHandler = async (req, res) => {
  const { title, reps, load } = req.body;
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ err: 'Workout does not exist' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    res.status(404).json({ err: 'Workout does not exist' });
    return;
  }

  workout.title = title;
  workout.load = load;
  workout.reps = reps;

  await workout.save();

  res.json(workout);
};

export const deleteWorkout: RequestHandler = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(404).json({ err: 'Workout does not exist' });
  }

  const workout = await Workout.findByIdAndDelete(id);

  if (!workout) {
    res.status(404).json({ err: 'Workout does not exist' });
  }

  res.json(workout);
};

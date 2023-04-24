import { RequestHandler } from 'express';
import Workout from '../models/Workout';
import mongoose from 'mongoose';
import env from '../utils/envalid';
import jwt from 'jsonwebtoken';

interface JwtPayload {
  _id: string;
}

export const getAllWorkouts: RequestHandler = async (req, res) => {
  const { authorization } = req.headers;
  const token = (authorization as string).split(' ')[1];
  const { _id } = jwt.verify(token, env.SECRET) as JwtPayload;

  const workouts = await Workout.find({ user_id: _id }).sort({ createdAt: -1 });
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

  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }

  if (emptyFields.length) {
    return res.status(400).json({
      err: { message: 'Please Fill in All the Fields', fields: emptyFields }
    });
  }

  const { authorization } = req.headers;
  const token = (authorization as string).split(' ')[1];
  const { _id } = jwt.verify(token, env.SECRET) as JwtPayload;

  try {
    const workout = await Workout.create({ title, reps, load, user_id: _id });

    return res.json(workout);
  } catch (err) {
    return res.status(400).json({ err });
  }
};

export const updateWorkout: RequestHandler = async (req, res) => {
  const { title, reps, load } = req.body;

  let emptyFields = [];
  if (!title) {
    emptyFields.push('title');
  }
  if (!reps) {
    emptyFields.push('reps');
  }
  if (!load) {
    emptyFields.push('load');
  }

  if (!emptyFields.length) {
    return res.status(400).json({
      err: { message: 'Please Fill in All the Fields', fields: emptyFields }
    });
  }

  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    return res.status(404).json({ err: 'Workout does not exist' });
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ err: 'Workout does not exist' });
  }

  workout.title = title;
  workout.load = load;
  workout.reps = reps;

  await workout.save();

  return res.json(workout);
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

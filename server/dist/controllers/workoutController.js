"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkout = exports.updateWorkout = exports.createWorkout = exports.getSingleWorkout = exports.getAllWorkouts = void 0;
const Workout_1 = __importDefault(require("../models/Workout"));
const mongoose_1 = __importDefault(require("mongoose"));
const getAllWorkouts = async (req, res) => {
    const workouts = await Workout_1.default.find({});
    res.json(workouts);
};
exports.getAllWorkouts = getAllWorkouts;
const getSingleWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ err: 'Workout does not exist' });
    }
    const workout = await Workout_1.default.findById(id);
    if (!workout) {
        res.status(404).json({ err: 'Workout could not be found' });
    }
    res.json(workout);
};
exports.getSingleWorkout = getSingleWorkout;
const createWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    try {
        const workout = await Workout_1.default.create({ title, reps, load });
        res.json(workout);
    }
    catch (err) {
        res.status(400).json({ err });
    }
};
exports.createWorkout = createWorkout;
const updateWorkout = async (req, res) => {
    const { title, reps, load } = req.body;
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ err: 'Workout does not exist' });
    }
    const workout = await Workout_1.default.findById(id);
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
exports.updateWorkout = updateWorkout;
const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    if (!mongoose_1.default.isValidObjectId(id)) {
        res.status(404).json({ err: 'Workout does not exist' });
    }
    const workout = await Workout_1.default.findByIdAndDelete(id);
    if (!workout) {
        res.status(404).json({ err: 'Workout does not exist' });
    }
    res.json(workout);
};
exports.deleteWorkout = deleteWorkout;
//# sourceMappingURL=workoutController.js.map
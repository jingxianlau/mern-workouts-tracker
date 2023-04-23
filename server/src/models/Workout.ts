import mongoose from 'mongoose';

const WorkoutSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },
    reps: {
      type: Number,
      required: true
    },
    load: {
      type: Number,
      required: true
    }
  },
  { timestamps: true }
);

const Workout = mongoose.model('Workout', WorkoutSchema);

export default Workout;

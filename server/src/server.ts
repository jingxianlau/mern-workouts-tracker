import express from 'express';
import mongoose from 'mongoose';
import env from './utils/envalid';
import workoutRoutes from './routes/workoutRoutes';

const app = express();

app.use(express.json());

app.use('/api/workouts/', workoutRoutes);

app.get('/', (req, res) => {
  res.json({ msg: 'hello, world!' });
});

mongoose
  .connect(env.MONGO_URI)
  .then(() => {
    app.listen(env.PORT, () => {
      console.log(`app listening on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.log(err));

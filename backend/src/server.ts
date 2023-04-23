import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import env from './utils/envalid';

import workoutRoutes from './routes/workoutRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

app.use('/api/workouts/', workoutRoutes);
app.use('/api/users/', userRoutes);

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

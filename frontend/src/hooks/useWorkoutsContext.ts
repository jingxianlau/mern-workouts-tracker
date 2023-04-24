import { useContext } from 'react';
import {
  WorkoutsContext,
  WorkoutsContextValue
} from '../context/WorkoutContext';

const UseWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  return context as WorkoutsContextValue;
};

export default UseWorkoutsContext;

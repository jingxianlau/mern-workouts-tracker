import { useContext } from 'react';
import { WorkoutsContext } from '../context/WorkoutContext';

export const UseWorkoutsContext = () => {
  return useContext(WorkoutsContext);
};

export default UseWorkoutsContext;

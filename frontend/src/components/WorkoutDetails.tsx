import React from 'react';
import { Workout } from '../types';
import UseWorkoutsContext from '../hooks/useWorkoutsContext';
import { formatDistanceToNow } from 'date-fns';
import UseAuthContext from '../hooks/useAuthContext';

interface WorkoutDetailsProps {
  workout: Workout;
}

const WorkoutDetails: React.FC<WorkoutDetailsProps> = ({ workout }) => {
  const { dispatch } = UseWorkoutsContext();
  const { state: user } = UseAuthContext();

  const handleDelete: React.MouseEventHandler<HTMLSpanElement> = async () => {
    if (!user) {
      return;
    }

    const response = await fetch(
      `http://localhost:4000/api/workouts/${workout._id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      }
    );
    const json = await response.json();

    if (response.ok) {
      dispatch({ type: 'DELETE_WORKOUT', payload: json });
    }
  };

  return (
    <div className='workout-details'>
      <h4>{workout.title}</h4>
      <p>
        <strong>Load: {workout.load}</strong>
      </p>
      <p>
        <strong>Reps: {workout.reps}</strong>
      </p>
      <p className='timestamp'>
        {formatDistanceToNow(new Date(workout.createdAt), { addSuffix: true })}
      </p>
      <span onClick={handleDelete} className='material-symbols-outlined'>
        delete
      </span>
    </div>
  );
};

export default WorkoutDetails;

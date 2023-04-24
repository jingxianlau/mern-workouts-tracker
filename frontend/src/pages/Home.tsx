import React, { useEffect } from 'react';
import WorkoutDetails from '../components/WorkoutDetails';
import WorkoutForm from '../components/WorkoutForm';
import UseWorkoutsContext from '../hooks/useWorkoutsContext';
import UseAuthContext from '../hooks/useAuthContext';

const Home: React.FC = () => {
  const { state, dispatch } = UseWorkoutsContext();

  const { state: user } = UseAuthContext();

  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        return;
      }
      const response = await fetch('http://localhost:4000/api/workouts', {
        headers: {
          Authorization: `Bearer ${user.token}`
        }
      });

      const json = await response.json();

      if (response.ok) {
        dispatch({ type: 'SET_WORKOUTS', payload: json });
      }
    };

    fetchWorkouts();
  }, [dispatch, user]);

  return (
    <div className='home'>
      <div className='workouts'>
        {state &&
          state.map(workout => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;

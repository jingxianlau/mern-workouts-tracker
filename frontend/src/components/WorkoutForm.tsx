import React, { FormEventHandler, useState } from 'react';
import UseWorkoutsContext from '../hooks/useWorkoutsContext';

const WorkoutForm: React.FC = () => {
  const { dispatch } = UseWorkoutsContext();

  const [title, setTitle] = useState('');
  const [load, setLoad] = useState('');
  const [reps, setReps] = useState('');
  const [error, setError] = useState<null | string>(null);

  const handleSubmit: FormEventHandler = async e => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch('http://localhost:4000/api/workouts/', {
      method: 'POST',
      body: JSON.stringify(workout),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    } else {
      setTitle('');
      setLoad('');
      setReps('');
      setError(null);

      dispatch({ type: 'CREATE_WORKOUT', payload: json });
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Title</label>
      <input
        type='text'
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <label>Load</label>
      <input
        type='number'
        value={load}
        onChange={e => setLoad(e.target.value)}
      />
      <label>Reps</label>
      <input
        type='number'
        value={reps}
        onChange={e => setReps(e.target.value)}
      />

      <button type='submit'>Add Workout</button>

      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;

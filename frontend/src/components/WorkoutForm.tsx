import React, { FormEventHandler, useState } from 'react';

const WorkoutForm: React.FC = () => {
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
    }
  };

  return (
    <form className='create' onSubmit={handleSubmit}>
      <h3>Add New Workout</h3>

      <label>Title</label>
      <input type='text' onChange={e => setTitle(e.target.value)} />
      <label>Load</label>
      <input type='number' onChange={e => setLoad(e.target.value)} />
      <label>Reps</label>
      <input type='number' onChange={e => setReps(e.target.value)} />

      <button type='submit'>Add Workout</button>

      {error && <div className='error'>{error}</div>}
    </form>
  );
};

export default WorkoutForm;

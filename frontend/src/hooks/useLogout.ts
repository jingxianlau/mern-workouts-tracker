import UseAuthContext from './useAuthContext';
import UseWorkoutsContext from './useWorkoutsContext';

export const useLogout = () => {
  const { dispatch } = UseAuthContext();
  const { dispatch: workoutsDispatch } = UseWorkoutsContext();

  const logout = () => {
    localStorage.removeItem('user');

    workoutsDispatch({ type: 'SET_WORKOUTS', payload: [] });
    dispatch({ type: 'LOGOUT' });
  };

  return { logout };
};

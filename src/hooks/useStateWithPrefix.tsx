import { useReducer } from 'react';

export const useStateWithPrefix = (prefix: string) => {
  return useReducer<(prevState: string, newState: string) => string>(
    (_, newState) => {
      if (newState === ``) return prefix;
      return [prefix, newState].join(``);
    },
    prefix,
  );
};

export default useStateWithPrefix;

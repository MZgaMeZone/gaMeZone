import { createContext } from 'react';

const UserDataContext = createContext<
  [string, React.Dispatch<React.SetStateAction<string>>]
>(['', () => {}]);
export default UserDataContext;

import {createContext, useEffect, useState} from 'react';
import {getToken} from '../utils/token.util.js';
import {getUser} from '../utils/user.util.js';

export const UserContext = createContext(null);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (token) {
      getUser().then((data) => {
        setUser(data);
        setIsLoading(false);
      });
    }
  }, []);

  return (
      <UserContext.Provider value={{user, setUser, isLoading}}>
        {children}
      </UserContext.Provider>
  );
};
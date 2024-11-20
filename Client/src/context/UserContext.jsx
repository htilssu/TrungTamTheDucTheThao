import {createContext, useContext, useEffect, useState} from 'react';
import {getToken, removeToken} from '../utils/token.util.js';
import {getUser} from '../utils/user.util.js';

export const UserContext = createContext(null);
// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => useContext(UserContext);

// eslint-disable-next-line react/prop-types
export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const token = getToken();
    if (token) {
      getUser().then(async (data) => {
        const u = await data.json();
        setUser(u);
        setIsLoading(false);
      }).catch(() => {
        removeToken();
      });
    }
    else {
      setIsLoading(false);
    }
  }, []);

  return (
      <UserContext.Provider value={{user, setUser, isLoading}}>
        {children}
      </UserContext.Provider>
  );
};
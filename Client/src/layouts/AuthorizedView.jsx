import {useAuth} from '../context/UserContext.jsx';
import {Outlet, useNavigate} from 'react-router-dom';

const AuthorizedView = ({role}) => {
  const navigate = useNavigate();

  const {isLoading, user} = useAuth();

  if (!isLoading && !user) {
    if (user.roleName !== role) {
      navigate('/403');
    }
  } else {
    return null;
  }

  return (
      <div>
        <Outlet/>
      </div>
  );
};

export default AuthorizedView;
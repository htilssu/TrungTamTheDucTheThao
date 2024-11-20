import {useAuth} from '../context/UserContext.jsx';
import {Outlet, useNavigate} from 'react-router-dom';

const AuthorizedView = ({role}) => {
  const navigate = useNavigate();

  const {isLoading, user} = useAuth();

  if (!isLoading) {
    if (!user) {
      navigate('/sign-in');
    }
    if (user.roleName !== role) {
      navigate('/403');
    }
  }

  return (
      <div>
        <Outlet/>
      </div>
  );
};

export default AuthorizedView;
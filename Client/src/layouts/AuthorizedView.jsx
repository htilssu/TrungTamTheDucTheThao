import {useAuth} from '../context/UserContext.jsx';
import {Outlet, useNavigate} from 'react-router-dom';

const AuthorizedView = ({role, children}) => {
  const navigate = useNavigate();

  const {isLoading, user} = useAuth();

  if (!isLoading) {
    if (user.role !== role) {
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
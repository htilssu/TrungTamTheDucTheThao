import {useAuth} from '../context/UserContext.jsx';
import {Outlet, useNavigate} from 'react-router-dom';

const AuthorizedView = ({role}) => {
  const navigate = useNavigate();

  const {isLoading, user} = useAuth();

  if (!isLoading) {
    console.log(user);
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
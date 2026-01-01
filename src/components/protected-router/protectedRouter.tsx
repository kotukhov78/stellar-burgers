import { useSelector } from '../../services/store';
import { Navigate, useLocation } from 'react-router-dom';
import { selectIsAuthChecked, selectUser } from '../slices/userSlice';
import { Preloader } from '@ui';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
  children: React.ReactElement;
};

export const ProtectedRouter = ({
  onlyUnAuth,
  children
}: ProtectedRouteProps) => {
  const isAuthChecked = useSelector(selectIsAuthChecked);
  const user = useSelector(selectUser);
  const location = useLocation();

  if (!isAuthChecked) {
    return <Preloader />;
  }
  if (onlyUnAuth && user) {
    return <Navigate to={location.state?.from || '/'} replace />;
  }
  if (!onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  return children;
};

import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import {
  login,
  selectIsAuthChecked,
  selectUserError
} from '../../components/slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);
  const navigate = useNavigate();
  const isAuthChecked = useSelector(selectIsAuthChecked);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  useEffect(() => {
    if (isAuthChecked) {
      navigate('/');
    }
  }, [isAuthChecked, navigate]);

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};

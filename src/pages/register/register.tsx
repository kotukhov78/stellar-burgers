import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { register, selectUserError } from '../../components/slices/userSlice';

export const Register: FC = () => {
  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const error = useSelector(selectUserError);

  // const { isAuthChecked, error } = useSelector((state) => state.user);

  // useEffect(() => {
  //   if (isAuthChecked) {
  //     navigate('/');
  //   }
  // }, [isAuthChecked, navigate]);

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(register({ email, name: userName, password }));
  };

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};

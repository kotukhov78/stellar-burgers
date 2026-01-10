import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { RootState, useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  // Получаем данные пользователя из Redux store
  const user = useSelector((state: RootState) => state.user.user);

  // Извлекаем имя пользователя, если пользователь авторизован
  const userName = user?.name || '';

  return <AppHeaderUI userName={userName} />;
};

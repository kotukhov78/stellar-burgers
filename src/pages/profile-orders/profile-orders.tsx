import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchProfileOrders,
  selectProfileOrdersLoading,
  selectProfileOrders
} from '../../components/slices/profileOrdersSlice';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const loading = useSelector(selectProfileOrdersLoading);

  useEffect(() => {
    dispatch(fetchProfileOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};

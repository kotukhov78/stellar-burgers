import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import {
  fetchFeeds,
  selectFeeds,
  selectFeedsError,
  selectFeedsLoading,
  selectTotalOrders,
  selectTotalToday
} from '../../components/slices/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  // const orders: TOrder[] = [];
  const dispatch = useDispatch();
  const orders = useSelector(selectFeeds);
  const loading = useSelector(selectFeedsLoading);
  const error = useSelector(selectFeedsError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (loading) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  // <FeedUI orders={orders} handleGetFeeds={() => {}} />;
  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

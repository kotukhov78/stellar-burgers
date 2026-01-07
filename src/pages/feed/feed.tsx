import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import {
  fetchFeeds,
  selectFeeds,
  selectFeedsError,
  selectFeedsLoading
} from '../../services/slices/feedsSlice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const orders = useSelector(selectFeeds);
  const isLoading = useSelector(selectFeedsLoading);
  const error = useSelector(selectFeedsError);

  useEffect(() => {
    dispatch(fetchFeeds());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeeds());
  };

  if (isLoading || !orders.length) {
    return <Preloader />;
  }

  if (error) {
    return <div>Ошибка получения списка всех заказов: {error}</div>;
  }

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};

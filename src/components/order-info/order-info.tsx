import { FC, useEffect, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { OrderInfoUI } from '../ui/order-info';
import { TIngredient } from '@utils-types';
import { useDispatch, useSelector } from '../../services/store';
import { selectIngredients } from '../slices/ingredientsSlice';
import { useParams } from 'react-router-dom';
// import { selectOrderModalData } from '../slices/orderSlice';
import {
  fetchOrderByNumber,
  selectFeeds,
  selectSelectedOrder
} from '../slices/feedsSlice';
import { selectProfileOrders } from '../slices/profileOrdersSlice';

export const OrderInfo: FC = () => {
  /** TODO: взять переменные orderData и ingredients из стора */
  const orderModalData = useSelector(selectSelectedOrder);
  const userOrders = useSelector(selectProfileOrders);
  const feedsData = useSelector(selectFeeds);
  const ingredients = useSelector(selectIngredients);

  const { number } = useParams<{ number: string }>();
  const dispatch = useDispatch();

  let orderData = orderModalData;
  const orderNumber = Number(number);

  // для отображения на отдельном экране
  useEffect(() => {
    if (!orderData && number) {
      dispatch(fetchOrderByNumber(orderNumber));
    }
  }, [dispatch, number]);

  if (!orderData && number) {
    orderData =
      feedsData?.find((order) => order.number === orderNumber) || null;

    if (!orderData) {
      orderData =
        userOrders.find((order) => order.number === orderNumber) || null;
    }
  }

  /* Готовим данные для отображения */
  const orderInfo = useMemo(() => {
    if (!orderData || !ingredients.length) return null;

    const date = new Date(orderData.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = orderData.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...orderData,
      ingredientsInfo,
      date,
      total
    };
  }, [orderData, ingredients]);

  if (!orderInfo) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};

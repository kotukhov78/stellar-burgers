import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../components/slices/ingredientsSlice';
import userReducer from '../components/slices/userSlice';
import orderReducer from '../components/slices/orderSlice';
import feedsReducer from '../components/slices/feedsSlice';
import ordersReducer from '../components/slices/profileOrdersSlice';
import setConstructorItems from '../components/slices/constructorSlice';
// ... другие редюсеры

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  burgerConstructor: setConstructorItems
  // ... другие редюсеры
});

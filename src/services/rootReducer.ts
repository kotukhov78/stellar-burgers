import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from './slices/ingredientsSlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import feedsReducer from './slices/feedsSlice';
import ordersReducer from './slices/profileOrdersSlice';
import setConstructorItems from './slices/constructorSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  order: orderReducer,
  feeds: feedsReducer,
  orders: ordersReducer,
  burgerConstructor: setConstructorItems
});

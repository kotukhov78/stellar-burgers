import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '../../utils/types';
import { getFeedsApi, getOrderByNumberApi } from '../../utils/burger-api';
import { RootState } from '../store';

type TFeedsState = {
  ordersData: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
  // Добавляем поля для работы с отдельным заказом
  selectedOrder: TOrder | null;
  isSelectedOrderLoading: boolean;
  selectedOrderError: string | null;
};

const initialState: TFeedsState = {
  ordersData: [],
  total: 0,
  totalToday: 0,
  isLoading: true,
  error: null,
  // Инициализируем новые поля
  selectedOrder: null,
  isSelectedOrderLoading: false,
  selectedOrderError: null
};

// Thunk для получения ленты заказов
export const fetchFeeds = createAsyncThunk<TOrdersData>(
  'feeds/fetchFeeds',
  async () => {
    const feedsData = await getFeedsApi();
    return feedsData;
  }
);

// Thunk для получения заказа по номеру
export const fetchOrderByNumber = createAsyncThunk<TOrder, number>(
  'feeds/fetchOrderByNumber',
  async (number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
);

const feedsSlice = createSlice({
  name: 'feeds',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFeeds.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchFeeds.fulfilled, (state, action) => {
        state.isLoading = false;
        state.ordersData = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке ленты заказов';
      })

      .addCase(fetchOrderByNumber.pending, (state) => {
        state.isSelectedOrderLoading = true;
        state.selectedOrderError = null;
      })
      .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
        state.isSelectedOrderLoading = false;
        state.selectedOrder = action.payload;
      })
      .addCase(fetchOrderByNumber.rejected, (state, action) => {
        state.isSelectedOrderLoading = false;
        state.selectedOrderError =
          action.error.message || 'Ошибка при загрузке заказа';
      });
  }
});

export default feedsSlice.reducer;

// Селекторы
export const selectFeeds = (state: RootState) => state.feeds.ordersData;
export const selectTotalOrders = (state: RootState) => state.feeds.total;
export const selectTotalToday = (state: RootState) => state.feeds.totalToday;
export const selectFeedsLoading = (state: RootState) => state.feeds.isLoading;
export const selectFeedsError = (state: RootState) => state.feeds.error;

// селекторы для работы с отдельным заказом
export const selectSelectedOrder = (state: RootState) =>
  state.feeds.selectedOrder;
export const selectSelectedOrderLoading = (state: RootState) =>
  state.feeds.isSelectedOrderLoading;
export const selectSelectedOrderError = (state: RootState) =>
  state.feeds.selectedOrderError;

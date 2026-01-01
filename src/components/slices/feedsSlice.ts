import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getFeedsApi } from '../../utils/burger-api';
import { RootState } from 'src/services/store';

type TFeedsState = {
  feeds: TOrder[];
  total: number;
  totalToday: number;
  isLoading: boolean;
  error: string | null;
  modalOrder: TOrder | null;
};

const initialState: TFeedsState = {
  feeds: [],
  total: 0,
  totalToday: 0,
  isLoading: false,
  error: null,
  modalOrder: null
};

// Thunk для получения ленты заказов

// export const fetchFeeds = createAsyncThunk<
//   { feeds: TOrder[]; total: number; totalToday: number },
//   void,
//   { dispatch: AppDispatch; state: RootState; rejectValue: string }
// >('orders/fetchFeeds', async (_, thunkAPI) => {
//   try {
//     const response = await getFeedsApi();
//     return {
//       feeds: response.orders || [],
//       total: response.total || 0,
//       totalToday: response.totalToday || 0
//     };
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.message || 'Ошибка получения ленты заказов'
//     );
//   }
// });
export const fetchFeeds = createAsyncThunk(
  'feeds/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const { orders, total, totalToday } = await getFeedsApi();
      return { orders, total, totalToday };
    } catch (e: any) {
      return rejectWithValue(e.message || 'Ошибка загрузки ленты');
    }
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
        state.feeds = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      })
      .addCase(fetchFeeds.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export default feedsSlice.reducer;

// Селекторы
export const selectFeeds = (state: RootState) => state.feeds.feeds;
export const selectFeedsLoading = (state: RootState) => state.feeds.isLoading;
export const selectFeedsError = (state: RootState) => state.feeds.error;
export const selectTotalOrders = (state: RootState) => state.feeds.total;
export const selectTotalToday = (state: RootState) => state.feeds.totalToday;

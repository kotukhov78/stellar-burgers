import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';
import { RootState } from '../../services/store';

type TOrdersState = {
  orders: TOrder[];
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrdersState = {
  orders: [],
  isLoading: false,
  error: null
};

export const fetchProfileOrders = createAsyncThunk(
  'profileOrders/fetchProfileOrders',
  async (_, { rejectWithValue }) => {
    try {
      return await getOrdersApi();
    } catch (e: any) {
      return rejectWithValue(e.message || 'Ошибка загрузки заказов');
    }
  }
);

const profileOrdersSlice = createSlice({
  name: 'profileOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchProfileOrders.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        fetchProfileOrders.fulfilled,
        (state, action: PayloadAction<TOrder[]>) => {
          state.isLoading = false;
          state.orders = action.payload;
        }
      )
      .addCase(fetchProfileOrders.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      })
});

export default profileOrdersSlice.reducer;

// Селекторы
export const selectProfileOrders = (state: RootState) => state.orders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.orders.isLoading;
export const selectProfileOrdersError = (state: RootState) =>
  state.orders.error;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { orderBurgerApi } from '../../utils/burger-api';
import { RootState } from '../../services/store';

type TOrderState = {
  orderData: TOrder | null;
  orderNumber: number | null;
  isLoading: boolean;
  error: string | null;
};

const initialState: TOrderState = {
  orderData: null,
  orderNumber: null,
  isLoading: false,
  error: null
};

export const createOrder = createAsyncThunk(
  'order/createOrder',
  async (ingredientIds: string[], { rejectWithValue }) => {
    try {
      const data = await orderBurgerApi(ingredientIds);
      return data.order;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.orderData = null;
      state.orderNumber = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.isLoading = false;
        state.orderData = action.payload;
        state.orderNumber = action.payload.number;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  }
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;

// Селекторы
export const selectCurrentOrder = (state: { order: TOrderState }) =>
  state.order.orderData;
export const selectOrderNumber = (state: { order: TOrderState }) =>
  state.order.orderNumber;
export const selectOrderLoading = (state: { order: TOrderState }) =>
  state.order.isLoading;
export const selectOrderError = (state: { order: TOrderState }) =>
  state.order.error;

// export const selectOrdersInfoData =
//   (number: string) => (state: RootState) => {
//     if (state.order.feeds)
//   };

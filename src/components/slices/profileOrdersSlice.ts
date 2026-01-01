import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrderByNumberApi, getOrdersApi } from '../../utils/burger-api';
import { AppDispatch, RootState } from 'src/services/store';
import { selectCurrentOrder } from './orderSlice';

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

// Thunk для получения истории заказов пользователя (HTTP)
// export const fetchProfileOrders = createAsyncThunk<
//   TOrder[],
//   void,
//   { dispatch: AppDispatch; state: RootState; rejectValue: string }
// >('orders/fetchProfileOrders', async (_, thunkAPI) => {
//   try {
//     const orders = await getOrdersApi();
//     return orders;
//   } catch (error: any) {
//     return thunkAPI.rejectWithValue(
//       error.message || 'Ошибка получения истории заказов'
//     );
//   }
// });

// export const fetchOrderByNumber = createAsyncThunk(
//   'orders/fetchPByNumber',
//   async (orderNumber: string) => {
//     try {
//       const response = await getOrderByNumberApi(Number(orderNumber));
//       const order = response.orders[0];
//       return order;
//     } catch (error: any) {
//       throw new Error(error.message || 'Ошибка загрузки заказа по номеру');
//     }
//   }
// );

// const profileOrdersSlice = createSlice({
//   name: 'orders',
//   initialState,
//   reducers: {
//     setSelectedOrder: (state, action: PayloadAction<TOrder | null>) => {
//       state.selectedOrder = action.payload;
//     },
//     clearError: (state) => {
//       state.error = null;
//     }
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchProfileOrders.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchProfileOrders.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.orders = action.payload;
//       })
//       .addCase(fetchProfileOrders.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Ошибка при загрузке заказов';
//       })
//       .addCase(fetchOrderByNumber.pending, (state) => {
//         state.isLoading = true;
//         state.error = null;
//       })
//       .addCase(fetchOrderByNumber.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.selectedOrder = action.payload;
//       })
//       .addCase(fetchOrderByNumber.rejected, (state, action) => {
//         state.isLoading = false;
//         state.error = action.error.message || 'Ошибка при загрузке заказов';
//       });
//   }
// });

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

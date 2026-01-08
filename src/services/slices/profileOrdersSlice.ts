import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';
import { getOrdersApi } from '../../utils/burger-api';
import { RootState } from '../store';

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

// Тип для ошибки
type ThunkApiError = {
  message?: string;
};

export const fetchProfileOrders = createAsyncThunk<
  TOrder[], // Тип возвращаемого значения
  void, // Тип аргумента (пусто, так как используем _)
  {
    rejectValue: string; // Тип значения при rejectWithValue
  }
>('profileOrders/fetchProfileOrders', async (_, { rejectWithValue }) => {
  try {
    return await getOrdersApi();
  } catch (e: unknown) {
    let errorMessage = 'Ошибка загрузки заказов';

    if (e instanceof Error) {
      errorMessage = e.message;
    } else if (typeof e === 'object' && e !== null && 'message' in e) {
      const error = e as ThunkApiError;
      errorMessage = error.message || errorMessage;
    }

    return rejectWithValue(errorMessage);
  }
});

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
        state.error = action.payload ?? 'Неизвестная ошибка';
      })
});

export default profileOrdersSlice.reducer;

// Селекторы
export const selectProfileOrders = (state: RootState) => state.orders.orders;
export const selectProfileOrdersLoading = (state: RootState) =>
  state.orders.isLoading;
export const selectProfileOrdersError = (state: RootState) =>
  state.orders.error;

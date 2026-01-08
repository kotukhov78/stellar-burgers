import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
import { getIngredientsApi } from '../../utils/burger-api';
import { RootState } from '../store';

type TIngredientsState = {
  ingredients: TIngredient[];
  isLoading: boolean;
  error: string | null;
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
};

const initialState: TIngredientsState = {
  ingredients: [],
  isLoading: false,
  error: null,
  buns: [],
  mains: [],
  sauces: []
};

// Определяем тип для ошибки
interface IApiError {
  message: string;
}

// Асинхронная Thunk-функция
export const getIngredients = createAsyncThunk<
  TIngredient[], // Тип возвращаемого значения при успехе
  void, // Тип аргументов (ничего)
  {
    rejectValue: string; // Тип значения при rejectWithValue
  }
>('ingredients/getIngredients', async (_, { rejectWithValue }) => {
  try {
    return await getIngredientsApi();
  } catch (e: unknown) {
    // Более безопасная обработка ошибок
    if (e instanceof Error) {
      return rejectWithValue(e.message);
    }
    // Обработка случаев, когда ошибка не является экземпляром Error
    const error = e as IApiError;
    return rejectWithValue(error.message || 'Неизвестная ошибка');
  }
});

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        getIngredients.fulfilled,
        (state, action: PayloadAction<TIngredient[]>) => {
          state.isLoading = false;
          state.ingredients = action.payload;
          state.error = null;
        }
      )
      .addCase(getIngredients.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Ошибка при загрузке ингредиентов';
      });
  }
});

export default ingredientsSlice.reducer;

// Селекторы
export const selectIngredients = (state: RootState) =>
  state.ingredients.ingredients;
export const selectIngredientsLoading = (state: RootState) =>
  state.ingredients.isLoading;
export const selectIngredientsError = (state: RootState) =>
  state.ingredients.error;

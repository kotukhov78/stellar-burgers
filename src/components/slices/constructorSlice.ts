import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';
// import { getIngredientsApi } from '../../utils/burger-api';
import { RootState } from '../../services/store';

type TConstructorState = {
  constructorItems: TIngredient[];
  orderRequest: boolean;
  orderModalData: string | null;
  error: string | null;
  isLoading: boolean;
};

export const initialState: TConstructorState = {
  constructorItems: [],
  orderRequest: false,
  orderModalData: null,
  error: null,
  isLoading: false
};

// Асинхронная Thunk-функция
// export const getIngredients = createAsyncThunk(
//   'burgerConstructor/getIngredients',
//   async () => {
//     const ingredients = await getIngredientsApi();
//     return ingredients;
//   }
// );

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    setConstructorItems: (state, action: PayloadAction<TIngredient[]>) => {
      state.constructorItems = action.payload;
    }
  }
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getIngredients.pending, (state) => {
  //       state.isLoading = true;
  //       state.error = null;
  //     })
  //     .addCase(getIngredients.fulfilled, (state, action) => {
  //       state.isLoading = false;
  //       state.constructorItems = action.payload;
  //       state.error = null;
  //     })
  //     .addCase(getIngredients.rejected, (state, action) => {
  //       state.isLoading = false;
  //       state.error =
  //         action.error.message || 'Ошибка при загрузке ингредиентов';
  //     });
  // }
});

export default burgerConstructorSlice.reducer;

// Селекторы
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor.constructorItems;
// export const selectConstructorLoading = (state: RootState) =>
//   state.burgerConstructor.isLoading;
// export const selectConstructorError = (state: RootState) =>
//   state.burgerConstructor.error;

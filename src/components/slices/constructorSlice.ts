import { createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { RootState } from '../../services/store';

type TConstructorState = {
  bun: TIngredient | null;
  ingredients: TConstructorIngredient[];
};

export const initialState: TConstructorState = {
  bun: null,
  ingredients: []
};

const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient(state, action) {
      if (action.payload.type === 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push(action.payload);
      }
    },
    removeIngredient(state, action) {
      state.ingredients.splice(action.payload, 1);
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
export const { removeIngredient, addIngredient } =
  burgerConstructorSlice.actions;

// Селекторы
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

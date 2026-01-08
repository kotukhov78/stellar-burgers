import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { RootState } from '../store';
import { v4 as uuid } from 'uuid';

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
    addIngredient: {
      reducer: (state, { payload }: PayloadAction<TConstructorIngredient>) => {
        if (payload.type === 'bun') {
          state.bun = payload;
        } else {
          state.ingredients.push(payload);
        }
      },
      prepare: (ingredient: TIngredient) => ({
        payload: { ...ingredient, id: uuid() }
      })
    },
    removeIngredient(state, action) {
      state.ingredients.splice(action.payload, 1);
    },
    moveIngredientUp: (state, action) => {
      const index = action.payload;
      if (index > 0 && index < state.ingredients.length) {
        // Меняем местами текущий элемент с предыдущим
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index - 1];
        state.ingredients[index - 1] = temp;
      }
    },
    moveIngredientDown: (state, action) => {
      const index = action.payload;
      if (index >= 0 && index < state.ingredients.length - 1) {
        // Меняем местами текущий элемент со следующим
        const temp = state.ingredients[index];
        state.ingredients[index] = state.ingredients[index + 1];
        state.ingredients[index + 1] = temp;
      }
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export default burgerConstructorSlice.reducer;
export const {
  removeIngredient,
  addIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor
} = burgerConstructorSlice.actions;

// Селекторы
export const selectConstructorItems = (state: RootState) =>
  state.burgerConstructor;

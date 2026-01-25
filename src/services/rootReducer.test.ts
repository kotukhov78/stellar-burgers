import { rootReducer } from './rootReducer';
import { TIngredient } from '../utils/types';

describe('rootReducer', () => {
  it('должен инициализировать начальное состояние всех слайсов', () => {
    const state = rootReducer(undefined, { type: '@@INIT' });

    expect(state.ingredients).toEqual({
      ingredients: [],
      isLoading: false,
      error: null,
      buns: [],
      mains: [],
      sauces: []
    });

    expect(state.burgerConstructor).toEqual({
      bun: null,
      ingredients: []
    });

    expect(state.order).toEqual({
      isLoading: true,
      error: null,
      orderRequest: false,
      orderModalData: null
    });

    expect(state.feeds).toEqual({
      ordersData: [],
      total: 0,
      totalToday: 0,
      isLoading: true,
      error: null,
      selectedOrder: null,
      isSelectedOrderLoading: false,
      selectedOrderError: null
    });

    expect(state.orders).toEqual({
      orders: [],
      isLoading: false,
      error: null
    });

    expect(state.user).toEqual({
      user: null,
      isAuthChecked: false,
      isLoading: false,
      error: undefined
    });
  });
});

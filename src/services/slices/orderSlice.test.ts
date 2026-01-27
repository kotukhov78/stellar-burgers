import orderReducer, { createOrder, clearOrder } from './orderSlice';
import { TOrder } from '../../utils/types';

const mockOrder: TOrder = {
  _id: '1',
  status: 'done',
  name: 'Бургер',
  createdAt: '2023-01-01T00:00:00.000Z',
  updatedAt: '2023-01-01T00:00:00.000Z',
  number: 12345,
  ingredients: ['1', '2']
};

const initialState = {
  isLoading: true,
  error: null,
  orderRequest: false,
  orderModalData: null
};

describe('orderSlice', () => {
  test('должен обрабатывать pending состояние createOrder', () => {
    const action = { type: createOrder.pending.type };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(true);
    expect(state.orderRequest).toBe(true);
  });

  test('должен обрабатывать fulfilled состояние createOrder', () => {
    const action = { type: createOrder.fulfilled.type, payload: mockOrder };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.orderRequest).toBe(false);
    expect(state.orderModalData).toEqual(mockOrder);
  });

  test('должен обрабатывать rejected состояние createOrder', () => {
    const action = {
      type: createOrder.rejected.type,
      error: { message: 'Ошибка заказа' }
    };
    const state = orderReducer(initialState, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка заказа');
  });

  test('должен обрабатывать экшен clearOrder', () => {
    const stateWithOrder = {
      ...initialState,
      orderModalData: mockOrder
    };
    expect(stateWithOrder.orderModalData).toBe(mockOrder);

    const action = clearOrder();
    const state = orderReducer(stateWithOrder, action);

    expect(state.orderModalData).toBe(null);
  });
});

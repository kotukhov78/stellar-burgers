import profileOrdersReducer, {
  fetchProfileOrders,
  TOrdersState
} from './profileOrdersSlice';
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

const mockOrdersData: TOrdersState = {
  orders: [mockOrder],
  isLoading: false,
  error: null
};

describe('profileOrders', () => {
  test('должен обрабатывать pending состояние fetchProfileOrders', () => {
    const action = { type: fetchProfileOrders.pending.type };
    const state = profileOrdersReducer(undefined, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен обрабатывать fulfilled состояние fetchProfileOrders', () => {
    const action = {
      type: fetchProfileOrders.fulfilled.type,
      payload: [mockOrder]
    };
    const state = profileOrdersReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.orders).toEqual([mockOrder]);
    expect(state.error).toBe(null);
  });

  test('должен обрабатывать rejected состояние fetchProfileOrders', () => {
    const action = {
      type: fetchProfileOrders.rejected.type,
      payload: 'Ошибка загрузки заказов'
    };
    const state = profileOrdersReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка загрузки заказов');
  });
});

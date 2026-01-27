import feedsReducer, { fetchFeeds, fetchOrderByNumber } from './feedsSlice';
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

const mockFeedsData = {
  orders: [mockOrder],
  total: 100,
  totalToday: 10,
  isLoading: true,
  error: null,
  selectedOrder: null,
  isSelectedOrderLoading: false,
  selectedOrderError: null
};

describe('feedsSlice', () => {
  test('должен обрабатывать pending состояние fetchFeeds', () => {
    const action = { type: fetchFeeds.pending.type };
    const state = feedsReducer(undefined, action);

    expect(state.isLoading).toBe(true);
    expect(state.error).toBe(null);
  });

  test('должен обрабатывать fulfilled состояние fetchFeeds', () => {
    const action = { type: fetchFeeds.fulfilled.type, payload: mockFeedsData };
    const state = feedsReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.ordersData).toEqual(mockFeedsData.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(10);
  });

  test('должен обрабатывать rejected состояние fetchFeeds', () => {
    const action = {
      type: fetchFeeds.rejected.type,
      error: { message: 'Ошибка при загрузке ленты заказов' }
    };
    const state = feedsReducer(undefined, action);

    expect(state.isLoading).toBe(false);
    expect(state.error).toBe('Ошибка при загрузке ленты заказов');
  });

  test('должен обрабатывать pending состояние fetchOrderByNumber', () => {
    const action = { type: fetchOrderByNumber.pending.type };
    const state = feedsReducer(undefined, action);

    expect(state.isSelectedOrderLoading).toBe(true);
    expect(state.selectedOrderError).toBe(null);
  });

  test('должен обрабатывать fulfilled состояние fetchOrderByNumber', () => {
    const action = {
      type: fetchOrderByNumber.fulfilled.type,
      payload: mockOrder
    };
    const state = feedsReducer(undefined, action);

    expect(state.isSelectedOrderLoading).toBe(false);
    expect(state.selectedOrder).toEqual(mockOrder);
  });

  test('должен обрабатывать rejected состояние fetchOrderByNumber', () => {
    const action = {
      type: fetchOrderByNumber.rejected.type,
      error: { message: 'Ошибка при загрузке заказа' }
    };
    const state = feedsReducer(undefined, action);

    expect(state.isSelectedOrderLoading).toBe(false);
    expect(state.selectedOrderError).toBe('Ошибка при загрузке заказа');
  });
});

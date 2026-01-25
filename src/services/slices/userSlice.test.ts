import userReducer, {
  initialState,
  checkUserAuth,
  login,
  logout,
  register,
  updateUser
} from './userSlice';

describe('userSlice', () => {
  const mockUser = {
    email: 'test@example.com',
    name: 'Test User'
  };

  test('должен возвращать состояние', () => {
    expect(userReducer(undefined, { type: '' })).toEqual(initialState);
  });

  test('должен выполнять checkUserAuth.pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      isLoading: true,
      isAuthChecked: false
    });
  });

  test('должен выполнять checkUserAuth.fulfilled', () => {
    const action = {
      type: checkUserAuth.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state).toEqual({
      ...initialState,
      user: mockUser,
      isLoading: false,
      isAuthChecked: true,
      error: undefined
    });
  });

  test('должен выполнять register.fulfilled', () => {
    const action = {
      type: register.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });

  test('должен выполнять login.fulfilled', () => {
    const action = {
      type: login.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toBe(true);
    expect(state.isLoading).toBe(false);
  });

  test('должен выполнять updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: mockUser
    };
    const state = userReducer(initialState, action);

    expect(state.user).toEqual(mockUser);
    expect(state.isLoading).toBe(false);
    expect(state.error).toBe(undefined);
  });

  test('должен выполнять logout.fulfilled', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser,
      isAuthChecked: true
    };

    const action = { type: logout.fulfilled.type };
    const state = userReducer(loggedInState, action);

    expect(state.user).toBeNull();
    expect(state.isAuthChecked).toBe(false);
  });
});

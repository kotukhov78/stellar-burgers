import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TUser } from '../../utils/types';
import {
  getUserApi,
  updateUserApi,
  logoutApi,
  TLoginData,
  loginUserApi,
  TRegisterData,
  registerUserApi
} from '../../utils/burger-api';
import { RootState } from '../store';
import { deleteCookie, setCookie } from '../../utils/cookie';

type TUserState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isLoading: boolean;
  error: string | undefined;
};

export const initialState: TUserState = {
  user: null,
  isAuthChecked: false,
  isLoading: false,
  error: undefined
};

// Определяем типы для ответов от API
type TAuthResponse = {
  user: TUser;
  accessToken: string;
  refreshToken: string;
};

type TUpdateUserResponse = {
  user: TUser;
};

type TErrorResponse = {
  message: string;
};

export const checkUserAuth = createAsyncThunk<
  TUser, // Тип возвращаемого значения при успехе
  void, // Тип аргумента
  {
    rejectValue: string; // Тип возвращаемого значения при ошибке
  }
>('user/checkUserAuth', async (_, { rejectWithValue }) => {
  try {
    const response = await getUserApi();
    return response.user;
  } catch (error) {
    const errorMessage =
      error instanceof Error
        ? error.message
        : 'Ошибка получения пользователя с сервера';
    return rejectWithValue(errorMessage);
  }
});

export const updateUser = createAsyncThunk<
  TUser,
  { name?: string; email?: string; password?: string }
>(
  'user/updateUser',
  async (userData: { name?: string; email?: string; password?: string }) => {
    const response: TUpdateUserResponse = await updateUserApi(userData);
    return response.user;
  }
);

export const login = createAsyncThunk<
  TUser,
  TLoginData,
  {
    rejectValue: string;
  }
>('user/login', async (data: TLoginData, { rejectWithValue }) => {
  try {
    const res: TAuthResponse = await loginUserApi(data);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Ошибка входа по логину';
    return rejectWithValue(errorMessage);
  }
});

export const register = createAsyncThunk<
  TUser,
  TRegisterData,
  {
    rejectValue: string;
  }
>('user/register', async (data: TRegisterData, { rejectWithValue }) => {
  try {
    const res: TAuthResponse = await registerUserApi(data);

    localStorage.setItem('refreshToken', res.refreshToken);
    setCookie('accessToken', res.accessToken);

    return res.user;
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : 'Ошибка при регистрации';
    return rejectWithValue(errorMessage);
  }
});

export const logout = createAsyncThunk('user/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  deleteCookie('accessToken');
});

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkUserAuth.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(checkUserAuth.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error =
          action.error.message ?? 'Ошибка получения пользователя с сервера';
      })

      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.error = undefined;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка обновления пользователя';
      })

      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.isAuthChecked = false;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = action.error.message ?? 'Ошибка входа по логину';
      })

      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
        state.error = undefined;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthChecked = false;
        state.error = action.error.message ?? 'Ошибка при регистрации';
      })

      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.isLoading = false;
        state.user = null;
        state.isAuthChecked = false;
        state.error = undefined;
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Ошибка выхода';
      });
  }
});

// export const { setAuthChecked } = userSlice.actions;
export default userSlice.reducer;

// Селекторы
export const selectUser = (state: RootState) => state.user.user;
export const selectIsAuthChecked = (state: RootState) =>
  state.user.isAuthChecked;
export const selectUserLoading = (state: RootState) => state.user.isLoading;
export const selectUserError = (state: RootState) => state.user.error;

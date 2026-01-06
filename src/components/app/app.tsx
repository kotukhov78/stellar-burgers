import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  useMatch
} from 'react-router-dom';

import { FC, useEffect } from 'react';

import { ProtectedRouter } from '../protected-router/protectedRouter';
import { getIngredients } from '../slices/ingredientsSlice';
import { useDispatch } from '../../services/store';
import { getCookie } from '../../utils/cookie';
import { checkUserAuth } from '../slices/userSlice';

const App = () => (
  <div className={styles.app}>
    <AppHeader />
    <AppRouter />
  </div>
);

export default App;

const AppRouter: FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleModalClose = () => navigate(-1);

  // для того, чтобы остался открытый попап, а не открылась страница
  const locationState = location.state as { background?: Location };
  const background = locationState && locationState.background;

  // для отображение номера заказа в заголовке модального окна если оно открыто
  const profileMatch = useMatch('/profile/orders/:number')?.params.number;
  const feedMatch = useMatch('/feed/:number')?.params.number;
  const orderNumber = profileMatch || feedMatch;

  // при загрузке страницы грузим ингридиенты и проверяем пользователя
  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  return (
    <>
      <Routes location={background || location}>
        {/* Основные маршруты */}
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />

        {/* маршруты для перехода по прямой ссылке */}
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='/feed/:number' element={<OrderInfo />} />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRouter>
              <OrderInfo />
            </ProtectedRouter>
          }
        />

        <Route
          path='/login'
          element={
            <ProtectedRouter onlyUnAuth>
              <Login />
            </ProtectedRouter>
          }
        />
        <Route
          path='/register'
          element={
            <ProtectedRouter onlyUnAuth>
              <Register />
            </ProtectedRouter>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <ProtectedRouter>
              <ForgotPassword />
            </ProtectedRouter>
          }
        />
        <Route
          path='/reset-password'
          element={
            <ProtectedRouter>
              <ResetPassword />
            </ProtectedRouter>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRouter>
              <Profile />
            </ProtectedRouter>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRouter>
              <ProfileOrders />
            </ProtectedRouter>
          }
        />
        {/* 404 */}
        <Route path='*' element={<NotFound404 />} />
      </Routes>

      {background && (
        <Routes>
          <Route
            path='/feed/:number'
            element={
              <Modal
                title={orderNumber ? `#${orderNumber}` : 'Детали заказа'}
                onClose={handleModalClose}
              >
                <OrderInfo />
              </Modal>
            }
          />
          <Route
            path='/ingredients/:id'
            element={
              <Modal title='Детали ингредиента' onClose={handleModalClose}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
            path='/profile/orders/:number'
            element={
              <ProtectedRouter>
                <Modal
                  title={orderNumber ? `#${orderNumber}` : 'Детали заказа'}
                  onClose={handleModalClose}
                >
                  <OrderInfo />
                </Modal>
              </ProtectedRouter>
            }
          />
        </Routes>
      )}
    </>
  );
};

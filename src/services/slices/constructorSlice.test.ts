import burgerConstructorReducer, {
  addIngredient,
  removeIngredient,
  moveIngredientUp,
  moveIngredientDown,
  clearConstructor,
  initialState
} from './constructorSlice';
import { TIngredient } from '../../utils/types';

describe('constructorSlice', () => {
  const mockBun: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const mockMain: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0941',
    name: 'Биокотлета из марсианской Магнолии',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  };

  test('должен вернуть состояние конструктора', () => {
    expect(burgerConstructorReducer(undefined, { type: '' })).toEqual(
      initialState
    );
  });

  test('должен добавить ингридиент для булок', () => {
    const action = addIngredient(mockBun);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.bun).toEqual({
      ...mockBun,
      id: expect.any(String)
    });
    expect(state.ingredients).toHaveLength(0);
  });

  test('должен добавить ингридиент для начинки', () => {
    const action = addIngredient(mockMain);
    const state = burgerConstructorReducer(initialState, action);

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(1);
    expect(state.ingredients[0]).toEqual({
      ...mockMain,
      id: expect.any(String)
    });
  });

  test('должен удалить ингридиент начинки', () => {
    const addAction = addIngredient(mockMain);
    let state = burgerConstructorReducer(initialState, addAction);

    const removeAction = removeIngredient(0);
    state = burgerConstructorReducer(state, removeAction);

    expect(state.ingredients).toHaveLength(0);
  });

  test('должен двигать ингридиент вверх по списку', () => {
    const mockSauce: TIngredient = {
      _id: '643d69a5c3f7b9001cfa0942',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png'
    };

    const addMainAction = addIngredient(mockMain);
    let state = burgerConstructorReducer(initialState, addMainAction);

    const addSauceAction = addIngredient(mockSauce);
    state = burgerConstructorReducer(state, addSauceAction);

    expect(state.ingredients[0]._id).toBe(mockMain._id);
    expect(state.ingredients[1]._id).toBe(mockSauce._id);

    const moveActionUp = moveIngredientUp(1);
    state = burgerConstructorReducer(state, moveActionUp);

    expect(state.ingredients[0]._id).toBe(mockSauce._id);
    expect(state.ingredients[1]._id).toBe(mockMain._id);

    const moveActionDown = moveIngredientDown(0);
    state = burgerConstructorReducer(state, moveActionDown);

    expect(state.ingredients[0]._id).toBe(mockMain._id);
    expect(state.ingredients[1]._id).toBe(mockSauce._id);
  });

  test('должен очищать конструктор', () => {
    const addBunAction = addIngredient(mockBun);
    const addMainAction = addIngredient(mockMain);

    let state = burgerConstructorReducer(initialState, addBunAction);
    state = burgerConstructorReducer(state, addMainAction);

    expect(state.bun).not.toBeNull();
    expect(state.ingredients).toHaveLength(1);

    state = burgerConstructorReducer(state, clearConstructor());

    expect(state.bun).toBeNull();
    expect(state.ingredients).toHaveLength(0);
  });
});

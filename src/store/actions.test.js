import {
  add,
  addNewElement,
  check,
  filter,
  getAllElements,
  remove,
  removeElement,
  search,
  setError,
  setRequestStatus
} from './actions';
import { SELECTOR_TYPES } from './selector';
import { ACTION_TYPES, REQUEST_STATUS } from './index';
import fetchMock from 'fetch-mock';
import { makeTestStore } from '../setupTests';

const title = 'абв123';

const data = [
  {
    id: '0',
    title: 'Помыть посуду',
    isChecked: false
  },
  {
    id: '1',
    title: 'Полить цветы',
    isChecked: false
  },
  {
    id: '2',
    title: 'Сходить в магазин',
    isChecked: false
  },
  {
    id: '3',
    title: 'Помыть полы',
    isChecked: false
  }
];

afterEach(() => fetchMock.reset());

test('Создатель экшна add создает новый экшн типа ADD и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.ADD,
    payload: title
  };
  expect(add(title)).toEqual(expectedAction);
});

test('Создатель экшна remove создает новый экшн типа REMOVE и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.REMOVE,
    payload: title
  };
  expect(remove(title)).toEqual(expectedAction);
});

test('Создатель экшна check создает новый экшн типа CHECK и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.CHECK,
    payload: title
  };
  expect(check(title)).toEqual(expectedAction);
});

test('Создатель экшна filter создает новый экшн типа FILTER и с payload равным тому, что ему было передано в параметре', () => {
  const selector = SELECTOR_TYPES.DONE;
  const expectedAction = {
    type: ACTION_TYPES.FILTER,
    payload: selector
  };
  expect(filter(selector)).toEqual(expectedAction);
});

test('Создатель экшна search создает новый экшн типа SEARCH и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.SEARCH,
    payload: title
  };
  expect(search(title)).toEqual(expectedAction);
});

test('Создатель экшна setRequestStatus создает новый экшн типа SET_REQUEST_STATUS и с payload равным тому, что ему было передано в параметре', () => {
  const requestStatus = REQUEST_STATUS.IDLE;
  const expectedAction = {
    type: ACTION_TYPES.SET_REQUEST_STATUS,
    payload: requestStatus
  };
  expect(setRequestStatus(requestStatus)).toEqual(expectedAction);
});

test('Создатель экшна setError создает новый экшн типа SET_ERROR и с payload равным тому, что ему было передано в параметре', () => {
  const error = 'ошибка';
  const expectedAction = {
    type: ACTION_TYPES.SET_ERROR,
    payload: error
  };
  expect(setError(error)).toEqual(expectedAction);
});

test('Тестируем асинхронный экшен AddNewElement', async () => {
  const element = {
    id: '123',
    title,
    isChecked: false
  };
  fetchMock.mock(
    'express:/todos',
    {
      status: 200,
      body: element
    },
    {
      method: 'POST'
    }
  );
  const store = makeTestStore({ useMockStore: true });
  await store.dispatch(addNewElement(title));
  expect(store.getActions()).toEqual([
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: ACTION_TYPES.ADD, payload: element },
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.SUCCESS }
  ]);
});

test('Тестируем асинхронный экшен getAllElements', async () => {
  fetchMock.mock(
    'express:/todos',
    {
      status: 200,
      body: data
    },
    {
      method: 'GET'
    }
  );
  const store = makeTestStore({ useMockStore: true });
  await store.dispatch(getAllElements());
  expect(store.getActions()).toEqual([
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: ACTION_TYPES.ADD_ALL, payload: data },
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.SUCCESS }
  ]);
});

test('Тестируем асинхронный экшн removeElement', async () => {
  const id = '1';
  fetchMock.mock(
    'express:/todos/:id',
    {
      status: 200,
      body: {}
    },
    {
      method: 'DELETE'
    }
  );
  const store = makeTestStore({ useMockStore: true });
  await store.dispatch(removeElement(id));
  expect(store.getActions()).toEqual([
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.LOADING },
    { type: ACTION_TYPES.REMOVE, payload: id },
    { type: ACTION_TYPES.SET_REQUEST_STATUS, payload: REQUEST_STATUS.SUCCESS }
  ]);
});

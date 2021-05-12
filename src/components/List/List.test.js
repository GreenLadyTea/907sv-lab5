import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import List from './List';
import { testRender } from '../../setupTests';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { ACTION_TYPES, initialState as originalInitialState, REQUEST_STATUS } from '../../store';

const list = [
  {
    id: 0,
    title: 'Помыть посуду',
    isChecked: false
  },
  {
    id: 1,
    title: 'Полить цветы',
    isChecked: false
  },
  {
    id: 2,
    title: 'Сходить в магазин',
    isChecked: false
  },
  {
    id: 3,
    title: 'Помыть полы',
    isChecked: false
  }
];
const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

const initialState = {
  ...originalInitialState,
  list: list
};

afterEach(() => fetchMock.reset());

test('Компонент выводит каждый элемент списка', () => {
  const store = mockStore(initialState);
  testRender(<List />, { store });
  const elements = screen.getAllByTestId('task');
  expect(elements).toHaveLength(list.length);
  for (let i = 0; i < list.length; i++) {
    expect(elements[i]).toHaveTextContent(list[i].title);
  }
});

test('Кнопка в каждом элементе нажимается, при этом вызывается store.dispatch с параметром id', () => {
  const store = mockStore(initialState);
  testRender(<List />, { store });
  const buttons = screen.getAllByTestId('delete-button');
  for (let i = 0; i < list.length; i++) {
    expect(buttons[i]).toBeInTheDocument();
    fireEvent.click(buttons[i]);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: REQUEST_STATUS.LOADING
    });
  }
});

test('При отображении пустого списка выводится надпись "Нет дел в списке"', () => {
  const emptyState = {
    ...originalInitialState,
    list: []
  };
  const store = mockStore(emptyState);
  testRender(<List />, { store });
  const element = screen.getByTestId('list');
  expect(element).toHaveTextContent('Нет дел в списке');
});

test('Чекбокс в каждом элементе прокликивается, при этом вызывается store.dispatch с параметром id', () => {
  const store = mockStore(initialState);
  testRender(<List />, { store });
  const checkboxes = screen.getAllByTestId('checkbox');
  for (let i = 0; i < list.length; i++) {
    expect(checkboxes[i]).toBeInTheDocument();
    fireEvent.click(checkboxes[i]);
    expect(store.getActions()[0]).toEqual({
      type: ACTION_TYPES.SET_REQUEST_STATUS,
      payload: REQUEST_STATUS.LOADING
    });
  }
});

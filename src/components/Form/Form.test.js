import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Form from './Form';
import { makeTestStore, testRender } from '../../setupTests';
import { ACTION_TYPES, initialState as originalInitialState, REQUEST_STATUS } from '../../store';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

afterEach(() => fetchMock.reset());

const initialState = {
  ...originalInitialState,
  list: [
    {
      id: '0',
      title: 'Вымыть пол',
      isChecked: false
    }
  ]
};

const store = makeTestStore({ initialState });

test('Отображается поле для ввода и кнопка "Добавить"', () => {
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const button = screen.getByTestId('button');
  expect(input).toBeInTheDocument();
  expect(button).toBeInTheDocument();
});

test('Можно ввести что-то в поле для ввода и при нажатии вызывается store.dispatch с параметром, равным тому, что ввели в поле для ввода', () => {
  const store = mockStore(initialState);
  const field = 'Some text';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: field } });
  fireEvent.submit(form);
  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATUS,
    payload: REQUEST_STATUS.LOADING
  });
});

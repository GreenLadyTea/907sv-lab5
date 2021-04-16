import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import Form from './Form';
import { makeTestStore, testRender } from '../../setupTests';
import { setRequestStatus } from '../../store/actions';
import { initialState as originalInitialState, REQUEST_STATUS } from '../../store';

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
  const field = 'Some text';
  testRender(<Form />, { store });
  const input = screen.getByTestId('input');
  const form = screen.getByTestId('form');
  fireEvent.input(input, { target: { value: field } });
  expect(store.dispatch).not.toBeCalled();
  fireEvent.submit(form);
  expect(store.dispatch).toBeCalledWith(setRequestStatus(REQUEST_STATUS.LOADING));
});

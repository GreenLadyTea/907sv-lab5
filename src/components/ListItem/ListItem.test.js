import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import ListItem from './ListItem';
import { makeTestStore, testRender } from '../../setupTests';
import { SELECTOR_TYPES } from '../../store/selector';
import { ACTION_TYPES, REQUEST_STATUS } from '../../store';
import thunkMiddleware from 'redux-thunk';
import configureStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

const store = makeTestStore();
const middlewares = [thunkMiddleware];
const mockStore = configureStore(middlewares);

afterEach(() => fetchMock.reset());

const task = 'Принять таблетки';
const id = '1';
const checked = false;

const initialState = {
  list: [
    {
      id: id,
      title: task,
      isChecked: checked
    }
  ],
  filtered: SELECTOR_TYPES.ALL,
  searchBar: '',
  requestStatus: REQUEST_STATUS.IDLE,
  error: ''
};

test('Отображает на экране то, что передали в пропсе title', () => {
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const element = screen.getByTestId('task');
  expect(element).toBeInTheDocument();
  expect(element).toHaveTextContent(task);
  screen.getByText(content => content.startsWith('таблетки', 8));
});

test('При нажатии на кнопку должен вызываться SET_REQUEST_STATUS', () => {
  const store = mockStore(initialState);
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const button = screen.getByTestId('delete-button');
  expect(button).toBeInTheDocument();
  fireEvent.click(button);
  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.SET_REQUEST_STATUS,
    payload: REQUEST_STATUS.LOADING
  });
});

test('Должен показывать на экране чекбокс, состояние которого зависит от переданного пропса checked', () => {
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).toBeVisible();
  expect(checkbox.checked).toEqual(checked);
});

test('При клике на чекбокс вызывается экшн CHECK', () => {
  const store = mockStore(initialState);
  testRender(<ListItem title={task} id={id} isChecked={checked} />, { store });
  const checkbox = screen.getByTestId('checkbox');
  expect(checkbox).toBeInTheDocument();
  fireEvent.click(checkbox);
  expect(store.getActions()[0]).toEqual({
    type: ACTION_TYPES.CHECK,
    payload: REQUEST_STATUS.LOADING
  });
});

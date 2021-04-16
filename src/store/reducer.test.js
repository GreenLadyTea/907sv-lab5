import { reducer } from './index';
import { SELECTOR_TYPES } from './selector';
import { ACTION_TYPES, initialState, REQUEST_STATUS } from './index';

let state;

beforeEach(() => {
  const array = [
    {
      id: '0',
      title: 'Вытереть пыль',
      isChecked: false
    },
    {
      id: '1',
      title: 'Полить цветы',
      isChecked: false
    },
    {
      id: '2',
      title: 'Помыть посуду',
      isChecked: true
    }
  ];

  state = {
    list: array,
    filtered: SELECTOR_TYPES.ALL,
    searchBar: '',
    requestStatus: REQUEST_STATUS.IDLE,
    error: ''
  };
});

test('При вызове редьюсера с экшеном add возвращается состояние стора, в котором добавлен новый элемент', () => {
  const item = {
    id: 'teg367373',
    title: 'field',
    isChecked: false
  };
  const add = {
    type: ACTION_TYPES.ADD,
    payload: item
  };
  const result = reducer(initialState, add);
  expect(result.list).toHaveLength(1);
  expect(result.list[0].title).toEqual(item.title);
});

test('При вызове редьюсера с экшеном remove возвращается состояние стора, в котором удалён указанный элемент', () => {
  const id = '1';
  const remove = {
    type: ACTION_TYPES.REMOVE,
    payload: id
  };
  const result = reducer(state, remove);
  expect(result.list.length).toEqual(2);
  for (let i = 0; i < result.list.length; i++) {
    expect(result.list[i].id).not.toBe(state.list[1].id);
    expect(result.list[i].title).not.toBe(state.list[1].title);
  }
});

test('При вызове редьюсера с экшеном check возвращается состояние стора, в котором состояние указанного элемента изменено', () => {
  const id = '0';
  const check = {
    type: ACTION_TYPES.CHECK,
    payload: id
  };
  const result = reducer(state, check);
  expect(result.list[0].isChecked).toEqual(true);
});

test('При вызове редьюсера с экшеном filter возвращается состояние стора, в котором состояние filtered изменено', () => {
  const filter = {
    type: ACTION_TYPES.FILTER,
    payload: SELECTOR_TYPES.DONE
  };
  const result = reducer(state, filter);
  expect(result.filtered).toEqual(SELECTOR_TYPES.DONE);
});

test('При вызове редьюсера с экшеном search возвращается состояние стора с переданной в SearchBar строкой', () => {
  const stringForSearch = 'По';
  const search = {
    type: ACTION_TYPES.SEARCH,
    payload: stringForSearch
  };
  const result = reducer(state, search);
  expect(result.searchBar).toEqual(stringForSearch);
});

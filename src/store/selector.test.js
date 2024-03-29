import { selectByChecked, selectBySearchBar, selectFilteredList, SELECTOR_TYPES } from './selector';
import { REQUEST_STATUS } from './index';

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

test('Функция фильтрации по строке поиска возвращает исходное состояние массива элементов, если поисковая строка пустая', () => {
  const result = selectBySearchBar(state);
  expect(result.list).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result.list[i]).toEqual(state.list[i]);
  }
});

test('Функция фильтрации по строке поиска возвращает массив элементов, которые в поле title содержат подстроку из searchbar', () => {
  state.searchBar = 'По';
  const result = selectBySearchBar(state);
  expect(result.list).toHaveLength(2);
  expect(result.list[0]).toEqual(state.list[1]);
  expect(result.list[1]).toEqual(state.list[2]);
});

test('Функция фильтрации по отметке в чекбоксах возвращает исходный список элементов, если тип фильтрации ALL', () => {
  const result = selectByChecked(state);
  expect(result.list).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result.list[i]).toEqual(state.list[i]);
  }
});

test('Функция фильтрации по отметке в чекбоксах возвращает список только отмеченных галочкой элементов, если тип фильтрации DONE', () => {
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectByChecked(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0]).toEqual(state.list[2]);
});

test('Функция фильтрации по отметке в чекбоксах возвращает список только неотмеченных галочкой элементов, если тип фильтрации NOT_DONE', () => {
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectByChecked(state);
  for (let i = 0; i < result.list.length; i++) {
    expect(result.list[i]).toEqual(state.list[i]);
  }
});

test('При вызове selectFilteredList с текущим стейтом возвращается неизмененный список элементов, т.к. filtered = ALL', () => {
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(3);
  for (let i = 0; i < state.list.length; i++) {
    expect(result.list[i]).toEqual(state.list[i]);
  }
});

test('При вызове selectFilteredList с текущим стейтом и filtered = DONE возвращается измененный список, в котором только чекнутые элементы', () => {
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0]).toEqual(state.list[2]);
});

test('При вызове selectFilteredList с текущим стейтом и filtered = NOT_DONE возвращается измененный список, в котором только нечекнутые элементы', () => {
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(2);
  expect(result.list[0]).toEqual(state.list[0]);
  expect(result.list[1]).toEqual(state.list[1]);
});

test('При вызове selectFilteredList c заданной строкой поиска возвращается список, в котором отображаются только содержащие её элементы', () => {
  state.searchBar = 'По';
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(2);
  expect(result.list[0]).toEqual(state.list[1]);
  expect(result.list[1]).toEqual(state.list[2]);
});

test('При вызове selectFilteredList и filtered = DONE c заданной строкой поиска возвращается список, в котором отображаются только содержащие её чекнутые элементы', () => {
  state.searchBar = 'По';
  state.filtered = SELECTOR_TYPES.DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0]).toEqual(state.list[2]);
});

test('При вызове selectFilteredList и filtered = NOT_DONE c заданной строкой поиска возвращается список, в котором отображаются только содержащие её нечекнутые элементы', () => {
  state.searchBar = 'По';
  state.filtered = SELECTOR_TYPES.NOT_DONE;
  const result = selectFilteredList(state);
  expect(result.list).toHaveLength(1);
  expect(result.list[0]).toEqual(state.list[1]);
});

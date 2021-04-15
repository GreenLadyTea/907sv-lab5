import { add, check, filter, remove, search } from './actions';
import { SELECTOR_TYPES } from './selector';
import { ACTION_TYPES } from './index';

const title = 'абв123';

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
  expect(filter(SELECTOR_TYPES.DONE)).toEqual(expectedAction);
});

test('Создатель экшна search создает новый экшн типа SEARCH и с payload равным тому, что ему было передано в параметре', () => {
  const expectedAction = {
    type: ACTION_TYPES.SEARCH,
    payload: title
  };
  expect(search(title)).toEqual(expectedAction);
});

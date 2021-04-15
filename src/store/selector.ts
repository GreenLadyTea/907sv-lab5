import { Store } from './index';

export enum SELECTOR_TYPES {
  ALL = 'Все',
  DONE = 'Выполненные',
  NOT_DONE = 'Невыполненные'
}

export type SELECTOR_TYPE =
  | typeof SELECTOR_TYPES.ALL
  | typeof SELECTOR_TYPES.DONE
  | typeof SELECTOR_TYPES.NOT_DONE;

export function selectByChecked(state: Store): Store {
  if (state.filtered === SELECTOR_TYPES.DONE) {
    return {
      ...state,
      list: [...state.list.filter(element => element.isChecked)]
    };
  }
  if (state.filtered === SELECTOR_TYPES.NOT_DONE) {
    return {
      ...state,
      list: [...state.list.filter(element => !element.isChecked)]
    };
  }
  return state;
}

export function selectBySearchBar(state: Store): Store {
  if (state.searchBar !== '') {
    return {
      ...state,
      list: [
        ...state.list.filter(
          element => element.title.toUpperCase().indexOf(state.searchBar.toUpperCase()) !== -1
        )
      ]
    };
  }
  return state;
}

export function selectFilteredList(state: Store): Store {
  return selectBySearchBar(selectByChecked(state));
}

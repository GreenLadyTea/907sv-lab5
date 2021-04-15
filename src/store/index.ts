import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';
import { SELECTOR_TYPE, SELECTOR_TYPES } from './selector';
import { reducer } from './reducer';

export enum ACTION_TYPES {
  ADD = 'add',
  ADD_ALL = 'add_all',
  REMOVE = 'remove',
  CHECK = 'check',
  FILTER = 'filter',
  SEARCH = 'search',
  SET_REQUEST_STATUS = 'setRequestStatus',
  SET_ERROR = 'setError'
}

export enum REQUEST_STATUS {
  IDLE,
  LOADING,
  SUCCESS,
  ERROR
}

export type REQUEST_STATUS_TYPE =
  | typeof REQUEST_STATUS.ERROR
  | typeof REQUEST_STATUS.IDLE
  | typeof REQUEST_STATUS.SUCCESS
  | typeof REQUEST_STATUS.LOADING;

export interface Item {
  id: string;
  title: string;
  isChecked: boolean;
}

export type Store = {
  list: Item[];
  filtered: SELECTOR_TYPE;
  searchBar: string;
  requestStatus: REQUEST_STATUS_TYPE;
  error: string;
};

export const initialState: Store = {
  list: [],
  filtered: SELECTOR_TYPES.ALL,
  searchBar: '',
  requestStatus: REQUEST_STATUS.IDLE,
  error: ''
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = typeof store.dispatch;
export default store;

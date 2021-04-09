import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware } from 'redux';

//const URL = 'http://localhost:3001';

export enum ACTION_TYPES {
  ADD = 'add',
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

type REQUEST_STATUS_TYPE = typeof REQUEST_STATUS.ERROR | typeof REQUEST_STATUS.IDLE | typeof REQUEST_STATUS.SUCCESS | typeof REQUEST_STATUS.LOADING;

export enum SELECTOR_TYPES {
  ALL = 'Все',
  DONE = 'Выполненные',
  NOT_DONE = 'Невыполненные'
}

export type SELECTOR_TYPE =
  | typeof SELECTOR_TYPES.ALL
  | typeof SELECTOR_TYPES.DONE
  | typeof SELECTOR_TYPES.NOT_DONE;

export interface ActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: string;
}

export interface ActionRemove {
  type: typeof ACTION_TYPES.REMOVE;
  payload: string;
}

export interface ActionCheck {
  type: typeof ACTION_TYPES.CHECK;
  payload: string;
}

export interface ActionFilter {
  type: typeof ACTION_TYPES.FILTER;
  payload: SELECTOR_TYPE;
}

export interface ActionSearch {
  type: typeof ACTION_TYPES.SEARCH;
  payload: string;
}

export interface ActionSetRequestStatus {
  type: typeof ACTION_TYPES.SET_REQUEST_STATUS;
  payload: REQUEST_STATUS_TYPE;
}

export interface ActionSetError {
  type: typeof ACTION_TYPES.SET_ERROR;
  payload: string;
}

export interface Item {
  id: string;
  title: string;
  isChecked: boolean;
}

export type Action =
  | ActionAdd
  | ActionRemove
  | ActionCheck
  | ActionFilter
  | ActionSearch
  | ActionSetRequestStatus
  | ActionSetError;

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

export const reducer = function (state = initialState, action: Action): Store {
  switch (action.type) {
    case ACTION_TYPES.REMOVE: {
      return { ...state, list: [...state.list.filter(Item => Item.id !== action.payload)] };
    }
    case ACTION_TYPES.ADD: {
      const newTask = {
        id: Math.random().toString(36).substr(2),
        title: action.payload,
        isChecked: false
      };
      return { ...state, list: [...state.list, newTask] };
    }
    case ACTION_TYPES.CHECK: {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === action.payload) {
          state.list[i].isChecked = !state.list[i].isChecked;
        }
      }
      return { ...state, list: [...state.list] };
    }
    case ACTION_TYPES.FILTER: {
      return { ...state, filtered: action.payload };
    }
    case ACTION_TYPES.SEARCH: {
      return { ...state, searchBar: action.payload };
    }
    case ACTION_TYPES.SET_REQUEST_STATUS: {
      return { ...state, requestStatus: action.payload };
    }
    case ACTION_TYPES.SET_ERROR: {
      return { ...state, error: action.payload };
    }
    default:
      return state;
  }
};

const store = createStore(reducer, applyMiddleware(thunkMiddleware));
export type AppDispatch = typeof store.dispatch;
export default store;

export const add = (content: string) => ({
  type: ACTION_TYPES.ADD,
  payload: content
});

export const remove = (content: string) => ({
  type: ACTION_TYPES.REMOVE,
  payload: content
});

export const check = (content: string) => ({
  type: ACTION_TYPES.CHECK,
  payload: content
});

export const filter = (content: SELECTOR_TYPE) => ({
  type: ACTION_TYPES.FILTER,
  payload: content
});

export const search = (content: string) => ({
  type: ACTION_TYPES.SEARCH,
  payload: content
});

export const setRequestStatus = (requestStatus: REQUEST_STATUS_TYPE): ActionSetRequestStatus => ({
  type: ACTION_TYPES.SET_REQUEST_STATUS,
  payload: requestStatus
});

const setError = (error: string): ActionSetError => ({
  type: ACTION_TYPES.SET_ERROR,
  payload: error
});

export const addNewElement = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
    const response = await fetch('http://localhost:3001/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: title
      })
    });
    const data = await response.json();
    if (!response.ok) {
      throw Error(response.statusText);
    }
    dispatch({ type: ACTION_TYPES.ADD, payload: data });
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
  }
};
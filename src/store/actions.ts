import { SELECTOR_TYPE } from './selector';
import { ACTION_TYPES, AppDispatch, Item, REQUEST_STATUS, REQUEST_STATUS_TYPE } from './index';

export interface ActionAdd {
  type: typeof ACTION_TYPES.ADD;
  payload: Item;
}

export interface ActionAddAll {
  type: typeof ACTION_TYPES.ADD_ALL;
  payload: Item[];
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

export type Action =
  | ActionAdd
  | ActionAddAll
  | ActionRemove
  | ActionCheck
  | ActionFilter
  | ActionSearch
  | ActionSetRequestStatus
  | ActionSetError;

export const add = (content: Item): ActionAdd => ({
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

const URL = 'http://localhost:3001';

export const addNewElement = (title: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
    const response = await fetch(`${URL}/todos`, {
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
      throw Error(data.error);
    }
    dispatch(add(data));
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
  }
};

export const getAllElements = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
    const response = await fetch(`${URL}/todos`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw Error(data.error);
    }
    dispatch({ type: ACTION_TYPES.ADD_ALL, payload: data });
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
  }
};

export const removeElement = (id: string) => async (dispatch: AppDispatch) => {
  try {
    dispatch(setRequestStatus(REQUEST_STATUS.LOADING));
    const response = await fetch(`${URL}/todos/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const data = await response.json();
    if (!response.ok) {
      throw Error(data.error);
    }
    dispatch({ type: ACTION_TYPES.REMOVE, payload: id });
    dispatch(setRequestStatus(REQUEST_STATUS.SUCCESS));
  } catch (error) {
    dispatch(setError(error.message));
    dispatch(setRequestStatus(REQUEST_STATUS.ERROR));
  }
};

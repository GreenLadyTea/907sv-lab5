import { Action } from './actions';
import { ACTION_TYPES, initialState, Store } from './index';

export const reducer = function (state = initialState, action: Action): Store {
  switch (action.type) {
    case ACTION_TYPES.REMOVE: {
      return {
        ...state,
        list: [...state.list.filter(Item => Item.id !== action.payload)]
      };
    }
    case ACTION_TYPES.ADD: {
      return { ...state, list: [...state.list, action.payload] };
    }
    case ACTION_TYPES.ADD_ALL: {
      return { ...state, list: [...action.payload] };
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

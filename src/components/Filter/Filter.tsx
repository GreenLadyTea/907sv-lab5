import React from 'react';
import { Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';
import { SELECTOR_TYPES } from '../../store/selector';
import { filter, search } from '../../store/actions';

export default function Filter() {
  const options = [SELECTOR_TYPES.ALL, SELECTOR_TYPES.DONE, SELECTOR_TYPES.NOT_DONE];
  const searchBar = useSelector((state: Store) => state.searchBar);
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <label>
          Фильтр:
          <input
            type="text"
            data-testid="search-bar"
            value={searchBar}
            onChange={e => dispatch(search(e.target.value))}
          />
        </label>
        {options.map(item => (
          <>
            <a key={item} onClick={() => dispatch(filter(item))}>
              {item}{' '}
            </a>
          </>
        ))}
      </div>
    </>
  );
}

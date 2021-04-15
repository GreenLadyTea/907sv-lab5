import React from 'react';
import './ListItem.css';
import { Item } from '../../store';
import { useDispatch } from 'react-redux';
import { check, removeElement } from '../../store/actions';

export default function ListItem(item: Item) {
  const dispatch = useDispatch();
  return (
    <>
      <div>
        <input
          type="checkbox"
          checked={item.isChecked}
          data-testid="checkbox"
          onChange={() => dispatch(check(item.id))}
        />
        <div className="task" data-testid="task">
          {item.title}
        </div>
        <button data-testid="delete-button" onClick={() => dispatch(removeElement(item.id))}>
          X
        </button>
      </div>
    </>
  );
}

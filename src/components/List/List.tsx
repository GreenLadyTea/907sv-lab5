import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListItem from '../ListItem/ListItem';
import { selectFilteredList } from '../../selector';
import { getAllElements } from '../../store';

export default function List() {
  const listState = useSelector(selectFilteredList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllElements());
  }, []);

  function renderList() {
    if (!listState.list.length) {
      return 'Нет дел в списке';
    }
    return (
      <>
        {listState.list.map(item => (
          <ListItem key={item.id} title={item.title} id={item.id} isChecked={item.isChecked} />
        ))}
      </>
    );
  }
  return (
    <>
      <div data-testid="list">{renderList()}</div>
    </>
  );
}

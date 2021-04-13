import React, { FormEvent, useEffect, useState } from 'react';
import './Form.css';
import { addNewElement, REQUEST_STATUS, setRequestStatus, Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const [field, setField] = useState('');
  const dispatch = useDispatch();
  const requestStatus = useSelector((state: Store) => state.requestStatus);

  useEffect(() => {
    if (requestStatus === REQUEST_STATUS.SUCCESS) {
      dispatch(setRequestStatus(REQUEST_STATUS.IDLE));
    }
  }, [requestStatus]);

  function handleSubmitInner(e: FormEvent) {
    e.preventDefault();
    dispatch(addNewElement(field));
    setField('');
  }

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmitInner}>
        <input data-testid="input" value={field} onChange={e => setField(e.target.value)} />
        <button data-testid="button" type="submit">
          Добавить
        </button>
      </form>
    </>
  );
}

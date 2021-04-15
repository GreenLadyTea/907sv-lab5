import React, { FormEvent, useEffect, useState } from 'react';
import './Form.css';
import { useDispatch, useSelector } from 'react-redux';
import { REQUEST_STATUS, Store } from '../../store';
import { addNewElement, setRequestStatus } from '../../store/actions';

export default function Form() {
  const [field, setField] = useState('');
  const dispatch = useDispatch();
  const requestStatus = useSelector((state: Store) => state.requestStatus);

  useEffect(() => {
    if (requestStatus === REQUEST_STATUS.SUCCESS) {
      dispatch(setRequestStatus(REQUEST_STATUS.IDLE));
      setField('');
    }
  }, [requestStatus]);

  function handleSubmitInner(e: FormEvent) {
    e.preventDefault();
    dispatch(addNewElement(field));
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

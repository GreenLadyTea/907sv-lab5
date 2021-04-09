import React, { FormEvent, useEffect, useState } from 'react';
import './Form.css';
import { addNewElement, REQUEST_STATUS, setRequestStatus, Store } from '../../store';
import { useDispatch, useSelector } from 'react-redux';

export default function Form() {
  const [field, setField] = useState('');
  const dispatch = useDispatch();
  const error = useSelector((state: Store) => state.error);
  const requestStatus = useSelector((state: Store) => state.requestStatus);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (requestStatus === REQUEST_STATUS.SUCCESS) {
      setIsSuccess(true);
      dispatch(setRequestStatus(REQUEST_STATUS.IDLE));
      setTimeout(() => setIsSuccess(false), 3000);
    }
  }, [requestStatus]);

  function handleSubmitInner(e: FormEvent) {
    e.preventDefault();
    dispatch(addNewElement(field));
  }

  return (
    <>
      <form data-testid="form" onSubmit={handleSubmitInner}>

        {requestStatus === REQUEST_STATUS.LOADING && <>Loading...</>}
        {isSuccess && <>Успешно</>}
        {requestStatus === REQUEST_STATUS.ERROR && <>{error}</>}

        <input data-testid="input" value={field} onChange={e => setField(e.target.value)} />
        <button data-testid="button" type="submit">
          Добавить
        </button>
      </form>
    </>
  );
}
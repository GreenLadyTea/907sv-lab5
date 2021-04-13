import { useSelector } from 'react-redux';
import { REQUEST_STATUS, Store } from '../../store';
import React from 'react';

export default function Alert() {
  const error = useSelector((state: Store) => state.error);
  const requestStatus = useSelector((state: Store) => state.requestStatus);

  return (
    <>
      <div>
        {requestStatus === REQUEST_STATUS.LOADING && <>Loading...</>}
        {requestStatus === REQUEST_STATUS.ERROR && <>{error}</>}
      </div>
    </>
  );
}

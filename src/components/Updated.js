import React from 'react';
import day from 'dayjs';
import { Toast } from 'react-bootstrap';

export default function Updated(props) {
  const { show, showUpdated } = props;
  return (
    <Toast show={show} onClose={() => showUpdated(false)}>
      <Toast.Header>
        <strong className="mr-auto">Last data update</strong>
        <small>Updated every minute</small>
      </Toast.Header>
      <Toast.Body>
        {`${day(new Date()).format('DD/MM/YYYY HH:mm:ss')}`}
      </Toast.Body>
    </Toast>
  );
}

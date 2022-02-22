/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import React from 'react';
import { Spinner } from 'react-bootstrap';

export default function Loading() {
  return (
    <div
      css={css`position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);`}
    >
      <div>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    </div>
  );
}

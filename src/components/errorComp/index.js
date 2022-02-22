/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import PropTypes from 'prop-types';
import React from 'react';
import Monkey from './download.png';

export default function ErrorComponent(props) {
  const { message } = props;
  return (
    <div css={css`position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);`}
    >
      <img src={Monkey} alt="monkey" />
      <h6 className="mt-2">
        Something went wrong,
        {' '}
        {message}
        {' '}
      </h6>
    </div>
  );
}

ErrorComponent.propTypes = {
  message: PropTypes.string.isRequired,
};

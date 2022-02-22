/** @jsxImportSource @emotion/react */
import React from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import { Link } from 'react-router-dom';

function SinglePosts({ data, clickHandler }) {
  return (
    <div
      className="shadow p-3 mb-5 bg-white rounded"
      css={css`display: flex;
    align-items: center;
    justify-content: space-between;
    `}
    >
      <div className="post-texts">
        <div className="post-title">
          <h5>{data.title}</h5>
        </div>
        <div className="post-body">
          <p className="lead">{data.body}</p>
        </div>
      </div>
      <div className="post-btn d-flex">
        <div className="me-2">

          <Link to={`/posts/${data.id}`} className="btn btn-warning">edit</Link>

        </div>
        <div>
          <button type="submit" className="btn btn-danger" onClick={() => clickHandler()}>delete</button>

        </div>
      </div>
    </div>
  );
}

SinglePosts.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  clickHandler: PropTypes.func.isRequired,
};

export default SinglePosts;

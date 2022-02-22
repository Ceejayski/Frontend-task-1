import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useDispatch, connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { ERROR_FETCHING } from '../../redux/types';
import { findPost } from '../../redux/utils';
import UserService from '../../services/user.services';
import ErrorComponent from '../errorComp';

const PostDetails = ({ posts, error }) => {
  const { id } = useParams();
  const [cur, setCurr] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length > 0) {
      setCurr(findPost(posts, parseInt(id, 10)));
    } else {
      UserService.getSinglePost(id).then((res) => setCurr(res),
        (errors) => {
          const message = (errors.response && errors.response.data && errors.response.data.message)
        || errors.message
        || errors.toString();
          dispatch({ type: ERROR_FETCHING, payload: message });
        });
    }
  }, [posts]);
  return (
    <>
      {error !== '' && (
      <>
        <ErrorComponent message={error} />
      </>
      )}
      {
        error === '' && cur && (
        <div className="text-center">
          <h1 className="my-4">
            {cur.title}
          </h1>
          <p className="lead w-50 mx-auto">
            {cur.body}
          </p>
        </div>
        )
      }

    </>
  );
};

PostDetails.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
  error: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { posts, loading, error } = state.posts_details;
  return {
    posts,
    loading,
    error,
  };
};

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(PostDetails);

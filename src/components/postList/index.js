import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getPostsAction, removePostAction } from '../../redux/actions/user.actions';
import ErrorComponent from '../errorComp';
import Loading from '../loading';
import SinglePosts from '../singlePosts';

const PostList = ({
  posts, loading, error, getPost, deletePost,
}) => {
  useEffect(() => {
    if (posts.length === 0) {
      getPost();
    }
  }, []);
  const [query, setQuery] = useState('');

  return (
    <>
      {loading && (
        <>
          <Loading />
        </>
      )}

      {error !== '' && (
      <>
        <ErrorComponent message={error} />
      </>
      )}

      {!loading && error === '' && (
        <>
          <div>
            <input
              type="text"
              placeholder="Search for your post here"
              className="form-control mb-5"
              onChange={(event) => {
                setQuery(event.target.value);
              }}
            />
          </div>
          <div className="header pb-3 mb-2 d-flex border-bottom justify-content-between align-items-center ">
            <h3>All Posts</h3>
            <div>
              <Link to="/posts/new" className="btn btn-primary ">Add new post </Link>
            </div>
          </div>
          <div className="post-list">
            {posts.filter((post) => {
              if (query === '') {
                return post;
              } if (post.title.toLowerCase().includes(query.toLowerCase())) {
                return post;
              }
              return null;
            }).map((post) => (
              <div key={post.id}>
                <SinglePosts data={post} clickHandler={() => deletePost(post.id)} />
              </div>
            ))}
          </div>
        </>
      )}
    </>
  );
};

PostList.propTypes = {
  posts: PropTypes.arrayOf(Object).isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  getPost: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { posts, loading, error } = state.posts_details;
  return {
    posts,
    loading,
    error,
  };
};

const mapDispatchToProps = {
  getPost: getPostsAction,
  deletePost: removePostAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/label-has-associated-control */
/** @jsxImportSource @emotion/react */
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import { Form } from 'react-bootstrap';
import { AddNewPostAction, getPostsAction, UpdatePostAction } from '../../redux/actions/user.actions';
import { findPost } from '../../redux/utils';

const PostForm = ({
  createPost, editPost, getPost, posts,
}) => {
  const { id } = useParams();
  const newPostMode = !id;
  const schema = yup
    .object({
      title: yup.string().required('Title is required'),
      body: yup.string().required('Body is required'),
    })
    .required();
  const navigate = useNavigate();
  const formSubmit = (data) => {
    const formData = { ...data, userId: 2 };
    if (newPostMode) {
      createPost(formData);
    } else {
      editPost({ ...formData, id });
    }
    navigate('/');
  };
  const {
    register, handleSubmit, formState, setValue,
  } = useForm({ resolver: yupResolver(schema) });
  useEffect(() => {
    if (!newPostMode) {
      if (posts.length < 1) {
        getPost();
      }
      const currentPost = findPost(posts, parseInt(id, 10));
      if (currentPost) {
        const {
          title, body,
        } = currentPost;
        setValue('title', title);
        setValue('body', body);
      } else {
        navigate('/404');
      }
    }
  }, []);
  return (
    <div
      className="card"
      css={css`width: 400px; 
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);`}
    >
      <div className="card-header">
        <h5>{newPostMode ? 'Create New Post' : 'Update Post'}</h5>
      </div>
      <Form onSubmit={handleSubmit(formSubmit)} className="w-90 my-4 mx-auto">
        <Form.Group className="mb-3">
          <div className="d-flex">
            <label htmlFor="title">Title</label>
            <div className="w-100 ms-4">

              <input
                type="text"
                name="title"
                id="title"
                {...register('title')}
                className={`form-control  ${formState.errors.title ? 'is-invalid' : ''}`}
              />
              <div id="nameHelp" className="form-text text-danger">{formState.errors.title?.message}</div>
            </div>
          </div>
        </Form.Group>
        <Form.Group className="mb-3">
          <div className="d-flex">
            <label htmlFor="body">Body</label>
            <div className="w-100 ms-4">

              <textarea
                type="text"
                name="body"
                id="body"
                {...register('body')}
                className={`form-control  ${formState.errors.body ? 'is-invalid' : ''}`}
              />
              <div id="nameHelp" className="form-text text-danger">{formState.errors.body?.message}</div>
            </div>
          </div>
        </Form.Group>
        <div className="d-flex justify-content-end">
          <Link to="/" className="btn-outline-danger btn px-4 btn-sm me-3">Cancel</Link>
          <input type="submit" value="submit" className="btn btn-sm px-4 btn-success" />
        </div>
      </Form>
    </div>
  );
};

PostForm.propTypes = {
  createPost: PropTypes.func.isRequired,
  editPost: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(Object).isRequired,
};

const mapStateToProps = (state) => {
  const { posts } = state.posts_details;
  return {
    posts,
  };
};

const mapDispatchToProps = {
  createPost: AddNewPostAction,
  editPost: UpdatePostAction,
  getPost: getPostsAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(PostForm);

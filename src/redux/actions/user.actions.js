import UserService from '../../services/user.services';
import {
  GET_ALL_POSTS, ERROR_FETCHING, GET_SINGLE_POSTS, ADD_NEW_POST, UPDATE_POST, DELETE_POSTS,
} from '../types';

const errorHandler = (error, dispatch) => {
  const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
  dispatch({
    type: ERROR_FETCHING,
    payload: message,
  });
};

export const getPostsAction = () => (dispatch) => UserService.getAllPosts().then((res) => {
  dispatch({
    type: GET_ALL_POSTS,
    payload: res,
  });
}, (error) => {
  errorHandler(error, dispatch);
});

export const getSinglePostAction = (id) => (dispatch) => UserService
  .getSinglePost(id)
  .then((res) => {
    dispatch({
      type: GET_SINGLE_POSTS,
      payload: res,
    });
  }, (error) => {
    errorHandler(error, dispatch);
  });

export const AddNewPostAction = (userId, title, body) => (dispatch) => UserService
  .createNewPost(userId, title, body)
  .then((res) => {
    dispatch({
      type: ADD_NEW_POST,
      payload: res,
    });
  }, (err) => {
    errorHandler(err, dispatch);
  });
export const UpdatePostAction = (id, userId, title, body) => (dispatch) => UserService
  .updatePost(id, userId, title, body)
  .then((res) => {
    dispatch({
      type: UPDATE_POST,
      payload: res,
    });
  }, (err) => {
    errorHandler(err, dispatch);
  });

export const removePostAction = (id) => (dispatch) => UserService
  .deletePost(id)
  .then((res) => {
    dispatch({
      type: DELETE_POSTS,
      payload: res,
    });
  }, (error) => {
    errorHandler(error, dispatch);
  });

import { toast } from 'react-toastify';
import UserService from '../../services/user.services';
import {
  GET_ALL_POSTS, ERROR_FETCHING, ADD_NEW_POST, UPDATE_POST, DELETE_POSTS,
} from '../types';

const errorHandler = (error, dispatch) => {
  const message = (error.response && error.response.data && error.response.data.message)
        || error.message
        || error.toString();
  toast.error(message);
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

export const getSinglePostAction = (id, setValue, navigate) => (dispatch) => UserService
  .getSinglePost(id)
  .then((res) => {
    if (Object.keys(res).length !== 0) {
      setValue('title', res.title);
      setValue('body', res.body);
    } else {
      navigate('/404');
    }
  }, (error) => {
    errorHandler(error, dispatch);
  });

export const AddNewPostAction = (data) => (dispatch) => {
  const { userId, title, body } = data;
  UserService
    .createNewPost(userId, title, body)
    .then((res) => {
      toast.success('Post Created');
      dispatch({
        type: ADD_NEW_POST,
        payload: res,
      });
    }, (err) => {
      errorHandler(err, dispatch);
    });
};
export const UpdatePostAction = ({
  id, userId, title, body,
}) => (dispatch) => UserService
  .updatePost(parseInt(id, 10), userId, title, body)
  .then((res) => {
    toast.success('Post updated');
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
      payload: { res, id },
    });
  }, (error) => {
    errorHandler(error, dispatch);
  });

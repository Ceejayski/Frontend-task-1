import {
  ADD_NEW_POST, DELETE_POSTS, ERROR_FETCHING, GET_ALL_POSTS, UPDATE_POST,
} from '../types';
import { createPost, editPost, removePosts } from '../utils';

const INITIAL_STATE = {
  posts: [],
  loading: true,
  error: '',
};

export default function postReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_POSTS:
      return {
        posts: payload,
        loading: false,
        error: '',
      };
    case ADD_NEW_POST:
      return {
        posts: createPost({ current: state.posts, newPost: payload }),
        loading: false,
        error: '',
      };
    case UPDATE_POST:
      return {
        posts: editPost({ current: state.posts, main: payload }),
        loading: false,
        error: '',
      };
    case DELETE_POSTS:
      return {
        posts: removePosts({ current: state.posts, delPost: payload }),
        loading: false,
        error: '',
      };
    case ERROR_FETCHING:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

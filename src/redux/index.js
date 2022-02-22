import { createStore, applyMiddleware, combineReducers } from 'redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import postReducer from './reducers/post.reducer';

const middleware = [thunk];
const reducers = combineReducers({ posts_details: postReducer });
const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;

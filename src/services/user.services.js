import axios from 'axios';

const API_URL = 'https://jsonplaceholder.typicode.com/posts';

const getAllPosts = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const getSinglePost = async (id) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

const createNewPost = async (userId, title, body) => {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };
  const data = JSON.stringify({
    title,
    body,
    userId,
  });
  const response = await axios.post(API_URL, data, headers);
  return response.data;
};

const updatePost = async (id, userId, title, body) => {
  const headers = {
    'Content-type': 'application/json; charset=UTF-8',
  };
  const data = JSON.stringify({
    id,
    title,
    body,
    userId,
  });
  const response = await axios.patch(API_URL, data, headers);
  return response.data;
};

const deletePost = async (id) => {
  const response = await axios({
    method: 'delete',
    url: `${API_URL}/${id}`,
  });
  return response.data;
};

const UserService = {
  getAllPosts,
  getSinglePost,
  createNewPost,
  updatePost,
  deletePost,
};

export default UserService;

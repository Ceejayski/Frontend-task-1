export const maxID = (array) => Math.max(...array.map((user) => user.id));
export const findPost = (array, post) => array.find((cur) => cur.id === post);
export const editPost = ({ current, main }) => {
  console.log(main);
  return current
    .map((user) => (user.id === main.id ? main : user));
};

export const removePosts = ({ current, delPost }) => current
  .filter((user) => user.id !== delPost.id);
export const createPost = ({ current, newPost }) => [...current, {
  ...newPost,
  id: maxID(current) + 1,
}];

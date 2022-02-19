export const editPost = ({ current, main }) => current
  .map((user) => (user.id === main.id ? main : user));

export const removePosts = ({ current, delPost }) => current
  .filter((user) => user.id !== delPost.id);

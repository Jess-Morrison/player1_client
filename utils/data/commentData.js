import { clientCredentials } from '../client';

const getComments = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCommentById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        user: data.user,
        game: data.game,
        reactions: data.reactions,
        commentTitle: data.comment_title,
        comment: data.comment,
        dateCreated: data.date_created,
      });
    })
    .catch(reject);
});

const createComment = (user, post) => new Promise((resolve, reject) => {
  const commentObj = {
    user: user.id,
    game: post.game,
    reactions: post.reactions,
    commentTitle: post.comment_title,
    comment: post.comment,
    dateCreated: post.date_created,
    // uid: user.uid,
  };
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    body: JSON.stringify(commentObj),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateComment = (user, put, id) => new Promise((resolve, reject) => {
  const commentObj = {
    id: put.id,
    game: put.game,
    reactions: put.reactions,
    commentTitle: put.comment_title,
    comment: put.comment,
    dateCreated: put.date_created,
  };
  fetch(`${clientCredentials.databaseURL}/comments/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(commentObj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteComment = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getComments,
  createComment,
  updateComment,
  getCommentById,
  deleteComment,
};

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

// const getGameComments = (uid = '', id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/comments?game=${id}`, {
//     method: 'GET',
//     headers: {
//       Authorization: uid,
//     },
//   })
//     .then((response) => response.json())
//     .then(resolve)
//     .catch(reject);
// });

const getGameComments = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments?game=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCommentById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const createComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments`, {
    method: 'POST',
    body: JSON.stringify(comment),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateComment = (comment) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/comments/${comment.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(comment),
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

// const getCommentById = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/comments/${id}`)
//     .then((response) => response.json())
//     .then((data) => {
//       resolve({
//         id: data.id,
//         user: data.user,
//         game: data.game,
//         reactions: data.reactions,
//         comment_title: data.comment_title,
//         comment: data.comment,
//         date_created: data.date_created,
//       });
//     })
//     .catch(reject);
// });

// const createComment = (user, post) => new Promise((resolve, reject) => {
//   const commentObj = {
//     user: user.id,
//     game: post.game,
//     reactions: post.reactions,
//     comment_title: post.comment_title,
//     comment: post.comment,
//     date_created: post.date_created,
//     // uid: user.uid,
//   };
//   fetch(`${clientCredentials.databaseURL}/comments`, {
//     method: 'POST',
//     body: JSON.stringify(commentObj),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((resp) => resolve(resp.json()))
//     .catch((error) => reject(error));
// });

// const updateComment = (put) => new Promise((resolve, reject) => {
//   const commentObj = {
//     id: put.id,
//     game: put.game,
//     reactions: put.reactions,
//     comment_title: put.comment_title,
//     comment: put.comment,
//     date_created: put.date_created,
//   };
//   fetch(`${clientCredentials.databaseURL}/comments/${put.id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(commentObj),
//   })
//     .then((response) => resolve(response.data))
//     .catch(reject);
// });

export {
  getComments,
  createComment,
  updateComment,
  getCommentById,
  deleteComment,
  getGameComments,
};

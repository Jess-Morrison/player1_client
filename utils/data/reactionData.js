import { clientCredentials } from '../client';

const getReactions = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getReactionById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/reactions/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

const createCommentReaction = (obj) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/commentreactions`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(obj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const getCommentReactionsById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/commentreactions/${id}`)
  // fetch(`${clientCredentials.databaseURL}/commentreactions/109`)
    .then((response) => response.json())
    .then((data) => {
      console.warn(data); // add this line to log the response
      resolve(data);
    })
    .catch(reject);
});

const getRJointView = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/commentreaction/${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCommentReactionsByCommentId = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/commentreactions?commentId=${id}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getCommentReactions = () => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/commentreactions`)
    .then((response) => response.json())
    .then((data) => {
      // console.warn(data); // add this line to log the response
      resolve(data);
    })
    .catch(reject);
});

const getCForDelete = (id, commentId, userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/commentreactions?id=${id}&commentId=${commentId.id}&userId=${userId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const deleteCommentReaction = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/commentreactions/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

// The below code works, i just have to figure out a way to target the comment reaction id
// const deleteCommentReaction = (id) => new Promise((resolve, reject) => {
//   fetch(`${clientCredentials.databaseURL}/commentreactions/114`, {
//     method: 'DELETE',
//     headers: { 'Content-Type': 'application/json' },
//   })
//     .then((response) => resolve(response))
//     .catch((error) => reject(error));
// });

export {
  getReactions,
  getReactionById,
  getCForDelete,
  deleteReaction,
  createCommentReaction,
  deleteCommentReaction,
  getCommentReactionsById,
  getCommentReactions,
  getCommentReactionsByCommentId,
  getRJointView,

};

// .then((response) => response.json())
//     .then((data) => {
//       resolve({
//         id: data.id,
//         reactionName: data.reaction_name,
//         imageUrl: data.image_url,
//       });
//     })
//     .catch(reject);

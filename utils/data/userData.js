import { clientCredentials } from '../client';

const getUsers = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => (response.status === 200 ? response : false))
    .then((response) => {
      if (response) {
        resolve(response.json());
      } else {
        throw new Error('403 response from server');
      }
    })
    .catch(reject);
});

const createUser = (user) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users`, {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateUser = (user, put, id) => new Promise((resolve, reject) => {
  const userObj = {
    id: put.id,
    uid: user.uid,
    firstName: put.first_name,
    last_name: put.last_name,
    about_me: put.about_me,
    user_name: put.user_name,
    tag_line: put.tag_line,
    image_url: put.image_url,
  };
  fetch(`${clientCredentials.databaseURL}/users/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userObj),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});

const deleteUser = (userId) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/users/${userId}`, {
    method: 'DELETE',
  })
    .then(resolve)
    .catch(reject);
});

export {
  getUsers, createUser, updateUser, deleteUser,
};

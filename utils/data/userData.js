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
    first_name: put.firstName,
    last_name: put.lastName,
    uid: put.uid,
    about_me: put.aboutMe,
    user_name: put.userName,
    tag_line: put.tagLine,
    image_url: put.imageUrl,
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

export { getUsers, createUser, updateUser };

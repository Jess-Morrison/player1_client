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
    .then((data) => {
      resolve({
        id: data.id,
        reactionName: data.reaction_name,
        imageUrl: data.image_url,
      });
    })
    .catch(reject);
});

export {
  getReactions,
  getReactionById,

};

import { clientCredentials } from '../client';

const getGameGenres = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gamegenres`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGameGenreById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gamegenres/${id}`)
    .then((response) => response.json())
    .then((data) => {
      resolve({
        id: data.id,
        gameGenreName: data.game_genre_name,
      });
    })
    .catch(reject);
});

export {
  getGameGenres,
  getGameGenreById,

};

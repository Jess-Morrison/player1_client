import { clientCredentials } from '../client';

const getVideoGames = (uid = '') => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/videogames`, {
    method: 'GET',
    headers: {
      Authorization: uid,
    },
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getVideoGameById = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/videogames/${id}`)
    .then((response) => response.json())
    .then(resolve)
    // .then((data) => {
    //   resolve({
    //     id: data.id,
    //     user: data.user,
    //     gameGenre: data.game_genre,
    //     gameTitle: data.game_title,
    //     imageUrl: data.image_url,
    //     purchaseLocation: data.purchase_location,
    //     gameFormat: data.game_format,
    //     description: data.description,
    //   });
    // })
    .catch(reject);
});

// const createVideoGame = (user, post) => new Promise((resolve, reject) => {
//   // const gameObj = {
//   //   user: user.id,
//   //   game_genre: post.gameGenre,
//   //   game_title: post.gameTitle,
//   //   image_url: post.imageUrl,
//   //   purchase_location: post.purchaseLocation,
//   //   game_format: post.gameFormat,
//   //   description: post.description,
//   //   // uid: user.uid,
//   // };
//   fetch(`${clientCredentials.databaseURL}/videogames`, {
//     method: 'POST',
//     body: JSON.stringify(gameObj),
//     headers: {
//       'Content-Type': 'application/json',
//     },
//   })
//     .then((resp) => resolve(resp.json()))
//     .catch((error) => reject(error));
// });
const createVideoGame = (game) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/videogames`, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((resp) => resolve(resp.json()))
    .catch((error) => reject(error));
});

const updateVideoGame = (videoGame) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/videogames/${videoGame.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(videoGame),
  })
    .then((response) => resolve(response.data))
    .catch(reject);
});
//   const gameObj = {
//     id: put.id,
//     gameGenre: put.game_genre,
//     gameTitle: put.game_title,
//     imageUrl: put.image_url,
//     purchaseLocation: put.purchase_location,
//     gameFormat: put.game_format,
//     description: put.description,
//   };
//   fetch(`${clientCredentials.databaseURL}/videogames/${id}`, {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(gameObj),
//   })
//     .then((response) => resolve(response.data))
//     .catch(reject);
// });

const deleteVideoGame = (id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/videogames/${id}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getVideoGames,
  createVideoGame,
  updateVideoGame,
  getVideoGameById,
  deleteVideoGame,
};

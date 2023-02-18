/* eslint-disable no-lone-blocks */
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { updateVideoGame, createVideoGame } from '../../utils/data/videoGameData';
import { getGameGenres } from '../../utils/data/gameGenreData';
import { useAuth } from '../../utils/context/authContext';
// import { getUsers } from '../../utils/data/userData';

const initialState = {
  id: 0,
  gameGenre: '',
  gameTitle: '',
  imageUrl: '',
  purchaseLocation: '',
  gameFormat: '',
  description: '',
  // userFirebaseKey: '',
};

export default function VideoGameForm({ gameObj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [gameGenres, setGameGenres] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [userUID, setUserUID] = useState();
  const { user } = useAuth();
  const router = useRouter();

  // const getAndSet = () => {
  //   if (gameObj.id) {
  //     setFormInput(gameObj);
  //   }
  // };

  useEffect(() => {
    // if (gameObj?.id)setFormInput(gameObj);
    if (gameObj.id) {
      setFormInput({
        id: gameObj.id,
        gameGenre: Number(gameObj.gameGenre),
        gameTitle: gameObj.gameTitle,
        imageUrl: gameObj.imageUrl,
        purchaseLocation: gameObj.purchaseLocation,
        gameFormat: gameObj.gameFormat,
        description: gameObj.description,
      });
    }
  }, [gameObj, user]);
  console.warn(gameObj);

  useEffect(() => {
    getGameGenres().then(setGameGenres);
  }, []);

  // useEffect((id) => {
  //   getUsers(id).then(setUsers);
  // }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameObj.id) {
      updateVideoGame(formInput, gameObj.id).then(() => {
        setFormInput(initialState); router.push(`/videoGame/${gameObj.id}`);
      });
    } else {
      // eslint-disable-next-line array-callback-return
      const payload = { ...formInput, userId: user.id };
      createVideoGame(payload).then(() => router.push('/userCollection'));
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
      {/* <h2 style={{ color: '#84190B', font: 'bold', 'font-size': '5rem' }} className="mt-5">Video Game</h2> */}
      <h2 style={{ color: '#84190B', font: 'bold', 'font-size': '5rem' }} className="mt-5">{gameObj?.id ? 'Update' : 'Create'} Video Game</h2>
      <FloatingLabel controlId="floatingInput1" label="Video Game Name" className="mb-5">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Video Game Name" name="gameTitle" value={formInput.gameTitle} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Game Format" className="mb-5">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Game Format" name="gameFormat" value={formInput.gameFormat} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Purchase Location" className="mb-3">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Purchase location" name="purchaseLocation" value={formInput.purchaseLocation} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          aria-label="Video Game Genre"
          // key={gameGenres.id}
          name="gameGenre"
          type="text"
          value={formInput.gameGenres}
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select Game Genre</option>
          {gameGenres.map((gameGenre) => (
            <option value={gameGenre.id} style={{ color: 'black' }}>
              {gameGenre.game_genre_name}
            </option>
          ))}
          {/* <option value="RPG">RPG</option>
          <option value="Indie">Indie</option>
          <option value="Action">Action</option>
          <option value="Sports">Sports</option>
          <option value="Racing">Racing</option>
          <option value="FPS">FPS</option>
          <option value="Sandbox">Sandbox</option> */}
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Video Game Image" className="mb-3">
        <Form.Control style={{ padding: '4rem' }} type="url" placeholder="Enter an image url" name="imageUrl" value={formInput.imageUrl} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Video Game Description" className="mb-3">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Video Game Description" name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>
      {/* <Button type="submit">Submit</Button> */}
      <Button type="submit">{gameObj?.id ? 'Update' : 'Create'} Video Game</Button>
    </Form>
  );
}

VideoGameForm.propTypes = {
  gameObj: PropTypes.shape({
    gameGenre: PropTypes.shape({
      id: PropTypes.number,
      game_genre_name: PropTypes.string,
    }),
    id: PropTypes.number,
    // game_genre: PropTypes.number,
    gameTitle: PropTypes.string,
    imageUrl: PropTypes.string,
    purchaseLocation: PropTypes.string,
    gameFormat: PropTypes.string,
    description: PropTypes.string,
    user: PropTypes.shape({
      id: PropTypes.number,
      first_name: PropTypes.string,
      last_name: PropTypes.string,
      about_me: PropTypes.string,
      image_url: PropTypes.string,
      tag_line: PropTypes.string,
      user_name: PropTypes.string,
      bio: PropTypes.string,
      uid: PropTypes.string,
    }),
  }).isRequired,
  // .isRequired,
};

// VideoGameForm.defaultProps = {
//   gameObj: initialState,
// };

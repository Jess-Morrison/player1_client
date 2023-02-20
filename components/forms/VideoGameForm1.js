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
// import { getUsers } from '../../api/userData';

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

export default function VideoGameForm({ obj }) {
  const [formInput, setFormInput] = useState(initialState);
  const [gameGenres, setGameGenres] = useState([]);
  // const [users, setUsers] = useState([]);
  // const [userUID, setUserUID] = useState();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (obj.id)setFormInput(obj);
  }, [obj, user]);

  useEffect(() => {
    getGameGenres().then(setGameGenres);
  }, []);

  console.warn(gameGenres);

  // useEffect((firebaseKey) => {
  //   getUsers(firebaseKey).then(setUsers);
  // }, [users]);
  // console.warn(users);

  // const getUsersUID = () => {
  //   const uids = [];
  //   users.forEach((user) => {
  //     // const userType = user?.uid;
  //     if (user) {
  //       uids.push(user);
  //     }
  //     setUsers(uids);
  //   });
  // };
  // useEffect(() => {
  //   getUsersUID();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [users]);

  // console.warn(userUID);
  // console.warn(user);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (obj.id) {
      updateVideoGame(formInput).then(() => {
        setFormInput(initialState); router.push(`/videoGame/edit/${obj.id}`);
      });
    } else {
      const payload = {
        ...formInput, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL,
      };
      createVideoGame(payload).then(() => {
        { gameGenres.map((gameGenre) => (
          <Button type="filter"> {gameGenre.id} </Button>
        )); }
        router.push('/userCollection');
      });
    }
    // if (obj.gameGenre) {
    //   { gameGenres.map((gameGenre) => (
    //     <Button type="filter"> {gameGenre} </Button>
    //   )); }
    //   router.push('/userCollection');
    // }
  };
  return (
    <Form onSubmit={handleSubmit}>
      <h2 style={{ color: '#84190B', font: 'bold', 'font-size': '5rem' }} className="mt-5">{obj.id ? 'Update' : 'Create'} Video Game</h2>
      <FloatingLabel controlId="floatingInput1" label="Video Game Name" className="mb-5">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Video Game Name" name="gameTitle" value={formInput.movieTitle} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Game Format" className="mb-5">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Game Format" name="gameFormat" value={formInput.movieTitle} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput3" label="Purchase Location" className="mb-3">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Purchase location" name="purchaseLocation" value={formInput.purchaseLocation} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingSelect">
        <Form.Select
          aria-label="Video Game Genre"
          name="gameGenre"
          type="text"
          value={formInput.gameGenres}
          onChange={handleChange}
          className="mb-3"
          required
        >
          <option value="">Select Game Genre</option>
          {/* {gameGenres.map((gameGenre) => (
            <option value={gameGenre.id} style={{ color: 'black' }}>
              {gameGenre.gameGenreName}
            </option>
          ))} */}
          <option value="Horror">Horror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Action">Action</option>
          <option value="Musical">Musical</option>
          <option value="Romance">Romance</option>
          <option value="Foreign Film">Foreign Film</option>
          <option value="Drama">Drama</option>
          <option value="Comedy">Comedy</option>
          <option value="Thriller">Thriller</option>
        </Form.Select>
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput2" label="Video Game Image" className="mb-3">
        <Form.Control style={{ padding: '4rem' }} type="url" placeholder="Enter an image url" name="imageURL" value={formInput.imageURL} onChange={handleChange} required />
      </FloatingLabel>
      <FloatingLabel controlId="floatingInput1" label="Video Game Description" className="mb-3">
        <Form.Control style={{ padding: '4rem' }} type="text" placeholder="Enter Video Game Description" name="description" value={formInput.description} onChange={handleChange} required />
      </FloatingLabel>
      <Button type="submit">{obj.id ? 'Update' : 'Create'} Video Game</Button>
    </Form>
  );
}

VideoGameForm.propTypes = {
  obj: PropTypes.shape({
    id: PropTypes.number,
    user: PropTypes.number,
    gameGenre: PropTypes.number,
    gameTitle: PropTypes.string,
    imageUrl: PropTypes.string,
    purchaseLocation: PropTypes.string,
    gameFormat: PropTypes.string,
    description: PropTypes.string,

    // userFirebaseKey: PropTypes.string,
  }),
};

VideoGameForm.defaultProps = {
  obj: initialState,
};

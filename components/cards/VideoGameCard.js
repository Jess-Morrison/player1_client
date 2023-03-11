import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getVideoGameById, deleteVideoGame } from '../../utils/data/videoGameData';

export default function VideoGameCard({
  // eslint-disable-next-line camelcase
  gameGenre, gameFormat, gameTitle, imageUrl, onUpdate, id, purchaseLocation, description,
}) {
  const [gameById, setGameById] = useState([]);
  const { user } = useAuth();
  console.warn(gameById);

  useEffect(() => {
    getVideoGameById(id).then(setGameById);
  }, [id]);

  const deleteThisGame = () => {
    // if (window.confirm(`Delete ${gameById.gameTitle}?`)) {
    //   getMovieComments(movieObj.firebaseKey).then(() => {
    //     deleteMovieComments(movieObj.firebaseKey).then(() => onUpdate(getMovies));
    //   });
    // }
    if (window.confirm(`Delete ${gameById.gameTitle}?`)) {
      deleteVideoGame(gameById.id).then(() => onUpdate());
    }
  };

  const btnsForUser = () => {
    // eslint-disable-next-line react/self-closing-comp
    // one minute its working the next its not
    if (user.id === gameById.user?.id && <Link passHref href="/userCollection" />) {
      return (
        <>
          <Link href={`/videoGame/edit/${gameById.id}`} passHref>
            <Button variant="danger" style={{ backgroundColor: '#E856C2', margin: '5px' }} className="editBtn">EDIT</Button>
          </Link>
          <Link href="/allGames" passHref>
            <Button variant="danger" style={{ backgroundColor: '#9C1A7A', margin: '5px' }} onClick={deleteThisGame} className="deleteBtn">
              DELETE
            </Button>
          </Link>
        </>
      );
    }
    return null;
  };
  return (

    <>
      <Card className="vgCard" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Img variant="top" src={imageUrl} alt={gameTitle} style={{ height: '200px' }} />
          <Card.Title><h2>{gameTitle}</h2></Card.Title>
          <Card.Text><h5>{gameGenre}</h5></Card.Text>
          <Card.Text><h5>Game Format: {gameFormat}</h5></Card.Text>
          <Card.Text><h5>Purchase Location: {purchaseLocation}</h5></Card.Text>
          {/* <Card.Text>User: {user}</Card.Text> */}
          <Card.Text>{description}</Card.Text>
          <Link href={`/videoGame/${gameById.id}`} passHref>
            <Button variant="primary" style={{ backgroundColor: '#E856C2' }} className="viewCardBtn">VIEW</Button>
          </Link>
          {btnsForUser()}
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

VideoGameCard.propTypes = {
  id: PropTypes.number.isRequired,
  purchaseLocation: PropTypes.string.isRequired,
  gameGenre: PropTypes.string.isRequired,
  // user: PropTypes.string.isRequired,
  // user: PropTypes.shape({
  //   id: PropTypes.string,
  //   user_name: PropTypes.string,
  // }).isRequired,
  gameFormat: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  gameTitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

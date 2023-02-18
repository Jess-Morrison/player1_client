import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { useAuth } from '../../utils/context/authContext';
import { getVideoGameById, deleteVideoGame } from '../../utils/data/videoGameData';

export default function VideoGameCard({
  gameGenre, gameFormat, gameTitle, imageUrl, onUpdate, id,
}) {
  const [gameById, setGameById] = useState([]);
  const { user } = useAuth();
  // console.warn(gameById);

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
            <Button variant="danger" className="editBtn">EDIT</Button>
          </Link>
          <Link href="/" passHref>
            <Button variant="danger" onClick={deleteThisGame} className="deleteBtn">
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
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Img variant="top" src={imageUrl} alt={gameTitle} style={{ height: '200px' }} />
          <Card.Title>{gameTitle}</Card.Title>
          <Card.Text>{gameGenre}</Card.Text>
          <Card.Text>{gameFormat}</Card.Text>
          <Link href={`/videoGame/${gameById.id}`} passHref>
            <Button variant="primary" className="viewCardBtn">VIEW</Button>
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
  gameGenre: PropTypes.number.isRequired,
  gameFormat: PropTypes.string.isRequired,
  gameTitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

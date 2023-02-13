import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function VideoGameCard({
  gameGenre, gameFormat, gameTitle, imageUrl,
}) {
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Img variant="top" src={imageUrl} alt={gameTitle} style={{ height: '200px' }} />
          <Card.Title>{gameTitle}</Card.Title>
          <Card.Text>{gameGenre}</Card.Text>
          <Card.Text>{gameFormat}</Card.Text>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

VideoGameCard.propTypes = {
  gameGenre: PropTypes.number.isRequired,
  gameFormat: PropTypes.string.isRequired,
  gameTitle: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
};

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function DescriptionCard({
  description,
}) {
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{description}</Card.Title>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

DescriptionCard.propTypes = {
  description: PropTypes.string.isRequired,

};

import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';

export default function PurchaseLocationCard({
  purchaseLocation,
}) {
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{purchaseLocation}</Card.Title>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

PurchaseLocationCard.propTypes = {
  purchaseLocation: PropTypes.string.isRequired,

};

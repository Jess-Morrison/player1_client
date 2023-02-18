import React from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteUser } from '../../utils/data/userData';

export default function UserCard({
  firstName, lastName, userId, aboutMe, imageUrl, userName, tagLine, onUpdate,
}) {
  const deleteThisUser = () => {
    if (window.confirm('Delete?')) {
      deleteUser(userId).then(() => onUpdate());
      window.location.reload();
    }
  };
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{firstName} {lastName}</Card.Title>
          <Card.Img variant="top" src={imageUrl} alt={firstName} style={{ height: '200px' }} />
          <Card.Text>{aboutMe}</Card.Text>
          <Card.Text>{userName}</Card.Text>
          <Card.Text>{tagLine}</Card.Text>
          <Link href={`/user/${userId}`} passHref>
            <Button variant="primary" className="m-2">VIEW</Button>
          </Link>
          <Link href={`/user/edit/${userId}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link>
          {/* /products?orderBy="seller"&equalTo=${id} */}
          /The above route doesnt work because it is not the file hirearcy, dynamic routes grab the file path
          <Button variant="danger" onClick={deleteThisUser} className="m-2">
            DELETE
          </Button>
        </Card.Body>
        <Card.Footer />
      </Card>
    </>
  );
}

UserCard.propTypes = {
  userId: PropTypes.number.isRequired,
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  tagLine: PropTypes.string.isRequired,
  userName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string.isRequired,
  aboutMe: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

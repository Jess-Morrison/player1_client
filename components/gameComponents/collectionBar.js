/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Card from 'react-bootstrap/Card';
import { useAuth } from '../../utils/context/authContext';

export default function CollectionBar() {
  const { user } = useAuth();
  return (
    <Card>
      <Card.Body>{user.displayName}'s Collection</Card.Body>
    </Card>
  );
}

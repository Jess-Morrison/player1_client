/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
import { createCommentReaction } from '../../utils/data/reactionData';
import { getComments } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';

function ReactionCardTwo({
  comment_id, reactions, onUpdate,
}) {
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getComments().then(setComments);
  }, []);

  const grabCommentId = () => {
    const comment = comments.find((c) => c.id === comment_id);
    if (comment) {
      setCommentId(comment.id);
    }
  };

  useEffect(() => {
    grabCommentId();
  }, []);

  const handleIncrement = () => {
    setCount(count + 1);
    const payload = {
      comment: commentId[0].id, user: user.id,
    };
    createCommentReaction(payload).then((response) => {
      onUpdate();
      setCount(response.count);
    });
  };

  return (
    <Button variant="primary" onClick={handleIncrement}>
      {reactions.map((reaction) => (
        <Card.Img key={reaction.id} variant="top" src={reaction.image_url} alt={reaction.reaction_name} />
      ))}
      <Badge bg="secondary">{count}</Badge>
      <span className="visually-hidden">reaction emojis</span>
    </Button>
  );
}

ReactionCardTwo.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    reaction_name: PropTypes.string,
    image_url: PropTypes.string,
  })).isRequired,
  comment_id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  // commentReactions: PropTypes.arrayOf(PropTypes.shape({
  //   id: PropTypes.number,
  //   user_id: PropTypes.number,
  //   reaction_id: PropTypes.number,
  //   comment_id: PropTypes.number,
  // })),
  onUpdate: PropTypes.func.isRequired,
};

// ReactionCardTwo.defaultProps = {
//   commentReactions: PropTypes.arrayOf(PropTypes.shape({
//     id: 0,
//     user_id: 0,
//     reaction_id: 0,
//     comment_id: 0,
//   })),
// };

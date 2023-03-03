/* eslint-disable camelcase */
// import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import PropTypes from 'prop-types';
// import {
//   getReactions, getCForDelete, deleteReaction, createCommentReaction,
// } from '../utils/data/reactionData';
import { createCommentReaction } from '../../utils/data/reactionData';
import { getComments } from '../../utils/data/commentData';
import { useAuth } from '../../utils/context/authContext';
// import { getReactionById } from '../../utils/data/reactionData';

function ReactionCardOne({
  reaction_name, image_url, commentReactions, comment_id,
}) {
  const [count, setCount] = useState(0);
  const [comments, setComments] = useState([]);
  const [commentId, setCommentId] = useState([]);
  // const [rcSet, setRcSet] = useState([]);
  const { user } = useAuth();

  // console.warn(rcSet);
  useEffect(() => {
    getComments().then(setComments);
  }, []);

  // const grabCommentId = () => {
  //   // const commentUsers = commentId.map((comments) => comments.user);
  //   // setCommentUser(commentUsers);
  //   const cId = commentId.length > 0 ? commentId.id : null;
  //   // const g = games.length > 0 ? games.id : null;
  //   if (commentId === comments.id) {
  //     setCommentId(cId);
  //   }
  // };
  // useEffect(() => {
  //   grabCommentId();
  // }, []);
  const grabCommentId = () => {
    const comment = comments.find((c) => c.id === comment_id);
    if (comment) {
      setCommentId(comment.id);
    }
  };

  useEffect(() => {
    grabCommentId();
  }, []);

  // const handleClick = (e) => {
  //   const { value, id } = e.target;
  //   if (value === 'true') {
  //     getCForDelete(id, comment, user.id).then((commentReaction) => {
  //       deleteReaction(commentReaction[0].id).then(() => getTheContent());
  //     });
  //   } else {
  //     const commentReaction = {
  //       comment,
  //       userId: user.id,
  //       reaction: id,
  //     };
  //     createCommentReaction(commentReaction).then(() => getTheContent());
  //   }
  // };

  const handleIncrement = () => {
    setCount(count + 1);
    const payload = {
      comment: commentId.id, user: user.id,
    };
    createCommentReaction(payload).then((response) => {
      setCount(response.count);
    });
  };

  return (
    <Button variant="primary" onClick={handleIncrement} commentReactions={commentReactions} comment_id={comment_id}>
      {/* {reactions.map((reaction) => ( */}
      <Card.Img variant="top" src={image_url} alt={reaction_name} />
      {/* ))} */}
      <Badge bg="secondary">{count}</Badge>
      {/* </>
      ))} */}
      <span className="visually-hidden">reaction emojis</span>
    </Button>
  );
}

ReactionCardOne.propTypes = {
  // id: PropTypes.number.isRequired,
  comment_id: PropTypes.number.isRequired,
  reaction_name: PropTypes.string.isRequired,
  image_url: PropTypes.string.isRequired,
  commentReactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    reaction_id: PropTypes.number,
    comment_id: PropTypes.number,
  })),
  // onUpdate: PropTypes.func.isRequired,
};

// ReactionViews.propTypes = {
//   comment: PropTypes.number,
// };

ReactionCardOne.defaultProps = {
  commentReactions: PropTypes.arrayOf(PropTypes.shape({
    id: 0,
    user_id: 0,
    reaction_id: 0,
    comment_id: 0,
  })),
};

export default ReactionCardOne;

// Will add increment and decrement logic here for reactions
// Will have an on-click inc and dec for the emoji image
// Will import this section into the gameComments component
// Each comment will have its own row of emojis that has its own logic attached to it

import React from 'react';
// import React, { useState, useEffect } from 'react';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { createCommentReaction, deleteReaction } from '../../utils/data/reactionData';
// import ReactionCard from '../cards/ReactionCard';
// import { getReactions } from '../../utils/data/reactionData';

export default function Reaction({
  reaction, user, commentReactions, commentId, onUpdate, handleClose,
}) {
  // const [cReactions, setCReactions] = useState([]);
  // useEffect(() => {
  //   getReactions(reaction.id).then(setCReactions);
  // }, [reaction.id]);
  console.warn(reaction);

  const handleClick = () => {
    const reactions = commentReactions?.filter((commentReaction) => commentReaction.user_id === user.id && commentReaction.reaction_id === reaction.id);
    if (reactions?.length) {
      deleteReaction(reactions[0].comment_reaction_id).then(() => {
        onUpdate();
        handleClose();
      });
    } else {
      const payload = {
        reactionId: reaction.id,
        commentId,
      };
      createCommentReaction(payload, user).then(() => {
        onUpdate();
        handleClose();
      });
    }
  };

  return (
    <div className="reactionIcon">
      {/* {cReactions.map((cReaction) => ( */}
      {/* // <ReactionCard key={cReaction.id} image_url={cReaction.image_url} reactionObj={cReactions} onClick={handleClick} /> */}
      <Card.Img
        src={reaction.image_url}
        alt={reaction.reaction_name}
        onClick={handleClick}
        className="emoji"
        aria-label={reaction.reaction_name ? reaction.reaction_name : ''}
        aria-hidden={reaction.reaction_name ? 'false' : 'true'}
      />
      {/* ))} */}
    </div>
  );
}

Reaction.propTypes = {
  reaction: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    reaction_name: PropTypes.string,
    image_url: PropTypes.string,
  })).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  commentReactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    user_id: PropTypes.number,
    reaction_id: PropTypes.number,
    comment_id: PropTypes.number,
  })).isRequired,
  commentId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  handleClose: PropTypes.func,

};

Reaction.defaultProps = {
  handleClose: null,
};

// import React, { useState, useEffect } from 'react';
import React, { useState } from 'react';
// import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import ReactionCard from '../components/cards/ReactionCard';
import {
  getReactions, getCForDelete, deleteReaction, createCommentReaction,
} from '../utils/data/reactionData';
import { useAuth } from '../utils/context/authContext';

export default function ReactionViews({ comment }) {
  const [reactions, setReactions] = useState([]);
  const { user } = useAuth();
  // const router = useRouter();
  // const { id } = router.query;

  // console.warn(reactions);

  const getTheContent = () => {
    getReactions(user.id, comment).then(setReactions);
  };

  // useEffect(() => {
  //   getReactions(id, comment).then(setReactions);
  // }, [id]);

  const handleClick = (e) => {
    const { value, id } = e.target;
    if (value === 'true') {
      getCForDelete(id, comment, user.id).then((commentReaction) => {
        deleteReaction(commentReaction[0].id).then(() => getTheContent());
      });
    } else {
      const commentReaction = {
        comment,
        userId: user.id,
        reaction: id,
      };
      createCommentReaction(commentReaction).then(() => getTheContent());
    }
  };

  return (
    // {reactions.map((reaction) => (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      {reactions.map((reaction) => (
        <ReactionCard key={reaction.id} image_url={reaction.image_url} onClick={handleClick} comment={reaction.comment} reactionObj={reactions} />
      ))}
    </div>
    // ))}
  );
}

ReactionViews.propTypes = {
  comment: PropTypes.number,
};

ReactionViews.defaultProps = {
  comment: 0,
};

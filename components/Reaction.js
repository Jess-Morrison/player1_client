/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
import {
  Popover, OverlayTrigger, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  getReactions, getCForDelete, deleteReaction, createCommentReaction,
} from '../utils/data/reactionData';
import { useAuth } from '../utils/context/authContext';

function Reactions({ commentId }) {
  const [reactions, setReactions] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const { user } = useAuth();

  const getTheContent = () => {
    getReactions(user.id, commentId).then(setReactions);
  };

  const handleClick = (e) => {
    const { value, id } = e.target;
    if (value === 'true') {
      getCForDelete(id, commentId, user.id).then((commentReaction) => {
        deleteReaction(commentReaction[0].id).then(() => getTheContent());
      });
    } else {
      const commentReaction = {
        commentId,
        userId: user.id,
        reactionId: id,
      };
      createCommentReaction(commentReaction).then(() => getTheContent());
    }
    if (e.target.className === 'reactions') {
      setShowPop(!showPop);
    }
  };

  useEffect(() => {
    getTheContent();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [commentId]);

  return (
    <div className="reactions-container">
      <OverlayTrigger
        show={showPop}
        placement="bottom"
        trigger="click"
        rootClose
        onToggle={() => setShowPop(!showPop)}
        overlay={(
          <Popover>
            <Popover.Body className="reactions-dropdown">
              {reactions.map((reaction) => (
                <input className="reactions" type="image" key={reaction.id} onClick={handleClick} value={reaction.clicked} id={reaction.id} src={reaction.image_url} />
              ))}
            </Popover.Body>
          </Popover>
            )}
      >
        <Button variant="secondary">Reactions</Button>
      </OverlayTrigger>
      <div className="reactions-display">
        {reactions.map((reaction) => (
          <div key={reaction.id}><input className={`display-reactions ${reaction.count === 0 ? 'no-show' : ''}`} type="image" onClick={handleClick} key={reaction.id} id={reaction.id} src={reaction.image_url} value={reaction.clicked} /><span className={`reaction-counter ${reaction.count === 0 ? 'no-show' : ''}`}>{reaction.count}</span></div>
        ))}
      </div>
    </div>
  );
}

Reactions.propTypes = {
  commentId: PropTypes.number,
};

Reactions.defaultProps = {
  commentId: 0,
};

export default Reactions;

// {reactions.map((reaction) => (
//   <Reactions commentId={id} key={reaction.id} image_url={reaction.image_url} reactionObj={reactions} />
// ))}

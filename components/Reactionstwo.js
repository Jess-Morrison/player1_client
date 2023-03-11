/* eslint-disable jsx-a11y/alt-text */
import React, { useEffect, useState } from 'react';
// import Badge from 'react-bootstrap/Badge';
import {
  Popover, OverlayTrigger, Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import {
  createCommentReaction, getReactions,
} from '../utils/data/reactionData';
import { useAuth } from '../utils/context/authContext';

function ReactionsTwo({ commentId, id, onUpdate }) {
  // const [setReactions] = useState([]);
  // const [count, setCount] = useState(0);
  // const [negCount, setNegCount] = useState(1);
  // const [emojs, setEmojs] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  // const [commentRts, setCommentReactions] = useState([]);
  const [showPop, setShowPop] = useState(false);
  const { user } = useAuth();

  // fiND A WAY TO DELETE AN EMOJI BY USER
  // tOGGLE BETWEEN ADDING AMN EMOJI

  // console.warn(commentRts);
  // console.warn(emojs);

  // const getCommentEmojis = () => {
  //   const imgs = [];
  //   commentRts.forEach((commentRt) => {
  //     const commentEmo = commentRt?.reaction;
  //     if (commentEmo && !imgs.includes(commentEmo)) {
  //       imgs.push(commentEmo);
  //     }
  //   });
  //   setEmojs(imgs);
  // };

  // const renderEmojiFilter = () => {
  //   if (emojs.length > 0) {
  //     return emojs.map((emoj) => (
  //       if(reactions.id === commentRt.reaction ? reactions.image_url : ''){
  //       <button
  //         key={emoj}
  //         type="button"
  //         style={{ margin: '5px' }}
  //         className="btn btn-secondary filterButton"
  //         onClick={() => setEmojs(emoj)}
  //       >
  //       }
  //         {emojs}
  //       </button>
  //     ));
  //   }
  //   return null;
  // };

  // useEffect(() => {
  //   getCommentEmojis();
  // // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [commentRts]);

  // const getTheContent = () => {
  //   getReactionById(user.id, commentId).then(setReactions);
  // };

  // const getCommentR = () => {
  //   getCommentReactions().then(setCommentReactions);
  // };

  // const handleIncrement = () => {
  //   setCount(count + 1);
  // };

  const handleClick = (e) => {
    // const { value, id } = e.target;
    const { value } = e.target;
    const targetId = e.target.id;

    if (!value) {
      const commentReaction = {
        id,
        commentId,
        userId: user.id,
        reactionId: Number(targetId),
        // reactionImage: reactions.image_url,
      };
      createCommentReaction(commentReaction).then(onUpdate);
      // window.location.reload();
      // console.warn(commentReaction);
    }
    if (e.target.className === 'reactions') {
      setShowPop(!showPop);
    }
  };

  useEffect(() => {
    // getTheContent();
    // getCommentR();
    getReactions().then(setAllReactions);
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
              {allReactions.map((allReaction) => (
                <input className="reactions" type="image" key={allReaction.id} onClick={handleClick} id={allReaction.id} src={allReaction.image_url} />
              ))}
            </Popover.Body>
          </Popover>
            )}
      >
        <Button variant="secondary">Reactions</Button>
      </OverlayTrigger>
      {/* <div className="reactions-display">
        {reactions.map((reaction) => commentRts.map((commentRt) => (
          <div key={reaction.id}><input className={`display-reactions ${reaction.id === console.warn(commentRt.reaction) ? 'no-show' : ''}`} type="image" onClick={handleClick} key={reaction.id} id={reaction.id} src={reaction.image_url} value={reaction.id} /><span className={`reaction-counter ${reaction.count === 0 ? 'no-show' : ''}`}>{reaction.count}</span></div>
        )))}
      </div> */}
      {/* <div className="reactions-display">
        {commentRts.map((commentRt) => (
          <div key={reactions.id}><input className={`display-reactions ${reactions.id === commentRt.reaction ? reactions.image_url : ''}`} type="image" onClick={handleClick} key={reactions.id} id={reactions.id} src={commentRt.reaction.image_url} /><Badge bg="secondary">{count || negCount}</Badge></div>
        ))}
      </div> */}
    </div>
  );
}

ReactionsTwo.propTypes = {
  id: PropTypes.number,
  commentId: PropTypes.number,
  onUpdate: PropTypes.func.isRequired,
  // reaction: PropTypes.shape({
  //   id: PropTypes.number,
  //   reaction_name: PropTypes.string,
  //   image_url: PropTypes.string,
  // }),
};

ReactionsTwo.defaultProps = {
  id: 0,
  commentId: 0,
  // reaction: PropTypes.shape({
  //   id: PropTypes.number,
  //   reaction_name: PropTypes.string,
  //   image_url: PropTypes.string,
  // }),
};

export default ReactionsTwo;

// {reactions.map((reaction) => (
//   <Reactions commentId={id} key={reaction.id} image_url={reaction.image_url} reactionObj={reactions} />
// ))}

/* eslint-disable react/require-default-props */
import PropTypes from 'prop-types';
import Reaction from './commentReaction';
import ReactionsModal from '../cards/ReactionCardThree';

export default function ReactionContainer({
  reactions, user, commentReactions, commentId, onUpdate,
}) {
  const reactionsToDisplay = reactions?.filter((reaction) => commentReactions?.some((commentReaction) => reaction.id === commentReaction.reaction));
  return (
    <div className="reactionContainer">
      <div className="reactionModalContainer">
        <ReactionsModal reactions={reactions} user={user} commentReactions={commentReactions} commentId={commentId} onUpdate={onUpdate} />
      </div>
      {reactionsToDisplay.map((reaction) => {
        const reactionCount = commentReactions?.filter((commentReaction) => commentReaction.reaction === reaction.id).length;

        return (
          <div className="reactionCounter">
            <Reaction key={reaction.id} reaction={reaction} user={user} commentReactions={commentReactions} commentId={commentId} onUpdate={onUpdate} handleClose={() => null} /> <div className="number">{reactionCount}</div>
          </div>
        );
      })}
    </div>
  );
}

ReactionContainer.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
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
  })),
  commentId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

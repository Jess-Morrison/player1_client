import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { OutlinedInput } from '@mui/material';
import PropTypes from 'prop-types';
import Reaction from '../commentComponents/commentReaction';

function ReactionsModal({
  reactions, user, commentReactions, commentId, onUpdate,
}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // console.warn(reactions);

  return (
    <>
      <Button size="sm" className="reactions" variant="outline-secondary" onClick={handleShow}>
        {/* <OutlinedInput /> */}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header className="modalHeader" closeButton>
          <Modal.Title>Choose a Reaction!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="reaction-modal">{reactions.map((reaction) => (
          <div className="modalEmoji"><Reaction key={reaction.id} reaction={reaction} image_url={reaction.image_url} user={user} commentReactions={commentReactions.id} commentId={commentId} onUpdate={onUpdate} handleClose={handleClose} />
          </div>
        ))}
        </Modal.Body>
      </Modal>
    </>
  );
}

ReactionsModal.propTypes = {
  reactions: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    reaction_name: PropTypes.string,
    image_url: PropTypes.string,
  })).isRequired,
  user: PropTypes.shape({
    id: PropTypes.number,
  }).isRequired,
  commentReactions: PropTypes.arrayOf(PropTypes.shape({
    user_id: PropTypes.number,
    reaction_id: PropTypes.number,
    comment_id: PropTypes.number,
  })).isRequired,
  commentId: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
};

export default ReactionsModal;

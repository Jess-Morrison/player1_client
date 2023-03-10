/* eslint-disable camelcase */
// Basic comment card minus the delete, update buttons

// will import commentReaction.js into this component
// Will add the delete and update buttons here and base the logic off of the user
// Will also add the reactions to the comment card

// import React from 'react';
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Card } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import { deleteComment, getCommentById } from '../../utils/data/commentData';
// import ReactionCardOne from './ReactionCardOne';
// import { deleteComment } from '../../utils/data/commentData';
import ReactionViewsTwo from '../../pages/reactions';
import { useAuth } from '../../utils/context/authContext';

export default function CommentCard({
  id, reactions, comment_title, comment, date_created, onUpdate,
}) {
  const [commentId, setCommentId] = useState([]);
  const [commentUser, setCommentUser] = useState([]);
  // console.warn(commentId);

  const grabUser = () => {
    // const commentUsers = commentId.map((comments) => comments.user);
    // setCommentUser(commentUsers);
    const cUser = commentId.length > 0 ? commentId.user : null;
    setCommentUser(cUser);
  };
  useEffect(() => {
    grabUser();
  }, []);

  useEffect(() => {
    getCommentById(id).then(setCommentId);
  }, [id]);

  const { user } = useAuth();
  const deleteThisComment = () => {
    if (window.confirm('Delete?')) {
      deleteComment(id).then(() => onUpdate());
      window.location.reload();
    }
  };

  const btnsForUser = () => {
    // eslint-disable-next-line react/self-closing-comp
    // one minute its working the next its not
    if (user.id === commentId.user?.id && <Link passHref href="/userCollection" />) {
      return (
        <>
          <Link href={`/comment/edit/${commentId.id}`} passHref>
            <Button variant="danger" className="editBtn">EDIT</Button>
          </Link>
          <Link href="/allGames" passHref>
            <Button variant="danger" onClick={deleteThisComment} className="deleteBtn">
              DELETE
            </Button>
          </Link>
        </>
      );
    }
    return null;
  };
  return (

    <>
      <Card className="text-center" style={{ width: '25rem' }}>
        <Card.Body>
          <Card.Title>{comment_title}</Card.Title>
          {/* <Card.Title>{commentId.commentUser}</Card.Title> */}
          <Card.Title>{commentUser ? commentUser.first_name : null}</Card.Title>
          <Card.Text>{comment}</Card.Text>
          <Card.Text>{date_created}</Card.Text>
          <Card.Text>{reactions}</Card.Text>
          {/* <Link href={`/user/edit/${user.userId}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link> */}
          {/* /products?orderBy="seller"&equalTo=${id} */}
          {btnsForUser()}
        </Card.Body>
        <Card.Footer />
      </Card>
      <ReactionViewsTwo />
    </>
  );
}

CommentCard.propTypes = {
  id: PropTypes.number.isRequired,
  // user: PropTypes.number.isRequired,
  // userId: PropTypes.number.isRequired,
  // commentUser: PropTypes.shape({
  //   id: PropTypes.number.isRequired,
  //   image_url: PropTypes.string.isRequired,
  //   first_name: PropTypes.string.isRequired,
  // }),
  reactions: PropTypes.number.isRequired,
  comment_title: PropTypes.string.isRequired,
  comment: PropTypes.string.isRequired,
  date_created: PropTypes.number.isRequired,
  onUpdate: PropTypes.func.isRequired,
};
// id, reactions, comment_title, comment, date_created,

// id: PropTypes.number.isRequired,
//   // user: PropTypes.number.isRequired,
//   // userId: PropTypes.number.isRequired,
//   reactions: PropTypes.number.isRequired,
//   comment_title: PropTypes.string.isRequired,
//   comment: PropTypes.string.isRequired,
//   date_created: PropTypes.number.isRequired,
//   onUpdate: PropTypes.func.isRequired,

// commentObj: PropTypes.shape({
//   id: PropTypes.number,
//   // userId: PropTypes.number.isRequired,
//   reactions: PropTypes.number,
//   comment_title: PropTypes.string,
//   comment: PropTypes.string,
//   date_created: PropTypes.number,
//   user: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     image_url: PropTypes.string.isRequired,
//     first_name: PropTypes.string.isRequired,
//   }),
// }).isRequired,
// onUpdate: PropTypes.func.isRequired,

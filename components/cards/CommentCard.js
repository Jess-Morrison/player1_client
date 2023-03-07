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
// import { useRouter } from 'next/router';
import { deleteComment, getCommentById } from '../../utils/data/commentData';
// import { deleteComment, getCommentById, getGameComments } from '../../utils/data/commentData';
// import ReactionCardOne from './ReactionCardOne';
// import { deleteComment } from '../../utils/data/commentData';
// import ReactionViewsTwo from '../../pages/reactionstwo';
// import Reactions from '../Reaction';
import ReactionsTwo from '../Reactionstwo';
// import ReactionContainer from '../commentComponents/commentReactionContainer';
import { getReactions } from '../../utils/data/reactionData';
import { useAuth } from '../../utils/context/authContext';

export default function CommentCard({
  id, comment_title, comment, date_created, onUpdate,
}) {
  const [commentId, setCommentId] = useState([]);
  const [commentUser, setCommentUser] = useState([]);
  const [reactions, setReactions] = useState([]);
  // const router = useRouter();
  // const [comments, setComments] = useState([]);
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

  const getAndSetComment = () => {
    getCommentById(commentId).then(setCommentId).then(() => {
      getReactions(id).then(setReactions);
    });
  };

  // useEffect(() => {
  //   getCommentById(id).then(setCommentId);
  // }, [id]);
  useEffect(() => {
    getAndSetComment();
    // getCommentById(id).then(setCommentId);
    // getGameComments(id).then(setComments);
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
        <ReactionsTwo commentId={id} />
        <Card.Footer />
      </Card>
      {/* {user.id === commentId.user.id ? (
        <div className="post-card-buttons">
          <Button variant="outline-dark" type="button" className="gear" onClick={() => router.push(`/comments/edit/${id}`)}></Button>
          <Button variant="outline-dark" type="button" className="trash" onClick={() => deletePost()}></Button>
        </div>
      ) : ''} */}
      {/* <ReactionViewsTwo comments={comments.id} /> */}
      {/* {/* <ReactionContainer reactions={reactions} commentReactions={commentId.reactions} user={user} commentId={commentId} onUpdate={getAndSetComment} />  */}
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
  // reactions: PropTypes.number.isRequired,
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
// {reactions.map((reaction) => (
//   <Reactions commentId={id} key={reaction.id} image_url={reaction.image_url} reactionObj={reactions} />
// ))}

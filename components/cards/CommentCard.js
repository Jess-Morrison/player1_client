/* eslint-disable camelcase */
// Basic comment card minus the delete, update buttons

// will import commentReaction.js into this component
// Will add the delete and update buttons here and base the logic off of the user
// Will also add the reactions to the comment card

// import React from 'react';
import React, { useState, useEffect } from 'react';
import Badge from 'react-bootstrap/Badge';
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
import {
  getReactions, getCommentReactions, deleteCommentReaction, getReactionById,
} from '../../utils/data/reactionData';
// import {
//   getReactions, getCommentReactions,
// } from '../../utils/data/reactionData';

import { useAuth } from '../../utils/context/authContext';

export default function CommentCard({
  id, comment_title, comment, date_created, onUpdate,
}) {
  const [commentId, setCommentId] = useState({});
  const [commentUser, setCommentUser] = useState({});
  const [reactions, setReactions] = useState([]);
  const [rBi, setReactionsById] = useState([]);
  const [commentRts, setCommentReactions] = useState([]);
  // const [setCommentReactionsById] = useState([]);
  const [byID, setById] = useState([]);
  // const [rJointView, setrJointView] = useState([]);
  // const [count, setCount] = useState(0);
  // const [negCount, setNegCount] = useState(1);
  const { user } = useAuth();
  // const router = useRouter();
  // const [comments, setComments] = useState([]);
  console.warn(rBi);

  const getTheContent = () => {
    getReactionById(id, commentId).then(setReactionsById);
  };

  const grabUser = () => {
    // const commentUsers = commentId.map((comments) => comments.user);
    // setCommentUser(commentUsers);
    const cUser = commentId.length > 0 ? commentId.user : null;
    setCommentUser(cUser);
  };
  // const getCommentR = () => {
  //   getCommentReactions().then(setCommentReactions);
  //   return commentRts.map((commentRt) => {
  //     if (commentId.id === commentRt.id) {
  //       return <ReactionsTwo commentId={id} />;
  //     }
  //     return null;
  //   });
  // };

  // useEffect(() => {
  //   getCommentReactionsById().then(setCommentReactionsById);
  //   // getRJointView().then
  // }, []);

  useEffect(() => {
    grabUser();
  }, []);

  const getAndSetComment = () => {
    getCommentById(id).then(setCommentId);
  };
  // console.warn(commentRts);

  const getAndSetReaction = () => {
    getReactions().then(setReactions);
  };

  // const taco = () => {
  //   getCommentReactions().then(setCommentReactions);
  //   commentRts.map((commentRt) => setById(commentRt));
  // };
  const taco = async () => {
    try {
      const cReactions = await getCommentReactions();
      setCommentReactions(cReactions);
      commentRts.map((commentRt) => setById(commentRt));
    } catch (error) {
      console.error(error);
    }
  };

  // const handleClick = async () => {
  //   if (id !== '') {
  //     console.warn(byID);
  //     taco();
  //     await deleteCommentReaction(byID.id).then(() => rBi);
  //   }
  //   return null;
  // };

  const handleClick = async () => {
    // eslint-disable-next-line no-shadow
    // const { id } = e.target;
    // if reaction id is in the comment reactions array, then delete
    // if (id !== '') {
    // eslint-disable-next-line array-callback-return
    // commentRts.map((commentR) => {
    taco(byID).then(
      deleteCommentReaction(byID.id).then(() => taco()),
    );
    console.warn(byID);
    // await window.location.reload();
    // });
    // deleteCommentReaction(byID.id).then(rBi).then(() => window.location.reload());
    // window.location.reload();
    // }
    // return null;
  };

  const counter = (commentIds, reactionId) => {
    // eslint-disable-next-line no-shadow
    // const { id } = e.target;
    // eslint-disable-next-line array-callback-return
    const reactionCount = commentRts?.filter((commentRt) => commentRt.comment.id === commentIds && commentRt.reaction.id === reactionId).length;
    return reactionCount || 0;
  };
  // };
  // console.warn(count);

  const getCommentR = () => commentRts.map((commentRt) => {
    if (commentId.id === commentRt.comment.id) {
      return (
        <div key={commentRt.id}>
          <input
            className={`display-reactions ${reactions.id === commentRt.reaction ? reactions.image_url : ''}`}
            type="image"
            onClick={handleClick}
            id={commentRt.reaction.id}
            src={commentRt.reaction.image_url}
            alt={reactions.reaction_name}
          />
          <Badge bg="secondary">{counter(commentId.id, commentRt.reaction.id)}</Badge>
        </div>
      );
    }
    return null;
  });

  useEffect(() => {
    getAndSetComment();
    getAndSetReaction();
  }, []);

  useEffect(() => {
    counter();
    getCommentR();
    getTheContent();
    taco();
    // getTheContent();
    // getCommentById(id).then(setCommentId);
    // getGameComments(id).then(setComments);
  }, []);

  // };

  // useEffect(() => {
  //   getCommentById(id).then(setCommentId);
  // }, [id]);

  const deleteThisComment = () => {
    if (window.confirm('Delete?')) {
      deleteComment(id).then(() => onUpdate());
      // window.location.reload();
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
          <Card.Text>{reactions.image_url}</Card.Text>
          {/* <Link href={`/user/edit/${user.userId}`} passHref>
            <Button variant="info">EDIT</Button>
          </Link> */}
          {/* /products?orderBy="seller"&equalTo=${id} */}
          {btnsForUser()}
        </Card.Body>
        {/* {commentRts.map((commentRt) => {
          if (commentId.id === commentRt.comment.id) {
            return <ReactionsTwo />;
          }
          return null;
        })} */}
        {getCommentR()}
        <ReactionsTwo commentId={commentId.id} onUpdate={taco} />
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

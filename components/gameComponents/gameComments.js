// will import commentReaction.js into this component
// Will add the delete and update buttons here and base the logic off of the user
// Will also add the reactions to the comment card

// import React from 'react';
import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
import CommentCard from '../cards/CommentCard';
// import { getComments } from '../../utils/data/commentData';
import { getGameComments } from '../../utils/data/commentData';

export default function GameComments(id) {
  const [comments, setComments] = useState([]);
  // const router = useRouter();
  // const { id } = router.query;
  // console.warn(comments.game);
  useEffect(() => {
    getGameComments(id).then(setComments);
  }, [id]);
  return (
    <>
      {comments.map((comment) => (
        <CommentCard
          key={comment.id}
          id={comment.id.id}
          user={comment.user}
          game={comment.game.id}
          reactions={comment.reactions}
          comment_title={comment.comment_title}
          comment={comment.comment}
          date_created={comment.date_created}
          onUpdate={getGameComments}
        />
      ))}
    </>
  );
}

// // <>
//       {/* {comments.map((comment) => ( */}
//       <CommentCard
//       key={comments.id}
//       id={comments.id}
//       user={comments.user.first_name}
//       game={comments.game}
//       reactions={comments.reactions}
//       comment_title={comments.comment_title}
//       comment={comments.comment}
//       date_created={comments.date_created}
//       onUpdate={getGameComments}
//     />
//   {/* ))} */}
// // </>

// return (
//   <CommentCard
//     key={comments.id}
//     id={comments.id}
//     user={comments.user}
//     game={comments.game}
//     reactions={comments.reactions}
//     comment_title={comments.comment_title}
//     comment={comments.comment}
//     date_created={comments.date_created}
//     onUpdate={getGameComments}
//   />
// );

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import CommentCard from '../../components/cards/CommentCard';
import { getComments } from '../../utils/data/commentData';

export default function Comments() {
  const [comments, setComments] = useState({});
  const router = useRouter();
  const { id } = router.query;
  // console.warn(comments.game);
  useEffect(() => {
    getComments(id).then(setComments);
  }, [id]);
  return (
    <CommentCard
      key={comments.id}
      id={comments.id}
      user={comments.user}
      game={comments.game}
      reactions={comments.reactions}
      comment_title={comments.comment_title}
      comment={comments.comment}
      date_created={comments.date_created}
      onUpdate={getComments}
    />
  );
}

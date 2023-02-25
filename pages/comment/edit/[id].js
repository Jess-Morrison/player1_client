import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import CommentForm from '../../../components/forms/CommentForm';
import { getCommentById } from '../../../utils/data/commentData';

export default function EditVideoGameEntry() {
  const [editCommentItem, setCommentItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getCommentById(id).then(setCommentItem);
  }, [id]);

  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <CommentForm commentObj={editCommentItem} />
    </div>
  );
}

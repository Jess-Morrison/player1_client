import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import VideoGameForm from '../../../components/forms/VideoGameForm';
import { getVideoGameById } from '../../../utils/data/videoGameData';

export default function EditVideoGameEntry() {
  const [editVideoGameItem, setEditVideoGameItem] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getVideoGameById(id).then(setEditVideoGameItem);
  }, [id]);

  return (
    <div className="create-form" style={{ height: '45rem', padding: '10%' }}>
      <VideoGameForm obj={editVideoGameItem} />
    </div>
  );
}

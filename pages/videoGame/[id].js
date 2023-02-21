import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import gameComments from '../../components/gameComponents/gameComments';
import VideoGameCard from '../../components/cards/VideoGameCard';
import { getVideoGameById } from '../../utils/data/videoGameData';
import { getComments } from '../../utils/data/commentData';

export default function ViewVideoGame() {
  const [viewVideoGame, setVideoGame] = useState({});
  const [comments, setComments] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getVideoGameById(id).then(setVideoGame);
  }, [id]);

  useEffect(() => {
    getComments().then(setComments);
  }, []);

  gameComments(() => {
    if (viewVideoGame.id === comments.game.id) {
      <gameComments />;
    }
  });

  return (
    <>
      <div className="view-card">
        <VideoGameCard key={id} gameObj={viewVideoGame} />
      </div>
      {gameComments()}
    </>
  );
}

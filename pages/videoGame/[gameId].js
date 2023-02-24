import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import GameComments from '../../components/gameComponents/gameComments';
import VideoGameCard from '../../components/cards/VideoGameCard';
// import CommentCard from '../../components/cards/CommentCard';
import { getVideoGameById } from '../../utils/data/videoGameData';
import { getGameComments } from '../../utils/data/commentData';

export default function ViewVideoGame() {
  const [viewVideoGame, setVideoGame] = useState({});
  const [comments, setComments] = useState([]);
  // console.warn(comments);
  const router = useRouter();
  const { gameId } = router.query;

  useEffect(() => {
    getVideoGameById(gameId).then(setVideoGame);
  }, [gameId]);

  useEffect(() => {
    if (gameId) {
      getGameComments(gameId).then(setComments);
    }
  }, [gameId]);

  // const gameComments = () => {
  //   {viewVideoGame.map((game) => (
  //   if (game.id === comments.game.id) {
  //     <GameComments />;
  //   }
  // }
  //   )};

  const gameComments = () => (
    <>
      {comments.map((comment) => (viewVideoGame.id === comment.game.id ? (
        <GameComments
          // key={comment.id}
          onUpdate={getGameComments}
        />
      ) : null))}
    </>
  );

  return (
    <>
      <div className="view-card">
        <VideoGameCard
          key={viewVideoGame.id}
          id={viewVideoGame.id}
          gameGenre={viewVideoGame.game_genre_name}
          gameTitle={viewVideoGame.game_title}
          imageUrl={viewVideoGame.image_url}
          purchaseLocation={viewVideoGame.purchase_location}
          gameFormat={viewVideoGame.game_format}
          onUpdate={getVideoGameById}
        // gameObj={viewVideoGame}
        />
      </div>
      {gameComments()}
    </>
  );
}

// landing page where you see all the video games

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from 'react-bootstrap';
import { getVideoGames } from '../utils/data/videoGameData';
import VideoGameCard from '../components/cards/VideoGameCard';
import { useAuth } from '../utils/context/authContext';

export default function Team() {
  const [videoGames, setvideoGames] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    getVideoGames(user.uid).then(setvideoGames);
  },
  [user.uid]);

  return (
    <div className="text-center my-4">
      <Link href="/videoGame/new" passHref>
        <Button>Add A Video Game</Button>
      </Link>
      <div className="cards">
        {videoGames.map((videoGame) => (
          <VideoGameCard
            key={videoGame.id}
            id={videoGame.id}
            gameGenre={videoGame.game_genre.game_genre_name}
            gameTitle={videoGame.game_title}
            imageUrl={videoGame.image_url}
            purchaseLocation={videoGame.purchase_location}
            gameFormat={videoGame.game_format}
            description={videoGame.description}
          // gameObj={videoGame}
            onUpdate={getVideoGames}
          />
        ))}
      </div>
      <div className="d-flex flex-wrap" />
    </div>
  );
}
